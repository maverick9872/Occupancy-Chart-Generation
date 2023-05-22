<script>
  export let authHandlers;
  import { onMount } from "svelte";

  onMount(() => {
    // Initialize the dropdown
    const dropdown = document.querySelector(".dropdown-trigger");
    M.Dropdown.init(dropdown);
  });
</script>

<ul id="dropdown1" class="dropdown-content">
  <li><a href="/dashboard">Dashboard</a></li>
  <li><a href="/timetable">Timetables</a></li>

  <li>
    <a href="/reservation">Reservation</a>
  </li>
  <li>
    <a href="/occupancy">Occupancy</a>
  </li>
  <li><a href="/profile"> Profile </a></li>
  <li class="divider" />
  <li>
    <a href="##" on:click={authHandlers.logout}>Logout</a>
  </li>
</ul>
<nav class="teal darken-2 z-depth-3">
  <div class="nav-wrapper container">
    <a href="#top" class="brand-logo left">OCCUPO</a>
    <ul class="right hide-on-med-and-down">
      <li>
        <a href="/dashboard">Dashboard</a>
      </li>
      <li>
        <a href="/timetable">Timetables</a>
      </li>
      <li>
        <a href="/reservation">Reservation</a>
      </li>
      <li>
        <a href="/occupancy">Occupancy</a>
      </li>
      <li>
        <a href="/profile"> Profile </a>
      </li>
      <li id="logout">
        <a href="##" on:click={authHandlers.logout}>Logout</a>
      </li>
    </ul>
    <ul class="right hide-on-large-only show-on-med-and-up">
      <li>
        <a class="dropdown-trigger" href="#!" data-target="dropdown1"
          >Menu<i class="material-icons right">arrow_drop_down</i></a
        >
      </li>
    </ul>
  </div>
</nav>
