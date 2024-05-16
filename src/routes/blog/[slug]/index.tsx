import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { parseMarkdown } from "~/utils/markdown";

type Author = {
  name: string;
  email?: string;
  avatarUrl?: string;
};

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  content: string;
  author: Author;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  isPublished: boolean;
  commentsEnabled: boolean;
  coverImageUrl?: string;
  summary?: string;
  tags?: string[];
  readingTimeSeconds?: number;
};

const mainAuthor: Author = {
  name: "Peter Unger",
  email: "peps.unger@gmail.com",
  avatarUrl: "https://avatars.githubusercontent.com/u/4763039?v=4",
};

const exampleBlogPostContent = `
# Ofcouse this is a markdown content
I can write anything here
## Even a subheading
- I can have a list
- With multiple items
- And even links [like this](https://example.com)

I can even have code blocks:
\`\`\`tsx
const example = "Hello, World!";
console.log(example);
\`\`\`

And images:
![Example Image](https://placehold.co/800x400)

And more text...

## Another subheading
Also a divider:
---

And a blockquote:
> This is a blockquote
> It can have multiple lines
> And even nested blockquotes:
> > Like this
> > And this

Finally, a table:
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Row 1    | Row 1    | Row 1    |
| Row 2    | Row 2    | Row 2    |
| Row 3    | Row 3    | Row 3    |

And that's it!
`;

const exampleBlogPost: BlogPost = {
  id: "example-blog-post_1234",
  title: "Example Blog Post - be patient",
  slug: "example-blog-post",
  content: exampleBlogPostContent,
  author: mainAuthor,
  createdAt: new Date("2024-05-14T12:24:33.022Z"),
  publishedAt: new Date("2024-05-15T09:11:50.022Z"),
  updatedAt: new Date("2024-05-15T13:17:49.022Z"),
  isPublished: true,
  commentsEnabled: true,
  coverImageUrl: "https://placehold.co/800x400",
  summary: "This is a summary of the example blog post.",
  tags: ["example", "blog", "post"],
  readingTimeSeconds: 120,
};

export const useBlogPost = routeLoader$(async () => {
  // const { slug } = params;
  // const markdown = await fetchMarkdownContent(slug);
  const blogPost = exampleBlogPost;
  const parsedMarkdown = await parseMarkdown(blogPost.content);
  return {
    ...blogPost,
    parsedMarkdown,
  };
});

export default component$(() => {
  //const loc = useLocation();
  const blogPost = useBlogPost();

  // useVisibleTask$(() => {
  //   console.log(blogPost.value.parsedMarkdown);
  // });

  return <div dangerouslySetInnerHTML={blogPost.value.parsedMarkdown} />;
});

export const head: DocumentHead = ({ params }) => ({
  title: `${params.postId} - Peter's Blog`,
  meta: [
    {
      name: "description",
      content: "TODO: resolve post entity and get description",
    },
  ],
});
