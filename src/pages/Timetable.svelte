<script>
  import { onMount } from "svelte";

  let roomOptions = [];
  let selectedRoom = "";
  let timetableData = [];

  onMount(async () => {
    // Fetch room options
    await fetchRoomOptions();
  });

  const fetchRoomOptions = async () => {
    try {
      const response = await fetch("http://localhost:4000/users/rooms");
      const options = await response.json();
      roomOptions = Array.from(new Set(options))
        .map((roomId) => ({ room_id: roomId }))
        .sort((a, b) => a.room_id - b.room_id);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTimetableData = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/users/timetable/${selectedRoom}`
      );
      timetableData = await response.json();
    } catch (error) {
      console.error(error);
    }
  };

  const handleRoomSelect = (event) => {
    selectedRoom = event.target.value;
  };

  const renderTimetable = () => {
    if (timetableData.length === 0) {
      return `<p>No timetable data available.</p>`;
    }
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const slots = [1, 2, 3, 4, 5, 6, 7, 8];

    return `
      <div class="mt-4">
        <table class="striped">
          <thead>
            <tr>
              <th>Day</th>
              ${slots.map((slot) => `<th>Slot ${slot}</th>`).join("")}
            </tr>
          </thead>
          <tbody>
            ${daysOfWeek
              .map(
                (day) => `
              <tr>
                <td>${day}</td>
                ${slots
                  .map((slot) => {
                    const entry = timetableData.find(
                      (item) => item.day === day && item.slot === slot
                    );
                    return `<td>${entry ? entry.course_code : ""}</td>`;
                  })
                  .join("")}
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      </div>
    `;
  };
</script>
<br/><br/>
<main class="container">
  <div class="section">
    <h2 class="text-2xl font-semibold">Select a Room</h2>
    <div class="input-field mt-2">
      <select
        class="browser-default"
        bind:value={selectedRoom}
        on:change={handleRoomSelect}
      >
        <option value="">Select a Room</option>
        {#each roomOptions as room}
          <option value={room.room_id}>{room.room_id}</option>
        {/each}
      </select>
    </div>

    <button
      class="btn waves-effect waves-light mt-4"
      on:click={fetchTimetableData}
      disabled={!selectedRoom}
    >
      Get Timetable
    </button>

    {#if timetableData.length > 0}
      <div class="mt-4">
        <table class="striped">
          <thead>
            <tr>
              <th>Day</th>
              {#each Array.from(Array(8).keys()) as slot}
                <th>Slot {slot + 1}</th>
              {/each}
            </tr>
          </thead>
          <tbody>
            {#each ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as day}
              <tr>
                <td>{day}</td>
                {#each Array.from(Array(8).keys()) as slot}
                  {#if timetableData.find((item) => item.day === day && item.slot === slot + 1)}
                    <td
                      >{timetableData.find(
                        (item) => item.day === day && item.slot === slot + 1
                      ).course_code}</td
                    >
                  {:else}
                    <td />
                  {/if}
                {/each}
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/if}

    <div class="mt-8">
      <label for="formFileSm" class="block text-lg font-semibold mb-2"
        >Input the timetable for a room</label
      >
      <div class="input-field">
        <select
          class="browser-default"
          bind:value={selectedRoom}
          on:change={handleRoomSelect}
        >
          <option value="">Select a Room</option>
          {#each roomOptions as room}
            <option value={room.room_id}>{room.room_id}</option>
          {/each}
        </select>
      </div>
      <div class="file-field input-field mt-2">
        <div class="btn">
          <span>Choose File</span>
          <input type="file" id="formFileSm" />
        </div>
        <div class="file-path-wrapper">
          <input class="file-path validate" type="text" />
        </div>
      </div>
    </div>
  </div>
</main>
