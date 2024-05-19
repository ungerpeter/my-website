import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { css } from "~/styled-system/css";

export interface MouseShadowProps {}

const shadowColor = "rgb(1 17 118 / 15%)";

export const MouseShadow = component$<MouseShadowProps>((props) => {
  const mouseFollowRef = useSignal<HTMLDivElement>();

  useVisibleTask$(() => {
    const onMouseMove = ({ clientX, clientY }: MouseEvent) => {
      if (!mouseFollowRef.value) {
        return;
      }
      mouseFollowRef.value.style.background = `radial-gradient(600px at ${clientX}px ${clientY}px, ${shadowColor}, transparent 80%)`;
    };

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  });
  return (
    <div
      ref={mouseFollowRef}
      class={css({
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background:
          "radial-gradient(600px at 50% 50%, rgb(1 17 118 / 15%), transparent 80%)",
      })}
    ></div>
  );
});
