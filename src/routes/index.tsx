import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <>
      <h1>Work in Progress</h1>
      <div class="box">
        <p>come back later!</p>
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
