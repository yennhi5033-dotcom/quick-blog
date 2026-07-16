import React from "react";
import { Link } from "react-router-dom";
import { getPosts } from "@/services/postServices";

export const MyPosts = () => {
  const [posts, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const getCurrentUserId = () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      return user?.id || user?._id || "";
    } catch {
      return "";
    }
  };

  const getPostOwnerId = (post) => {
    return (
      post?.user?.id ||
      post?.user?._id ||
      post?.userId ||
      post?.author?.id ||
      post?.author?._id ||
      post?.createdBy?.id ||
      post?.createdBy?._id ||
      ""
    );
  };

  const getCleanContent = (htmlContent) => {
    if (!htmlContent) return "";
    const plainText = htmlContent.replace(/<[^>]*>/g, "");
    return plainText.length > 100 ? plainText.slice(0, 125) + "..." : plainText;
  };

  React.useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await getPosts();
        const currentUserId = getCurrentUserId();
        const items = data?.items || data || [];
        const filteredPosts = currentUserId
          ? items.filter((post) => getPostOwnerId(post) === currentUserId)
          : [];

        setPosts(filteredPosts);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Khong the tai danh sach bai viet.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <main className="flex-1">
      <section className="mx-auto min-h-[calc(100vh-24rem)] max-w-7xl px-4 py-12 sm:px-6">
        <h1 className="mb-14 flex items-center justify-center gap-4 text-4xl font-bold text-indigo-600 sm:text-5xl">
          <span aria-hidden="true" className="text-5xl leading-none">
            ✍️
          </span>
          My Post
        </h1>
        <div className="min-h-[420px]">
          {loading && (
            <div className="py-10 text-center text-sm text-slate-500">
              Dang tai bai viet...
            </div>
          )}

          {error && (
            <div className="mb-6 rounded-md bg-red-50 p-3 text-center text-sm text-red-600">
              {error}
            </div>
          )}

          {!loading && !error && posts.length === 0 && (
            <div className="py-10 text-center text-sm text-slate-500">
              Ban chua co bai viet nao.
            </div>
          )}

          {!loading && posts.length > 0 && (
            <div className="w-full overflow-x-auto">
              <table className="w-full min-w-[680px] text-left text-sm">
                <thead>
                  <tr>
                    <th className="border-b border-slate-200 px-4 py-4 font-bold uppercase tracking-wide dark:border-slate-800 text-base text-slate-950 dark:text-slate-100">
                      Title
                    </th>
                    <th className="border-b border-slate-200 px-4 py-4 font-bold uppercase tracking-wide dark:border-slate-800 text-base text-slate-950 dark:text-slate-100">
                      Content
                    </th>
                    <th className="border-b border-slate-200 px-4 py-4 font-bold uppercase tracking-wide dark:border-slate-800 w-36 text-base text-slate-950 dark:text-slate-100">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((item) => (
                    <tr key={item.id || item._id}>
                      <td className="border-b border-slate-100 px-4 py-4 align-top dark:border-slate-800 font-semibold">
                        {item.title}
                      </td>
                      <td className="border-b border-slate-100 px-4 py-4 align-top dark:border-slate-800">
                        {getCleanContent(item.content)}{" "}
                      </td>
                      <td className="border-b border-slate-100 px-4 py-4 align-top dark:border-slate-800">
                        <div className="flex items-center gap-3">
                          <Link
                            to={`/posts/${item._id}`}
                            aria-label={`View ${item.title}`}
                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:pointer-events-none disabled:opacity-60 h-9 w-11 rounded-[10px] bg-blue-500 text-white shadow-none hover:bg-blue-600"
                            data-discover="true"
                          >
                            <svg
                              className="h-5 w-5"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <path d="M7 6v11"></path>
                              <path d="M17 6v11"></path>
                              <path d="M7 8h10"></path>
                              <path d="M7 13h10"></path>
                              <path d="M5 10.5 3.5 16.5a3 3 0 0 0 5.8 1.5l1.2-4.5"></path>
                              <path d="M19 10.5 20.5 16.5a3 3 0 0 1-5.8 1.5l-1.2-4.5"></path>
                              <path d="M9 6a2 2 0 0 1 4 0"></path>
                              <path d="M15 6a2 2 0 0 0-4 0"></path>
                            </svg>
                          </Link>
                          <button
                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:pointer-events-none disabled:opacity-60 h-9 w-11 rounded-[10px] bg-red-500 text-white shadow-none hover:bg-red-600"
                            aria-label="Delete ai v"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-trash2 lucide-trash-2 h-5 w-5 stroke-[2.5]"
                              aria-hidden="true"
                            >
                              <path d="M10 11v6"></path>
                              <path d="M14 11v6"></path>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                              <path d="M3 6h18"></path>
                              <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};
