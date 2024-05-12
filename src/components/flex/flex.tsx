import { Slot, component$ } from "@builder.io/qwik";
import { flex } from "~/styled-system/patterns";

export interface FlexProps {
  justify?: string;
}

export const Flex = component$<FlexProps>(({ justify }) => {
  return (
    <div class={flex({ justify })}>
      <Slot />
    </div>
  );
});
