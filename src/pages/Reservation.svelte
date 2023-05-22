<script>
  import { onMount } from "svelte";

  let roomOptions = [];
  let selectedRoom = "";
  let selectedSlot = "";
  let reservationData = [];
  let timetableId = "";
  let userId = "";
  let reservationDate = "";

  onMount(async () => {
    // Fetch room options
    await fetchRoomOptions();
  });

  const fetchRoomOptions = async () => {
    try {
      const response = await fetch("http://localhost:4000/users/rooms");
      const data = await response.json();
      const uniqueOptions = [...new Set(data)];
      const sortedOptions = uniqueOptions
        .map((roomId) => ({ room_id: roomId }))
        .sort((a, b) => a.room_id - b.room_id);
      roomOptions = sortedOptions;
    } catch (error) {
      console.error(error);
    }
  };

  const fetchReservationData = async () => {
    try {
      const response = await fetch("http://localhost:4000/users/reservations");
      reservationData = await response.json();
    } catch (error) {
      console.error(error);
    }
  };

  const handleRoomSelect = (event) => {
    selectedRoom = event.target.value;
  };

  const handleSlotSelect = (event) => {
    selectedSlot = event.target.value;
  };

  const handleTimetableIdChange = (event) => {
    timetableId = event.target.value;
  };

  const handleUserIdChange = (event) => {
    userId = event.target.value;
  };

  const handleReservationDateChange = (event) => {
    reservationDate = event.target.value;
  };

  const handleReservationSubmit = async (event) => {
    event.preventDefault();
    try {
      await fetch("http://localhost:4000/users/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          timetable_id: timetableId,
          user_id: userId,
          reservation_date: reservationDate,
          room_id: selectedRoom,
          slot: selectedSlot,
        }),
      });
      await fetchReservationData();
      selectedRoom = "";
      selectedSlot = "";
    } catch (error) {
      console.error(error);
    }
  };

  const renderReservationTable = () => {
    if (reservationData.length === 0) {
      return `<p>No reservations available.</p>`;
    }
    return `
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th>Reservation ID</th>
              <th>Room ID</th>
              <th>Slot</th>
            </tr>
          </thead>
          <tbody>
            {reservationData.map(reservation => (
              <tr key={reservation.reservation_id}>
                <td>{reservation.reservation_id}</td>
                <td>{reservation.room_id}</td>
                <td>{reservation.slot}</td>
              </tr>
            ))}
          </tbody>
        </table>`;
  };
</script>
<br/><br/>
<div class="container">
  <div class="section">
    <div class="form-group">
      <h2>View Reservations</h2>
      {#if reservationData.length === 0}
        <p>No reservations available.</p>
      {:else}
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th>Reservation ID</th>
              <th>Room ID</th>
              <th>Slot</th>
            </tr>
          </thead>
          <tbody>
            {#each reservationData as reservation}
              <tr key={reservation.reservation_id}>
                <td>{reservation.reservation_id}</td>
                <td>{reservation.room_id}</td>
                <td>{reservation.slot}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      {/if}
    </div>

    <div class="form-group">
      <h2>Create Reservation</h2>
      <form class="needs-validation" on:submit={handleReservationSubmit}>
        <div class="form-group">
          <label for="roomSelect">Select a Room:</label>
          <select
            class="form-control"
            id="roomSelect"
            value={selectedRoom}
            on:change={handleRoomSelect}
            required
          >
            <option value="">Select a Room</option>
            {#each roomOptions as room}
              <option value={room.room_id}>{room.room_id}</option>
            {/each}
          </select>
        </div>

        <div class="form-group">
          <label for="slotSelect">Select a Slot:</label>
          <select
            class="form-control"
            id="slotSelect"
            value={selectedSlot}
            on:change={handleSlotSelect}
            required
          >
            <option value="">Select a Slot</option>
            <option value="1">Slot 1</option>
            <option value="2">Slot 2</option>
            <option value="3">Slot 3</option>
            <option value="4">Slot 4</option>
            <option value="5">Slot 5</option>
            <option value="6">Slot 6</option>
            <option value="7">Slot 7</option>
            <option value="8">Slot 8</option>
          </select>
        </div>

        <div class="form-group">
          <label for="timetableIdInput">Timetable ID:</label>
          <input
            type="text"
            class="form-control"
            id="timetableIdInput"
            bind:value={timetableId}
            required
          />
        </div>

        <div class="form-group">
          <label for="userIdInput">User ID:</label>
          <input
            type="text"
            class="form-control"
            id="userIdInput"
            bind:value={userId}
            required
          />
        </div>

        <div class="form-group">
          <label for="reservationDateInput">Reservation Date:</label>
          <input
            type="date"
            class="form-control"
            id="reservationDateInput"
            bind:value={reservationDate}
            required
          />
        </div>

        <button
          type="submit"
          class="btn btn-primary"
          disabled={!selectedRoom || !selectedSlot}
        >
          Make Reservation
        </button>
      </form>
    </div>
  </div>
</div>
