import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Flex } from "~/components/flex/flex";
import { Grid } from "~/components/grid/grid";
import { css } from "~/styled-system/css";

export type Project = {
  thumbnailUrl: string;
  title: string;
  description: string;
  publishDate: string;
  url: string;
  tags: string[];
};

const projects: Project[] = [
  {
    title: "IT Mania Game",
    thumbnailUrl: "https://placehold.co/400x300",
    description:
      "This little 2d game (Java) was a weekend project for my Programming 1 course in first semester at Zurich University of Applied Sciences.",
    publishDate: "12.11.2015",
    url: "https://github.com/ungerpeter/it-mania-game",
    tags: ["game-development", "java", "maven"],
  },
  {
    title: "Issue Tracker",
    thumbnailUrl: "https://placehold.co/400x300",
    description: "Webapplication Project for my Web-3 class at the ZHAW.",
    publishDate: "03.02.2017",
    url: "https://github.com/ungerpeter/Issue-Tracker-ZHAW",
    tags: ["es6", "react", "redux", "express", "graphql"],
  },
  {
    title: "My Website",
    thumbnailUrl: "https://placehold.co/400x300",
    description: "My personal website project.",
    publishDate: "10.05.2024",
    url: "https://github.com/ungerpeter/my-website",
    tags: ["typescript", "qwik", "pandacss", "cloudflare-pages"],
  },
];

export default component$(() => {
  return (
    <>
      <h1>Portfolio</h1>
      <Grid columns={3}>
        {projects.map((project, idx) => (
          <div key={`${idx}__${project.title}`} class="box">
            <img src={project.thumbnailUrl} width={400} height={300} />
            <h2>{project.title}</h2>
            <Flex direction="column" gap="1rem">
              <p>{project.description}</p>
              <Flex wrap="wrap" gap="0.25rem">
                {project.tags.map((tag, tag_idx) => (
                  <span key={`${tag_idx}__${tag}`} class={css({
                    fontSize: 'smaller',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--border-radius)',
                    padding: '0.5rem'
                  })}>{tag}</span>
                ))}
              </Flex>
              <p>{project.publishDate}</p>
              <a href={project.url} target="_blank">
                Check it out
              </a>
            </Flex>
          </div>
        ))}
      </Grid>
    </>
  );
});

export const head: DocumentHead = {
  title: "Peter's Portfolio",
  meta: [
    {
      name: "description",
      content: "This is my portfolio page - Peter Unger",
    },
  ],
};
