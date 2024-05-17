import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { getServiceWorker } from "~/utils/cloudflare-workers";
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

export const useBlogPost = routeLoader$(async ({ params, platform, env }) => {
  const { slug } = params;
  let blogPost: BlogPost | undefined = undefined;
  const blogService = getServiceWorker("BLOG")(platform);
  if (blogService) {
    blogPost = (await blogService
      .fetch(`/api/posts/${slug}`)
      .then((res) => res.json())
      .catch((err) => console.log(err))) as BlogPost | undefined;
  } else {
    blogPost = (await fetch(`${env.get("BLOG_SERVICE_API_URL")}/posts/${slug}`)
      .then((res) => res.json())
      .catch((err) => console.error(err))) as BlogPost | undefined;
  }
  console.log("blogPost", blogPost);
  const parsedMarkdown = await parseMarkdown(blogPost?.content || "# No content");
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
