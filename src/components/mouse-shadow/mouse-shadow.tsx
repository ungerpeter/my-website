import {
  type NoSerialize,
  component$,
  useSignal,
  useVisibleTask$,
  noSerialize,
  useStore,
  $,
  type QRL,
} from "@builder.io/qwik";
import { css } from "~/styled-system/css";
import styles from "./mouse-shadow.module.css";

export interface MouseShadowProps {}

type ShadowColorStore = {
  r: number;
  g: number;
  b: number;
  a: number;
  getString: QRL<(this: ShadowColorStore) => string>;
};

export const MouseShadow = component$<MouseShadowProps>(() => {
  const shadowColor = useStore({
    r: 1,
    g: 17,
    b: 118,
    a: 0.15,
    getString: $(function (this: ShadowColorStore) {
      return `rgb(${this.r} ${this.g} ${this.b} / ${this.a * 100}%)`;
    }),
  });
  const containerRef = useSignal<HTMLDivElement>();
  const mouseFollowRef = useSignal<HTMLDivElement>();
  const intersectionObserver = useSignal<NoSerialize<IntersectionObserver>>();
  const relevantPois = useSignal<Element[]>([]);
  const useMouseFollowBox = useSignal(false);

  useVisibleTask$(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          relevantPois.value = [...relevantPois.value, entry.target];
        } else {
          relevantPois.value = relevantPois.value.filter(
            (el) => el !== entry.target
          );
        }
      });
    };
    intersectionObserver.value = noSerialize(
      new IntersectionObserver(observerCallback, {
        rootMargin: "200px",
      })
    );

    const onMouseMove = async ({ clientX, clientY }: MouseEvent) => {
      if (!containerRef.value) {
        return;
      }
      if (mouseFollowRef.value) {
        mouseFollowRef.value.style.transform = `translate(${clientX}px, ${clientY}px)`;
      }
      relevantPois.value.forEach((el) => {
        const targetBounds = el.getBoundingClientRect();
        const dx = clientX - targetBounds.x - targetBounds.width / 2;
        const dy = clientY - targetBounds.y - targetBounds.height / 2;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 200) {
          const strength = 1 - distance / 200;
          shadowColor.a = 0.15 + strength * 0.85;
        }
      });
      const shadowColorString = await shadowColor.getString();
      containerRef.value.style.background = `radial-gradient(600px at ${clientX}px ${clientY}px, ${shadowColorString}, transparent 80%)`;
    };
    window.addEventListener("mousemove", onMouseMove);

    document.querySelectorAll("[data-poi]").forEach((el) => {
      el.classList.add(styles["poi"]);
      intersectionObserver.value!.observe(el);
    });

    return () => {
      intersectionObserver.value!.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
    };
  });
  return (
    <div
      ref={containerRef}
      class={css({
        position: "fixed",
        pointerEvents: "none",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background:
          "radial-gradient(600px at 50% 50%, rgb(1 17 118 / 15%), transparent 80%)",
      })}
    >
      {useMouseFollowBox.value && (
        <div
          ref={mouseFollowRef}
          class={css({
            position: "absolute",
            background: "red",
            pointerEvents: "none",
            width: "10px",
            height: "10px",
          })}
        ></div>
      )}
    </div>
  );
});
