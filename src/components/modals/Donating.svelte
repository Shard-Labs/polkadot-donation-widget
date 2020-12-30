<script>
  import { getContext, onDestroy } from "svelte";
  import Modal from "../Modal.svelte";
  import Loader from "../common/SyncLoader.svelte";
  import { web3FromAddress } from "@polkadot/extension-dapp";
  import DonateForm from "./DonateForm.svelte";

  let context = getContext("global");
  let selectedAccount = context.selectedAccount;
  let provider = context.provider;

  let loading = true;
  let unsub = provider.subscribe(async (api) => {
    if (!api) return;
    const injector = await web3FromAddress($selectedAccount.address);
    api.setSigner(injector.signer);
  });
  provider.connect().then(() => (loading = false));

  onDestroy(() => unsub());
</script>

<Modal on:close>
  <div slot="header" class="dot-flex dot-flex-col">
    <div class="dot-flex dot-justify-between">
      <div class="dot-font-semibold">{$selectedAccount.meta.name}</div>
      <span
        class="dot-text-xs dot-text-accent dot-cursor-pointer dot-self-end"
        on:click={() => {
          context.selectedAccount.set(null);
          context.multistep.previousStep();
        }}>
        Change account
      </span>
    </div>

    <div class="dot-text-xs dot-text-paragraph dot-truncate">
      {$selectedAccount.address}
    </div>
  </div>
  <div slot="content" class="dot-p-8 dot-bg-white dot-shadow dot-rounded">
    {#if loading}
      <div
        class="dot-flex dot-flex-col dot-justify-center dot-items-center
          dot-box-border"
        style="height: 273px">
        <Loader />
        <p class="dot-text-sm dot-text-paragraph">Connecting to Polkadot...</p>
      </div>
    {:else}
      <DonateForm />
    {/if}
  </div>
</Modal>
