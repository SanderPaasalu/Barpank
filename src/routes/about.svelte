<script>
let username;
let password;

function loginHandler() {

}
</script>

<svelte:head>
  <title>Log in</title>
</svelte:head>

<h1>Log in</h1>
<form>
  <input bind:value={username} type="text" placeholder="Username" />
  <input bind:value={password} type="text" placeholder="Password" />
  <button on:click={loginHandler} type="submit">Log in</button>
</form>
<p>Don't have an account? Create one <a href="./register">here</a></p>
