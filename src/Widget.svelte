<script>
  import "./main.css";
  import { createApiProvider, createMultistep } from "./components/store";
  import { setContext } from "svelte";
  import { writable } from "svelte/store";
  import Connect from "./components/modals/Connect.svelte";
  import SelectAccount from "./components/modals/SelectAccount.svelte";
  import Donating from "./components/modals/Donating.svelte";
  import Confirmation from "./components/modals/Confirmation.svelte";

  export let beneficiary;
  export let element;
  export let buttonText = "Donate DOT";

  let showModal = false;
  let multistep = createMultistep();

  setContext("global", {
    beneficiary,
    multistep,
    accounts: writable([]),
    selectedAccount: writable(null),
    provider: createApiProvider(),
  });

  function handleClose() {
    showModal = false;
    multistep.reset();
  }

  let modals = [
    { component: Connect },
    { component: SelectAccount },
    { component: Donating },
    { component: Confirmation },
  ];

  let selected;
  multistep.subscribe(({ index }) => (selected = modals[index]));

  if (element) {
    element.onclick = function () {
      showModal = true;
    };
  }
</script>

<div id="polkadot-tips-wrapper">
  {#if !element}
    <button
      on:click={() => (showModal = true)}
      class="dot-inline-block dot-bg-accent dot-py-2 dot-px-6 dot-m-auto
        dot-text-white dot-rounded">
      {buttonText}
    </button>
  {/if}
  {#if showModal}
    <svelte:component this={selected.component} on:close={handleClose} />
  {/if}
</div>
