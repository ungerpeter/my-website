import { component$ } from "@builder.io/qwik";
import {
  Progress as QwikUiProgress,
  ProgressIndicator,
} from "@qwik-ui/headless";
import { css } from "~/styled-system/css";

export interface ProgressProps {
  value: number;
}

export const Progress = component$<ProgressProps>((props) => {
  return (
    <QwikUiProgress value={props.value} class={css({
      width: '100%',
      height: '1rem',
      backgroundColor: 'var(--bg-color-muted)',
      overflow: 'hidden',
      borderRadius: 'var(--border-radius-small)'
    })}>
      <ProgressIndicator
        class={css({
          height: '100%',
          width: '100%',
          backgroundColor: 'var(--fg-color-default)'
        })}
        style={{
          transform: `translateX(-${100 - props.value}%)`,
        }}
      />
    </QwikUiProgress>
  );
});
