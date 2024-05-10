import { component$ } from "@builder.io/qwik";
import { useLocation, type DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  const loc = useLocation();
  return (
    <>
      <h1>Blog Post: {loc.params.postId}</h1>
      <div class="box">
        <p>come back later!</p>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
