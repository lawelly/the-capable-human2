/* Cloud sync through Firebase (Google sign-in + Firestore).
   Without a config in firebase-config.js the app runs on this device only (localStorage). */
(function () {
  const VER = '10.12.2';
  const cfg = window.FIREBASE_CONFIG;
  const load = src => new Promise((ok, fail) => {
    const s = document.createElement('script');
    s.src = src; s.onload = ok; s.onerror = fail;
    document.head.appendChild(s);
  });

  const Sync = {
    configured: !!(cfg && cfg.apiKey),
    mode: 'local',   // 'local' | 'account'
    user: null,      // { name, photo }
    ref: null,
    unsub: null,

    async start(h) {
      if (!this.configured) return;
      try {
        const base = `https://www.gstatic.com/firebasejs/${VER}/`;
        await load(base + 'firebase-app-compat.js');
        await load(base + 'firebase-auth-compat.js');
        await load(base + 'firebase-firestore-compat.js');
      } catch (e) { console.warn('Firebase could not load; staying offline.', e); return; }

      firebase.initializeApp(cfg);
      this.auth = firebase.auth();
      this.db = firebase.firestore();
      try { await this.db.enablePersistence({ synchronizeTabs: true }); } catch (e) { /* one tab only or unsupported */ }
      this.auth.getRedirectResult().catch(() => {});

      this.auth.onAuthStateChanged(u => {
        if (this.unsub) { this.unsub(); this.unsub = null; }
        if (!u) { this.mode = 'local'; this.user = null; this.ref = null; h.status(); return; }
        this.user = { name: u.displayName || '', photo: u.photoURL || '' };
        this.ref = this.db.collection('users').doc(u.uid);
        let first = true;
        this.unsub = this.ref.onSnapshot(snap => {
          if (first) {
            first = false; this.mode = 'account';
            h.first(snap.exists ? snap.data().state : null);
            return;
          }
          if (snap.metadata.hasPendingWrites) return;
          if (snap.exists) h.remote(snap.data().state);
        }, err => { console.warn(err); this.mode = 'local'; h.status(); });
      });
    },

    async signIn() {
      const p = new firebase.auth.GoogleAuthProvider();
      try { await this.auth.signInWithPopup(p); }
      catch (e) {
        const redirectCodes = ['auth/popup-blocked', 'auth/operation-not-supported-in-this-environment', 'auth/cancelled-popup-request'];
        if (redirectCodes.includes(e.code)) await this.auth.signInWithRedirect(p);
        else throw e;
      }
    },

    signOut() { return this.auth && this.auth.signOut(); },

    async save(state) {
      if (!this.ref) return;
      await this.ref.set({
        state: JSON.parse(JSON.stringify(state)),
        updated: firebase.firestore.FieldValue.serverTimestamp()
      });
    }
  };

  window.Sync = Sync;
})();
