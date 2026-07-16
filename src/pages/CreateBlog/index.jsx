import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import {createPost} from "@/services/blogService";
export const CreateBlog = () => {
  const editorRef = useRef(null);

  return (
    <div className="flex-1">
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <h1 className="mb-10 flex items-center justify-center gap-4 text-4xl font-bold text-indigo-600 sm:text-6xl">
          Create Blog
        </h1>
        <form className="space-y-7">
          <label className="block">
            <span className="mb-3 block font-semibold">Blog Image</span>
            <div>
              <input accept="image/*" className="hidden" type="file" />
              <button
                type="button"
                className="flex h-24 w-full items-center justify-center gap-3 rounded-lg border border-dashed border-slate-300 bg-white text-slate-600 transition hover:border-indigo-400 hover:text-indigo-600 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300"
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
                  className="lucide lucide-image-up h-5 w-5"
                  aria-hidden="true"
                >
                  <path d="M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21"></path>
                  <path d="M14 19.5l3-3 3 3"></path>
                  <path d="M17 22v-5.5"></path>
                  <circle cx="9" cy="9" r="2"></circle>
                </svg>
                Click to upload image
              </button>
            </div>
          </label>
          <label className="block">
            <span className="mb-3 block font-semibold">Blog Title</span>
            <input
              className="h-11 w-full rounded-md border border-slate-200 bg-white px-4 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-indigo-950"
              placeholder="Enter blog title"
              defaultValue=""
            />
          </label>
          <label className="block">
            <span className="mb-3 block font-semibold">Blog Content</span>
            <div className="overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700">
              <Editor
                apiKey="wr5m1baz84tzypsggblbrrn2wkih9dsl9nhowkgtp6xo6tjg" 
                onInit={(evt, editor) => (editorRef.current = editor)}
                initialValue=""
                init={{
                  height: 420,
                  menubar: true,
                  plugins: [
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "code",
                    "help",
                    "wordcount",
                  ],
                  toolbar:
                    "undo redo | blocks | " +
                    "bold italic forecolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | " +
                    "removeformat | help",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                }}
              />
            </div>
          </label>
          <label className="block">
            <span className="mb-3 block font-semibold">Blog Tag</span>
            <div className="flex gap-2">
              <input
                className="h-11 w-full rounded-md border border-slate-200 bg-white px-4 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-indigo-950"
                placeholder="Enter blog tag"
                defaultValue=""
              />
              <button
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:pointer-events-none disabled:opacity-60 bg-indigo-600 text-white shadow-sm hover:bg-indigo-700 h-10 px-4 shrink-0"
                type="button"
              >
                Add Tag
              </button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2"></div>
          </label>
          <div className="flex justify-center">
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:pointer-events-none disabled:opacity-60 bg-indigo-600 text-white shadow-sm hover:bg-indigo-700 h-9 rounded-md px-4 text-sm">
              Create Blog
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};