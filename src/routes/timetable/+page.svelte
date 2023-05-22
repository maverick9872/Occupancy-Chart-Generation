<script>
  import { authHandlers } from "../../store/store";
  import Timetable from "../../pages/Timetable.svelte";
  import Navbar from "../../components/Navbar.svelte";
</script>

<title>OCCUPO | Timetable</title>

<div style="position: fixed; top: 0; width: 100%; z-index: 10;">
  <Navbar {authHandlers} />
</div>
<div>
  <Timetable />
</div>
