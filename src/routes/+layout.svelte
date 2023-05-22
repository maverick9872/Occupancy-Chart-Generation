<script>
  import { onMount } from "svelte";
  import { auth, db } from "../lib/firebase/firebase";
  import { getDoc, doc, setDoc } from "firebase/firestore";
  import { authStore } from "../store/store";

  const nonAuthRoutes = ["/"];

  onMount(async () => {
    console.log("Mounting");
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      const currentPath = window.location.pathname;

      if (!user && !nonAuthRoutes.includes(currentPath)) {
        window.location.href = "/";
        return;
      }

      if (user && currentPath === "/") {
        window.location.href = "/dashboard";
        return;
      }

      if (user) {
        let dataToSetToStore;
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          const userRef = doc(db, "users", user.uid);
          dataToSetToStore = {
            username: "",
            email: user.email,
            datas: {},
          };

          await setDoc(userRef, dataToSetToStore);
        } else {
          const userData = docSnap.data();
          dataToSetToStore = userData;
        }

        authStore.update((curr) => {
          return {
            ...curr,
            user,
            data: dataToSetToStore,
            loading: false,
          };
        });
      } else {
        authStore.update((curr) => {
          return {
            ...curr,
            user: null,
            data: {},
            loading: false,
          };
        });
      }
    });
  });
</script>

<slot />
