import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { SvgAvatar } from "~/components/svg-avatar/svg-avatar";
import { center } from "~/styled-system/patterns";

export default component$(() => {
  return (
    <>
      <h1>Work in Progress</h1>
      <div class="box">
        <p>come back later!</p>
      </div>
      <div class={center({ marginTop: "3rem" })}>
        <SvgAvatar />
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Home - Peter Unger",
  meta: [
    {
      name: "description",
      content: "This is my personal webpage - Peter Unger.",
    },
  ],
};
