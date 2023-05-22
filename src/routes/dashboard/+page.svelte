<script>
  import { authHandlers } from "../../store/store";
  import Navbar from "../../components/Navbar.svelte";
  import Homepage from "../../pages/Homepage.svelte";
  import Footer from "../../components/Footer.svelte";
</script>

<div style="position: fixed; top: 0; width: 100%; z-index: 10;">
  <Navbar {authHandlers} />
</div>
<div>
  <Homepage />
</div>

<Footer />
