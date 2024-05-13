import { Slot, component$ } from "@builder.io/qwik";
import { flex } from "~/styled-system/patterns";

export interface FlexProps {
  direction?: string;
  gap?: string;
  justify?: string;
  wrap?: string;
}

export const Flex = component$<FlexProps>(
  ({ justify, direction, gap, wrap }) => {
    return (
      <div class={flex({ justify, direction, gap, wrap })}>
        <Slot />
      </div>
    );
  }
);
