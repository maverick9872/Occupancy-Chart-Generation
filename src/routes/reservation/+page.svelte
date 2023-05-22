<script>
  import { authHandlers } from "../../store/store";
  import Navbar from "../../components/Navbar.svelte";
  import Reservation from "../../pages/Reservation.svelte";
</script>

<title>OCCUPO | reservation</title>

<div style="position: fixed; top: 0; width: 100%; z-index: 10;">
  <Navbar {authHandlers} />
</div>
<div>
  <Reservation />
</div>
