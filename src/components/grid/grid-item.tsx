import { Slot, component$ } from "@builder.io/qwik";
import { gridItem } from "~/styled-system/patterns";

export interface GridItemProps {
  colSpan?: number;
  class?: string;
}

export const GridItem = component$<GridItemProps>((props) => {
  return (
    <div class={`${gridItem({ colSpan: props.colSpan })} ${props.class || ''}`}>
      <Slot />
    </div>
  );
});
