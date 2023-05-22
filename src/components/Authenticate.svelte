<script>
  import { authHandlers } from "../store/store";

  let email = "";
  let password = "";
  let confirmpass = "";
  let error = false;
  let register = false;
  let authenticating = false;
  let emailsent = false;

  async function handleAuthenticate() {
    if (authenticating) {
      return;
    }
    if (!email || !password || (register && !confirmpass)) {
      error = true;
      return;
    }
    authenticating = true;
    try {
      if (!register) {
        await authHandlers.login(email, password);
      } else {
        await authHandlers.signup(email, password, false);
      }
    } catch (err) {
      console.log("There was an authentication error:", err);
      error = true;
    } finally {
      authenticating = false;
    }
  }

  async function handleResetPassword() {
    if (!email) {
      error = true;
      return;
    }

    try {
      await authHandlers.resetPassword(email);
      console.log("Password reset email sent successfully");
      emailsent = true;
    } catch (err) {
      console.log("Error sending password reset email:", err);
      error = true;
    }
  }

  function handleRegister() {
    register = !register;
    error = false; // Reset the error flag when toggling between register and login
    isAdmin = false;
  }

  async function handleGoogle() {
    try {
      await authHandlers.loginWithGoogle();
    } catch (err) {
      console.log("There was an authentication error:", err);
      error = true;
    }
  }
</script>

<div id="login" class="container">
  <div class="row">
    <div class="col s12 m6 offset-m3">
      <div class="card">
        <div class="card-content center-align z-depth-4">
          <h1 class="center-align">{register ? "Register" : "Login"}</h1>
          {#if error}
            <p class="white-text card-panel red lighten-2">
              The information you entered is incorrect
            </p>
          {/if}
          {#if emailsent}
            <p class="white-text card-panel green lighten-2">
              Reset email sent
            </p>
          {/if}
          <div class="input-field">
            <p style="text-align: {email ? 'left' : 'center'};">Email</p>
            <input bind:value={email} type="email" placeholder="Email" />
          </div>
          <div class="input-field" style="margin-bottom: 1rem;">
            <p style="text-align: {password ? 'left' : 'center'};">Password</p>
            <input
              bind:value={password}
              type="password"
              placeholder="Password"
            />
          </div>
          {#if register}
            <div class="input-field">
              <p style="text-align: {confirmpass ? 'left' : 'center'};">
                Confirm password
              </p>
              <input
                bind:value={confirmpass}
                type="password"
                placeholder="Confirm password"
              />
            </div>
          {/if}

          {#if authenticating}
            <div class="progress">
              <div class="indeterminate" />
            </div>
          {:else}
            <button
              class="btn btn-large waves-effect waves-light center-align"
              on:click={handleAuthenticate}
              type="button"
            >
              <i class="material-icons left">done</i>
              Submit
            </button>
          {/if}

          <div>
            <p>Or</p>
            {#if register}
              <p
                on:click={handleRegister}
                on:keydown={() => {}}
                class="blue-text"
                style="cursor:pointer"
              >
                Already have an account? Login
              </p>
            {:else}
              <p
                on:click={handleRegister}
                on:keydown={() => {}}
                class="blue-text"
                style="cursor:pointer"
              >
                Don't have an account? Register
              </p>
            {/if}
            <p
              on:click={handleGoogle}
              on:keydown={() => {}}
              class="blue-text"
              style="cursor:pointer"
            >
              Sign in with Google <i class="fab fa-google ml-1" />
            </p>
            <p
              on:click={handleResetPassword}
              on:keydown={() => {}}
              class="blue-text"
              style="cursor:pointer"
            >
              Forgot your password? Reset password
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
