<script>
  import { doc, setDoc } from "firebase/firestore";
  import { authStore } from "../store/store";
  import { db } from "../lib/firebase/firebase";
  import DataItem from "./DataItem.svelte";
  let dataList = [];
  let currData = "";
  let error = false;
  authStore.subscribe((curr) => {
    dataList = curr.data.datas;
  });
  function addData() {
    error = false;
    if (!currData) {
      error = true;
    } else {
      dataList = [...dataList, currData];
      currData = "";
    }
  }
  function editData(index) {
    let newData = [...dataList].filter((val, i) => {
      return i !== index;
    });
    currData = dataList[index];
    dataList = newData;
  }
  function removeData(index) {
    let newData = [...dataList].filter((val, i) => {
      return i !== index;
    });
    dataList = newData;
  }
  async function saveData() {
    try {
      const userRef = doc(db, "users", $authStore.user.uid);
      await setDoc(
        userRef,
        {
          datas: dataList,
        },
        { merge: true }
      );
    } catch (err) {
      console.log("You have error while saving:", err);
    }
  }
</script>

{#if !$authStore.loading}
  <div class="mainContainer">
    <main>
      {#if dataList.length === 0}
        <p>You have no reservation data!</p>
      {/if}
      {#each dataList as data, index}
        <DataItem {data} {index} {removeData} {editData} />
      {/each}
    </main>
    <button on:click={saveData}
      ><i class="fa-solid fa-floppy-disk" />
      <p>Save</p></button
    >
    <div class={"enterData " + (error ? "errorBorder" : "")}>
      <input bind:value={currData} type="text" placeholder="Enter data" />
      <button on:click={addData}>ADD</button>
    </div>
  </div>
{/if}

<style>
  .mainContainer {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    gap: 24px;
    padding: 24px;
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
  }

  main {
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1;
  }

  .enterData {
    display: flex;
    align-items: stretch;
    border: 1px solid rgb(163, 0, 0);
    border-radius: 6px;
    overflow: hidden;
  }
  .errorBorder {
    border-color: green !important;
  }
  .enterData input {
    background: transparent;
    border: none;
    padding: 14px;
    color: rgb(255, 248, 248);
    flex: 1;
  }
  .enterData input:focus {
    outline: none;
  }
  .enterData button {
    padding: 0 28px;
    background: #11e21f;
    border: none;
    color: rgb(255, 95, 95);
    font-weight: 600;
    cursor: pointer;
  }
  .enterData button:hover {
    background: transparent;
  }
</style>
