import {
  component$,
  useSignal,
  useTask$,
  useVisibleTask$,
} from "@builder.io/qwik";
import styles from "./text-animation.module.css";

export interface TextAnimationProps {
  text: string;
  animation: string;
  padding?: string;
  duration?: string;
  delay?: string;
}

export const TextAnimation = component$<TextAnimationProps>((props) => {
  const animate = useSignal<boolean>(false);
  const spanRef = useSignal<HTMLSpanElement>();

  useTask$(() => {
    if (!spanRef.value) {
      return;
    }
  });

  useVisibleTask$(() => {
    if (!spanRef.value) {
      return;
    }
    const textWidth = spanRef.value.clientWidth;
    console.log(spanRef.value);
    spanRef.value.style.setProperty("--text-width", `${textWidth}px`);
    spanRef.value.style.setProperty("--padding", props.padding || "0.5rem");
    spanRef.value.style.setProperty("--delay", props.delay || "0");
    spanRef.value.style.setProperty("--duration", props.duration || "800ms");
    animate.value = true;
    spanRef.value.addEventListener("animationend", () => {
      animate.value = false;
    });
  });

  return (
    <>
      <span
        class={[styles[props.animation], animate.value ? styles["active"] : ""]}
        ref={spanRef}
      >
        <span>{props.text}</span>
      </span>
    </>
  );
});
