import { writable } from "svelte/store";
import { ApiPromise, WsProvider } from "@polkadot/api";

export function createMultistep() {
  const initialState = { index: 0, data: null };
  const { subscribe, set, update } = writable(initialState);

  return {
    subscribe,
    nextStep: (data) => update((s) => ({ index: s.index + 1, data })),
    previousStep: (data) => update((s) => ({ index: s.index - 1, data })),
    reset: () => set(initialState),
  };
}

export function createApiProvider() {
  const { subscribe, set, update } = writable(null);

  return {
    subscribe,
    update,
    connect: async () => {
      const provider = new WsProvider("wss://cc1-1.polkadot.network/");

      let api = new ApiPromise({ provider });
      await api.isReady;

      let [chain, nodeName, nodeVersion] = await Promise.all([
        api.rpc.system.chain(),
        api.rpc.system.name(),
        api.rpc.system.version(),
      ]);

      console.log(
        `Connected to chain ${chain} using ${nodeName} v${nodeVersion}`
      );

      set(api);
    },
    clear: () => set(null),
  };
}
