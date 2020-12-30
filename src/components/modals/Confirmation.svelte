<script>
  import { getContext } from "svelte";
  import Modal from "../Modal.svelte";

  let context = getContext("global");
  let multistep = context.multistep;
</script>

<Modal on:close>
  <h2 slot="header" class="dot-text-lg dot-text-dark">Confirmation</h2>
  <div
    slot="content"
    class="dot-flex dot-flex-col dot-items-center dot-justify-center"
    style="max-height: 400px">
    <svg
      class="dot-w-32 dot-h-32 dot-fill-current dot-text-green-500 dot-p-2"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"><g data-name="Layer 2">
        <g data-name="checkmark-circle-2">
          <path
            d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm0 18a8 8 0 118-8 8 8 0 01-8 8z" />
          <path
            d="M14.7 8.39l-3.78 5-1.63-2.11a1 1 0 00-1.58 1.23l2.43 3.11a1 1 0 00.79.38 1 1 0 00.79-.39l4.57-6a1 1 0 10-1.6-1.22z" />
        </g>
      </g></svg>
    <p class="dot-text-lg dot-font-semibold dot-text-paragraph dot-mb-2">
      {$multistep.data.message}
    </p>
    <a
      class="dot-text-sm dot-text-paragraph dot-underline"
      target="_blank"
      href="https://polkadot.subscan.io/account/{$multistep.data.address}">View
      on subscan.io</a>
    <button
      on:click={() => multistep.previousStep()}
      class="dot-block dot-text-light dot-my-6 dot-text-sm">
      Go back
    </button>
  </div>
</Modal>
