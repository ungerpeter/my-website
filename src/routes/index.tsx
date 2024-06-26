import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { NavLink } from "~/components/nav-link/nav-link";
import { SvgAvatar } from "~/components/svg-avatar/svg-avatar";
import { TextAnimation } from "~/components/text-animation/text-animation";
import { css } from "~/styled-system/css";
import { container } from "~/styled-system/patterns";

export default component$(() => {
  return (
    <>
      <div
        class={container({
          width: "100vw",
          height: "100vh",
          display: "grid",
          direction: "column",
          gridTemplateColumns: "1fr",
          gridTemplateRows: "2fr 4fr 1fr 1fr",
          alignItems: "center",
          justifyItems: "center",
          textAlign: "center",
          fontSize: "2rem",
        })}
      >
        <div
          class={css({
            alignSelf: "flex-end",
          })}
        >
          <h1
            class={css({
              fontSize: "max(5vw, 2rem) !important",
            })}
          >
            Hi,
            <TextAnimation
              text="my name is Peter"
              animation={"reveal-ltr"}
              padding="0 0.5rem"
              delay={"1000ms"}
            />
            👋
          </h1>
          <h2
            class={css({
              fontSize: "max(2vw, 1.25rem) !important",
            })}
          >
            <TextAnimation
              text="I enjoy programming and thinking outside of the 📦."
              animation={"reveal-ltr"}
              padding="0 0.5rem"
              delay={"3000ms"}
            />
          </h2>
        </div>
        <SvgAvatar />
        <div
          class={css({
            alignSelf: "flex-start",
          })}
        >
          <div
            data-poi="true"
            class={[
              css({
                border: "1px solid var(--border-color)",
                borderRadius: "var(--border-radius)",
                padding: "1rem 2rem",
                _hover: {
                  color: "blue",
                }
              })
            ]}
          >
            Let's chat
          </div>
        </div>
        <div
          class={css({
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "1rem",
            "& > button": {
              cursor: "pointer",
              border: "1px solid var(--border-color)",
              borderRadius: "var(--border-radius)",
              padding: "1rem 2rem",
              "&:hover": {
                color: "blue",
              },
            },
          })}
        >
          <NavLink href="/cv/">My CV</NavLink>
          <NavLink href="/portfolio/">My portfolio</NavLink>
          <NavLink href="/blog/">My blog</NavLink>
          <NavLink href="/contact/">Contact me</NavLink>
        </div>
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
