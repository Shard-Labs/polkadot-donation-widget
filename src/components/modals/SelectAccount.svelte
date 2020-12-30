<script>
  import { getContext } from "svelte";
  import Modal from "../Modal.svelte";
  import { encodeAddress } from "@polkadot/util-crypto";

  let context = getContext("global");
  let accounts = context.accounts;
</script>

<Modal on:close>
  <h2 slot="header" class="dot-text-lg dot-text-gray-900">
    Select Polkadot Account
  </h2>
  <ul
    slot="content"
    class="dot--m-2 dot-p-2 dot-overflow-y-scroll"
    style="max-height: 360px">
    {#each $accounts as account}
      <li
        class="dot-text-sm dot-text-medium dot-rounded dot-shadow dot-p-4
          dot-mb-4 dot-bg-white dot-truncate dot-cursor-pointer
          hover:dot-bg-gray-100"
        on:click={async () => {
          context.selectedAccount.set(account);
          context.multistep.nextStep();
        }}>
        <div class="dot-font-semibold">{account.meta.name}</div>
        <div class="dot-text-medium dot-truncate">
          {encodeAddress(account.address, 0)}
        </div>
      </li>
    {/each}
  </ul>
</Modal>
