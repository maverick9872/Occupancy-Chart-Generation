import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, sendPasswordResetEmail, onAuthStateChanged } from "firebase/auth";
import { writable } from "svelte/store";
import { auth } from "../lib/firebase/firebase";
import { signInWithRedirect, signInWithPopup } from "firebase/auth";

let useRedirect = true;

export const authStore = writable({
  user: null,
  loading: true,
  data: {}
});

export const authHandlers = {
  signup: async (email, pass) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, pass);

    } catch (error) {
      console.log("Error signing up:", error);
      throw error;
    }
  },

  login: async (email, pass) => {
    await signInWithEmailAndPassword(auth, email, pass);
  },
  loginWithGoogle: async () => {
    const provider = new GoogleAuthProvider();

    try {
      if (useRedirect) {
        await signInWithRedirect(auth, provider);
      } else {
        await signInWithPopup(auth, provider);
      }
    } catch (error) {
      console.log("Error signing in with Google:", error);
      throw error;
    }
  },
  logout: async () => {
    await signOut(auth);
  },
  resetPassword: async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      console.log("Password reset email sent successfully");
    } catch (error) {
      console.log("Error sending password reset email:", error);
      throw error;
    }
  },
  profile: async () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is logged in
          authStore.update((store) => {
            store.user = user;
            store.loading = false;
            return store;
          });
          unsubscribe(); // Unsubscribe from further auth state changes
          resolve();
        } else {
          // User is logged out
          authStore.update((store) => {
            store.user = null;
            store.loading = false;
            return store;
          });
          unsubscribe(); // Unsubscribe from further auth state changes
          resolve();
        }
      }, reject);
    });
  },
};


