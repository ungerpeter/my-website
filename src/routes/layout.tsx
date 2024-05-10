import { component$, Slot, useStyles$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { RequestHandler } from "@builder.io/qwik-city";

import { LuHome, LuFileText, LuPresentation } from "@qwikest/icons/lucide";

import styles from "./styles.css?inline";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.dev/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export default component$(() => {
  useStyles$(styles);
  return (
    <>
      <aside class="sidebar">
        <header class="content-wrapper">
          <div class="avatar-wrapper">
          <a href="#">
            <img class="avatar" src="https://avatars.githubusercontent.com/u/4763039?v=4" width={150} height={150} alt="Peter Unger" />
          </a>
          </div>
          <h1>Peter Unger</h1>
          <h2>Senior Software Engineer</h2>
        </header>
        <nav class="content-wrapper">
          <ul>
            <li>
              <a href="#"><LuHome />Home</a>
            </li>
            <li>
              <a href="#"><LuFileText />CV</a>
            </li>
            <li>
              <a href="#"><LuPresentation />Projects</a>
            </li>
          </ul>
        </nav>
        <footer class="content-wrapper">© 2024 - Peter Unger</footer>
      </aside>
      <main>
        <div class="container">
          <Slot />
        </div>
      </main>
    </>
  );
});
