<script>
  import { onMount } from "svelte";
  import { authHandlers, authStore } from "../store/store";
  let user = null;
  let loading = true;
  onMount(() => {
    authHandlers.profile();
    const unsubscribe = authStore.subscribe((store) => {
      user = store.user;
      loading = store.loading;
    });
    return () => {
      unsubscribe();
    };
  });
</script>
<br/><br/><br/>
<main class="container">
  <div class="card horizontal">
    <div class="card-image waves-effect waves-block waves-light">
      <img
        class="activator"
        alt=""
        src="https://dt19wmazj2dns.cloudfront.net/wp-content/uploads/2020/05/amrita-vishwa-vidyapeetham-coimbatore-campus-dron-image-01-2.jpg"
      />
    </div>
    <div class="card-stacked ">
      <div class="card-content">
      <span class="card-title activator grey-text text-darken-4"
      >Welcome, user<i class="material-icons right">more_vert</i></span
    >
      {#if loading}
        <div class="text-center">
          <div class="progress">
            <div class="indeterminate" />
          </div>
        </div>
      {:else if user}
        <p><a href="#!">Email: {user.email}</a></p>
      {:else}
        <div class="text-center">
          <p class="flow-text">No user logged in.</p>
        </div>
      {/if}
    </div>
  </div>
    <div class="card-reveal">
      <span class="card-title grey-text text-darken-4"
        ><i class="material-icons right">close</i></span
      >
      <button
        class="btn btn-large waves-effect waves-light"
        on:click={authHandlers.logout}
      >
        Logout
      </button>
      
    </div>
 
  </div>
</main>
