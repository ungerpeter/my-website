import { component$, Slot, useStyles$ } from "@builder.io/qwik";
import { MouseShadow } from "~/components/mouse-shadow/mouse-shadow";

import styles from "~/routes/styles.css?inline";

export default component$(() => {
  useStyles$(styles);
  return (
    <>
      <MouseShadow />
      <Slot />
    </>
  );
});
