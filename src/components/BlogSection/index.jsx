import React from "react";
import { Link } from "react-router-dom";
export const BlogSection = ( {posts } ) => {
  return (
    <div className="mt-9 grid place-items-center gap-6 sm:mt-12 sm:grid-cols-2 sm:place-items-stretch lg:grid-cols-4">
        {posts.map((item) => (
          <div className="w-full max-w-xs sm:max-w-none">
        <div className="rounded-lg border border-slate-200 bg-white text-slate-950 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 group relative h-full overflow-visible transition hover:z-20 hover:-translate-y-1 hover:shadow-xl">
          <div className="relative aspect-[4/2.7] overflow-visible bg-slate-100 dark:bg-slate-800">
            <Link
              className="block h-full overflow-hidden rounded-t-lg"
              aria-label="Read eyes"
              to={`/posts/${item._id}`}
              data-discover="true"
            >
              <img
                alt="eyes"
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                src={item.image}
              />
            </Link>
            <div className="group/actions absolute right-2 top-2 z-30 h-[84px] w-10 transition duration-300 pointer-events-none translate-x-3 -translate-y-3 opacity-0 group-hover:pointer-events-auto group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-x-0 group-focus-within:translate-y-0 group-focus-within:opacity-100">
              <a
                href="https://lens.google.com/uploadbyurl?url=https%3A%2F%2Fres.cloudinary.com%2Fdjgduskbu%2Fimage%2Fupload%2Fv1780546956%2Fhxevidqagea4krse07jl.png"
                className="absolute right-0 top-0 z-20 grid h-10 w-10 place-items-center rounded-full border border-blue-100 bg-white text-blue-600 shadow-md shadow-slate-900/20 transition duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                aria-label="Search eyes image on Google"
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
                  className="lucide lucide-scan-search h-5 w-5 stroke-[2.2]"
                  aria-hidden="true"
                >
                  <path d="M3 7V5a2 2 0 0 1 2-2h2"></path>
                  <path d="M17 3h2a2 2 0 0 1 2 2v2"></path>
                  <path d="M21 17v2a2 2 0 0 1-2 2h-2"></path>
                  <path d="M7 21H5a2 2 0 0 1-2-2v-2"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="m16 16-1.9-1.9"></path>
                </svg>
              </a>
              <button
                type="button"
                className="absolute right-0 top-0 z-10 grid h-10 w-10 place-items-center rounded-full border border-white/60 bg-white/55 text-blue-500/70 opacity-0 shadow-sm shadow-slate-900/10 backdrop-blur-md transition duration-200 hover:bg-white/75 hover:text-blue-600/85 hover:opacity-95 group-hover/actions:translate-y-11 group-hover/actions:opacity-80 group-focus-within/actions:translate-y-11 group-focus-within/actions:opacity-80 "
                aria-label="Open actions for eyes"
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
                  className="lucide lucide-ellipsis h-6 w-6 stroke-[1.9]"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="1"></circle>
                  <circle cx="19" cy="12" r="1"></circle>
                  <circle cx="5" cy="12" r="1"></circle>
                </svg>
              </button>
            </div>
          </div>
          <div className="p-5">
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-200">
                {item.tags}
              </span>
            </div>
            <a href={`/posts/${item._id}`} data-discover="true">
              <h2 className="mb-3 line-clamp-2 text-lg font-bold text-slate-950 transition hover:text-indigo-600 dark:text-white dark:hover:text-indigo-300">
                {item.title}
              </h2>
            </a>
            <p className="line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
              <div dangerouslySetInnerHTML={{ __html: item.content }} />
            </p>
          </div>
        </div>
      </div>
        ))}
    </div>
  );
};
