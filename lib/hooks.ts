import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/** True once the component has hydrated on the client. Avoids theme/UI flashes without setState-in-effect. */
export function useHasMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}
