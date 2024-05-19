import { component$, Slot, useSignal } from "@builder.io/qwik";

import {
  LuHome,
  LuFileText,
  LuPresentation,
  LuNewspaper,
  LuMessageCircle,
  LuMenu,
  LuMail,
} from "@qwikest/icons/lucide";

import { NavLink } from "~/components/nav-link/nav-link";
import { css } from "~/styled-system/css";
import { container } from "~/styled-system/patterns";

export default component$(() => {
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
                <LuMail />
                Contact me
              </NavLink>
            </li>
            <li>
              <NavLink href="/chat/">
                <LuMessageCircle />
                Chat with me
              </NavLink>
            </li>
          </ul>
        </nav>
        <footer
          class={[
            "content-wrapper",
            css({
              color: "var(--fg-color-muted)",
              marginBottom: "17px",
              marginLeft: "65px",
              textAlign: "center",
              md: {
                marginLeft: "0",
              },
            }),
          ]}
        >
          © 2024 - Peter Unger
        </footer>
      </aside>
      <main
        class={css({
          paddingY: "1rem",
          md: {
            marginLeft: "var(--sidebar-width)",
          },
        })}
      >
        <div class={container({})}>
          <Slot />
        </div>
      </main>
    </>
  );
});
