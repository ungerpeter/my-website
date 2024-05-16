import { component$, Slot, useSignal, useStyles$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { RequestHandler } from "@builder.io/qwik-city";

import {
  LuHome,
  LuFileText,
  LuPresentation,
  LuNewspaper,
  LuMessageCircle,
  LuMenu,
} from "@qwikest/icons/lucide";

import styles from "./styles.css?inline";
import { NavLink } from "~/components/nav-link/nav-link";
import { css } from "~/styled-system/css";

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
  const sidebarRef = useSignal<HTMLDivElement>();
  return (
    <>
      <div
        class={css({
          margin: "1rem",
          color: "var(--fg-color-muted)",
          backgroundColor: "var(--bg-color-primary)",
          border: "1px solid var(--border-color)",
          borderRadius: "0.5rem",
          padding: "0.5rem",
          fontSize: "3xl",
          position: "fixed",
          bottom: 0,
          left: 0,
          zIndex: 7000,
          cursor: "pointer",
          transition: "all 0.16s",
          _hover: {
            color: "var(--fg-color)",
            borderColor: "var(--fg-color)",
          },
          md: {
            display: "none",
          },
          "&.open": { zIndex: 100 },
        })}
        onClick$={() => {
          sidebarRef.value?.classList.toggle("open");
        }}
      >
        <LuMenu />
      </div>
      <aside
        ref={sidebarRef}
        class={[
          "sidebar",
          css({
            zIndex: 5000,
            transform: "translateX(-100%)",
            transition: "transform 0.16s cubic-bezier(0.4, 0, 0.2, 1)",
            userSelect: "none",
            md: { transform: "translateX(0)" },
            "&.open": { transform: "translateX(0)" },
          }),
        ]}
      >
        <header class="content-wrapper">
          <div class="avatar-wrapper">
            <a href="/">
              <img
                class="avatar"
                src="https://avatars.githubusercontent.com/u/4763039?v=4"
                width={150}
                height={150}
                alt="Peter Unger"
              />
            </a>
          </div>
          <h1>Peter Unger</h1>
          <h2>Senior Software Engineer</h2>
        </header>
        <nav class="content-wrapper">
          <ul>
            <li>
              <NavLink href="/">
                <LuHome />
                About me
              </NavLink>
            </li>
            <li>
              <NavLink href="/cv/">
                <LuFileText />
                My cv
              </NavLink>
            </li>
            <li>
              <NavLink href="/portfolio/">
                <LuPresentation />
                My portfolio
              </NavLink>
            </li>
            <li>
              <NavLink href="/blog/">
                <LuNewspaper />
                My blog
              </NavLink>
            </li>
            <li>
              <NavLink href="/contact/">
                <LuMessageCircle />
                Contact me
              </NavLink>
            </li>
          </ul>
        </nav>
        <footer class={["content-wrapper", css({
          color: "var(--fg-color-muted)",
          marginBottom: "17px",
          marginLeft: "65px",
          textAlign: "center",
          md: { 
            marginLeft: "0",
          },
        })]}>© 2024 - Peter Unger</footer>
      </aside>
      <main
        class={css({
          paddingY: "1rem",
          md: {
            marginLeft: "var(--sidebar-width)",
          },
        })}
      >
        <div class="container">
          <Slot />
        </div>
      </main>
    </>
  );
});
