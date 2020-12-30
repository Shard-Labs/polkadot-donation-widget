<script>
    import { formatBalance } from "@polkadot/util";
    import { getContext, onMount } from "svelte";
    import { parseInput, transactionHandler } from "../../utils/index.js";
    import { encodeAddress } from "@polkadot/util-crypto";

    let context = getContext("global");
    let selectedAccount = context.selectedAccount;
    let multistep = context.multistep;
    let provider = context.provider;
    let balance;
    let amount;
    let submitting = false;
    let tokenSymbol;

    let timer;
    let extrinsic;
    let estimatedFee;
    let message;

    const debounce = (value) => {
        clearTimeout(timer);
        extrinsic = null;

        timer = setTimeout(async () => {
            amount = value;
            extrinsic = $provider.tx.balances.transfer(
                context.beneficiary,
                parseInput(value, $provider.registry.chainDecimals)
            );

            let paymentInfo = await extrinsic.paymentInfo(
                $selectedAccount.address
            );
            estimatedFee = formatBalance(paymentInfo.partialFee, {
                withSi: true,
                decimals: $provider.registry.chainDecimals,
                withUnit: $provider.registry.chainToken,
            });
        }, 300);
    };

    const updateBalance = async () => {
        let account = await $provider.query.system.account(
            $selectedAccount.address
        );
        balance = account.data.free;
    };

    onMount(async () => {
        updateBalance();
        let properties = await $provider.rpc.system.properties();
        tokenSymbol = properties.tokenSymbol;
    });

    const onSubmit = async () => {
        submitting = true;
        extrinsic.signAndSend($selectedAccount.address, async (response) => {
            if (!response.isFinalized) return;
            try {
                await transactionHandler(response);
                multistep.nextStep({
                    message: `Successfully donated ${amount} ${tokenSymbol}`,
                    address: encodeAddress($selectedAccount.address, 0),
                });
            } catch (err) {
                message = err.message;
            }
            submitting = false;
            updateBalance();
        });
    };
</script>

<form on:submit|preventDefault={onSubmit}>
    <div class="dot-flex dot-justify-between dot-mt-2 dot-leading-loose">
        <span class="dot-text-xs dot-text-paragraph">Amount {tokenSymbol ? `(${tokenSymbol})` : ''}</span>
        <span
            class="dot-text-xs dot-text-paragraph dot-ml-auto"
            class:dot-invisible={!balance}>Available: {balance && balance.toHuman()}</span>
    </div>
    <input
        type="text"
        class="dot-bg-white focus:dot-bg-background dot-border dot-border-solid
            dot-border-opacity-50 dot-border-light dot-rounded dot-block
            dot-w-full dot-p-2"
        on:keyup={({ target: { value } }) => debounce(value)}
        required />
    <div
        class="dot-text-xs dot-text-paragraph dot-leading-loose dot-mb-2"
        class:dot-hidden={!estimatedFee}>
        Fees of {estimatedFee} will be applied to the submission
    </div>
    <button
        class="dot-flex dot-py-2 dot-px-6 dot-mx-auto dot-mt-4 dot-text-white
            dot-rounded dot-text-sm"
        class:dot-bg-gray-500={!extrinsic || submitting}
        class:dot-bg-accent={extrinsic}
        disabled={!extrinsic || submitting}>
        {#if submitting}
            <svg
                class="dot-animate-spin dot--ml-2 dot-mr-3 dot-h-5 dot-w-5
                    dot-text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24">
                <circle
                    class="dot-opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4" />
                <path
                    class="dot-opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
        {/if}
        <span class="dot-inline-block">
            {submitting ? 'Processing...' : 'Donate'}</span>
    </button>
    <div
        class="dot-block dot-mt-4 dot-px-4 dot-py-2 dot-rounded dot-text-white
            dot-text-sm dot-bg-red-500"
        class:dot-hidden={!message}
        on:click={() => (message = null)}>
        {message}
    </div>
</form>
