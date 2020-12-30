<script>
  import { web3Accounts, web3Enable } from "@polkadot/extension-dapp";
  import { getContext } from "svelte";
  import Modal from "../Modal.svelte";

  let context = getContext("global");

  const connect = async () => {
    const extensions = await web3Enable("Polkadot Tips Widget");

    if (extensions.length === 0) {
      alert("Please install Polkadot extension!");
      context.multistep.reset();
      return;
    }
    context.accounts.set(await web3Accounts());
    context.multistep.nextStep();
  };
</script>

<Modal on:close>
  <h2 slot="header" class="dot-text-lg dot-text-dark">Connect to Polkadot</h2>
  <div slot="content">
    <div class="dot-bg-white dot-rounded dot-shadow dot-p-8 dot-mb-8">
      <p class="dot-text-sm dot-text-dark dot-mb-4">
        In order to use Donate button you must have Polkadot Wallet installed
        and funded with tokens.
      </p>
      <div class="dot-text-base dot-text-paragraph">
        <div class="dot-py-2 dot-font-semibold">Extensions:</div>
        <ul>
          <li class="dot-text-sm">
            On Google Chrome, install via <a href="https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd" target=" _blank" rel="noopener noreferrer" class="dot-underline"> Chrome
              web store </a>
          </li>
          <li class="dot-text-sm">
            On Firefox, install via <a href="https://addons.mozilla.org/en-US/firefox/addon/polkadot-js-extension/" target=" _blank" rel="noopener noreferrer" class="dot-underline"> Firefox
              add-ons </a>
          </li>
        </ul>
      </div>
    </div>
    <button
      on:click={connect}
      class="dot-block dot-bg-accent dot-py-2 dot-px-6 dot-text-white
        dot-font-semibold dot-rounded dot-mx-auto hover:dot-bg-dark">
      Connect
    </button>
  </div>
</Modal>
