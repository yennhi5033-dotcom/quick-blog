import React from "react";
import { getPostById } from "@/services/postServices";
import { useParams } from "react-router-dom";
export const BlogDetails = () => {
  const [post, setPost] = React.useState(null);
  // get id from url
  const { id } = useParams();

  React.useEffect(() => {
    const fetchPost = async () => {
      const data = await getPostById(id);
      setPost(data);
    };
    fetchPost();
  }, []);

  if (!post) return <div>Loading...</div>;

  return (
    <div>
      <article className="mx-auto max-w-3xl px-5 pb-12 pt-2 sm:px-6 sm:pt-6">
        <div className="mb-4 text-center text-sm font-semibold text-indigo-600 sm:text-base">
         Published on <time>{new Date(post.updatedAt).toLocaleDateString()}</time>
        </div>
        <h1 className="mx-auto mb-4 max-w-2xl text-center text-2xl font-semibold leading-snug tracking-normal text-black dark:text-white sm:text-4xl">
          {post.title}
        </h1>
        <div className="mb-10 flex flex-wrap justify-center gap-2 sm:mb-12">
          <span className="inline-flex items-center rounded-full text-xs font-semibold dark:text-indigo-200 border border-indigo-200 bg-white px-4 py-1 text-indigo-600 dark:border-indigo-800 dark:bg-slate-950">
            {post.tags.join(", ")}
          </span>
        </div>
        <img
          alt="eyes"
          className="mx-auto mb-9 max-h-[26rem] max-w-full rounded-[1.25rem] object-contain sm:mb-10"
          src={post.image}
        />
        <div className="prose-content mx-auto max-w-2xl text-left text-base leading-7 text-black dark:text-slate-100">
          <p>{post.content}</p>
        </div>
      </article>
     
    </div>
  );
};
