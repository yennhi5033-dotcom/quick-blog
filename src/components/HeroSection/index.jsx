import React from "react";

export const HeroSection = () => {
  return (
    <div>
      <h1 className="mx-auto max-w-sm text-3xl font-bold leading-tight tracking-normal text-slate-700 dark:text-white sm:max-w-3xl sm:text-6xl">
        Your own <span className="text-indigo-600">blogging</span> platform.
      </h1>
      <p className="mx-auto mt-5 max-w-sm text-xs leading-5 text-slate-500 dark:text-slate-300 sm:max-w-3xl sm:text-base sm:leading-7">
        This is your space to think out loud, to share what matters, and to write without filters. Whether it's one word or a thousand, your story starts right here.
      </p>
    </div>
  );
};
