import { component$ } from "@builder.io/qwik";
import { Link, type DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <>
      <h1>Blog</h1>
      <div class="blog-posts-grid">
        <Link href="post_1">
          <article>
            <h1>Post 1</h1>
            <p>Content</p>
          </article>
        </Link>
        <Link href="post_2">
          <article>
            <h1>Post 2</h1>
            <p>Content</p>
          </article>
        </Link>
        <Link href="post_3">
          <article>
            <h1>Post 3</h1>
            <p>Content</p>
          </article>
        </Link>
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
