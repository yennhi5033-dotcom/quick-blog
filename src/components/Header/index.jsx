import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Header = ({ isDarkMode, toggleDarkMode }) => {
  const [openMenu, setOpenMenu] = React.useState(false);
const token = localStorage.getItem("token");
// tao state cho create blog
const [createBlog, setCreateBlog] = React.useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const iconDark = (
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
      className="lucide lucide-moon h-5 w-5"
      aria-hidden="true"
    >
      <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"></path>
    </svg>
  );
  const iconLight = (
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
      className="lucide lucide-sun h-5 w-5"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4"></circle>
      <path d="M12 2v2"></path>
      <path d="M12 20v2"></path>
      <path d="m4.93 4.93 1.41 1.41"></path>
      <path d="m17.66 17.66 1.41 1.41"></path>
      <path d="M2 12h2"></path>
      <path d="M20 12h2"></path>
      <path d="m6.34 17.66-1.41 1.41"></path>
      <path d="m19.07 4.93-1.41 1.41"></path>
    </svg>
  );
  const iconMyPosts = (
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
      className="lucide lucide-clipboard-list h-3.5 w-3.5 shrink-0 text-slate-500 dark:text-slate-400"
      aria-hidden="true"
    >
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="M12 11h4" />
      <path d="M12 16h4" />
      <path d="M8 11h.01" />
      <path d="M8 16h.01" />
    </svg>
  );
  const iconLogout = (
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
      className="lucide lucide-log-out h-3.5 w-3.5 shrink-0 text-slate-500 dark:text-slate-400"
      aria-hidden="true"
    >
      <path d="m16 17 5-5-5-5"></path>
      <path d="M21 12H9"></path>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
    </svg>
  );
  return (
    <div className="sticky top-0 z-30 border-b border-transparent bg-white/90 backdrop-blur dark:bg-slate-950/90">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-3 sm:h-24 sm:px-6">
        <Link
          className="flex items-center"
          aria-label="QuickBlog home"
          to="/"
          data-discover="true"
        >
          <img
            alt="QuickBlog"
            className="h-10 w-auto sm:h-12"
            src="data:image/png;base64,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"
          />
        </Link>
        <div className="flex items-center gap-2 sm:gap-5">
          <Link
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:pointer-events-none disabled:opacity-60 bg-indigo-600 text-white shadow-sm hover:bg-indigo-700 h-8 rounded-md px-3 text-xs font-bold sm:h-9 sm:text-sm"
            to="/create"
            data-discover="true"
            onClick={() => setCreateBlog(true)}
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
              className="lucide lucide-plus h-4 w-4"
              aria-hidden="true"
            >
              <path d="M5 12h14"></path>
              <path d="M12 5v14"></path>
            </svg>
            Create Blog
          </Link>
          <button
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:pointer-events-none disabled:opacity-60 dark:hover:bg-slate-800 h-9 w-9 text-slate-950 hover:bg-transparent dark:text-slate-50 sm:h-11 sm:w-11"
            aria-label="Toggle dark mode"
            onClick={toggleDarkMode}
          >
            {isDarkMode ? iconLight : iconDark}
          </button>
<DropdownMenu>
  <DropdownMenuTrigger >
    <button      
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:pointer-events-none disabled:opacity-60 border border-slate-200 bg-white text-slate-900 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-900 h-9 w-9 rounded-lg sm:h-11 sm:w-[3.25rem]"
            aria-label="Open user menu"
            type="button"
            id="radix-_r_i_"
            aria-haspopup="menu"
            aria-expanded="false"
            data-state="closed"
            onClick={() => setOpenMenu(!openMenu)}
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
              className="lucide lucide-user h-5 w-5"
              aria-hidden="true"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
   <div className="absolute right-0 mt-2 z-50 w-44 rounded-lg border border-slate-200 bg-white p-1.5 shadow-lg dark:border-slate-800 dark:bg-slate-900">

      <Link
        to="/myposts"
        className="flex h-9 items-center gap-3 rounded-md px-2.5 text-sm font-normal text-slate-950 transition hover:bg-slate-50 dark:text-slate-100 dark:hover:bg-slate-800"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3.5 w-3.5 shrink-0 text-slate-500 dark:text-slate-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
          <path d="M12 11h4" />
          <path d="M12 16h4" />
          <path d="M8 11h.01" />
          <path d="M8 16h.01" />
        </svg>

        My Post
      </Link>

   <button
        onClick={handleLogout}
        className="flex h-9 w-full items-center gap-3 rounded-md px-2.5 text-left text-sm font-normal text-slate-950 transition hover:bg-slate-50 dark:text-slate-100 dark:hover:bg-slate-800"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3.5 w-3.5 shrink-0 text-slate-500 dark:text-slate-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="m16 17 5-5-5-5" />
          <path d="M21 12H9" />
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        </svg>

        Logout
      </button>

    </div>
  </DropdownMenuContent>
</DropdownMenu>
        </div>
      </div>
      </div>
  );
};
