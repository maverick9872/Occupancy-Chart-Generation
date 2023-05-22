<script>
  export let index;
  export let data;
  export let editData;
  export let removeData;
</script>

<div class="data">
  <p>
    {index + 1} . {data}
  </p>
  <div class="actions">
    <i
      on:click={() => {
        editData(index);
      }}
      on:keydown={() => {}}
      class="fa-sharp fa-solid fa-pen-to-square"
    />
    <i
      on:click={() => {
        removeData(index);
      }}
      on:keydown={() => {}}
      class="fa-solid fa-trash-can"
    />
  </div>
</div>

<style>
  .data {
    border-left: 1px solid red;
    padding: 8px 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .actions {
    display: flex;
    align-items: center;
    gap: 7px;
    font-size: 1.3rem;
  }
  .actions i {
    cursor: pointer;
  }
  .actions i:hover {
    color: blue;
  }
</style>
