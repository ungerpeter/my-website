import { Slot, component$ } from "@builder.io/qwik";
import { grid } from "~/styled-system/patterns";

export interface GridProps {
  columns?: number;
  gap?: string;
}

export const Grid = component$<GridProps>((props) => {
  return (
    <div
      class={grid({ columns: props.columns || 1, gap: props.gap || "1rem" })}
    >
      <Slot />
    </div>
  );
});
