import { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { createPost } from "@/services/blogService";
export const CreateBlog = () => {
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);
  const [title, setTitle] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [imageName, setImageName] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const uploadImage = async (file) => {
    if (!cloudName || !uploadPreset) {
      throw new Error(
        "Missing Cloudinary config. Please set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET."
      );
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Upload image failed");
    }

    return response.json();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError("");
    setMessage("");
    setIsUploading(true);

    try {
      const data = await uploadImage(file);
      setImageUrl(data.secure_url);
      setImageName(file.name);
      setMessage("Upload image thành công.");
    } catch (uploadError) {
      setError(uploadError.message || "Không thể upload ảnh.");
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  };

  const handleAddTag = () => {
    const nextTag = tagInput.trim();
    if (!nextTag) return;

    setTags((currentTags) =>
      currentTags.includes(nextTag) ? currentTags : [...currentTags, nextTag]
    );
    setTagInput("");
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags((currentTags) =>
      currentTags.filter((tag) => tag !== tagToRemove)
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    const content = editorRef.current?.getContent?.() || "";

    if (!title.trim()) {
      setError("Vui lòng nhập tiêu đề bài viết.");
      return;
    }

    if (!content.trim()) {
      setError("Vui lòng nhập nội dung bài viết.");
      return;
    }

    if (!imageUrl) {
      setError("Vui lòng upload ảnh bài viết lên Cloudinary.");
      return;
    }

    setIsSubmitting(true);
    try {
      await createPost({
        title: title.trim(),
        content,
        image: imageUrl,
        tags,
      });

      setMessage("Tạo blog thành công.");
      setTitle("");
      setTagInput("");
      setTags([]);
      setImageUrl("");
      setImageName("");
      editorRef.current?.setContent?.("");
      // Redirect to home page after successful submission
      window.location.href = "/home";
    } catch (submitError) {
      setError(submitError.message || "Không thể tạo blog.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1">
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <h1 className="mb-10 flex items-center justify-center gap-4 text-4xl font-bold text-indigo-600 sm:text-6xl">
          Create Blog
        </h1>
        <form className="space-y-7" onSubmit={handleSubmit}>
          <label className="block">
            <span className="mb-3 block font-semibold">Blog Image</span>
            <div>
              <input
                ref={fileInputRef}
                accept="image/*"
                className="hidden"
                type="file"
                onChange={handleFileChange}
              />
              <button
                type="button"
                onClick={openFilePicker}
                disabled={isUploading || isSubmitting}
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
                {isUploading
                  ? "Uploading to Cloudinary..."
                  : imageName || "Click to upload image"}
              </button>
            </div>
            {imageUrl && (
              <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
                <img
                  src={imageUrl}
                  alt="Blog preview"
                  className="h-56 w-full object-cover"
                />
              </div>
            )}
          </label>
          <label className="block">
            <span className="mb-3 block font-semibold">Blog Title</span>
            <input
              name="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="h-11 w-full rounded-md border border-slate-200 bg-white px-4 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-indigo-950"
              placeholder="Enter blog title"
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
                value={tagInput}
                onChange={(event) => setTagInput(event.target.value)}
                className="h-11 w-full rounded-md border border-slate-200 bg-white px-4 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-indigo-950"
                placeholder="Enter blog tag"
              />
              <button
                onClick={handleAddTag}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:pointer-events-none disabled:opacity-60 bg-indigo-600 text-white shadow-sm hover:bg-indigo-700 h-10 px-4 shrink-0"
                type="button"
              >
                Add Tag
              </button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700 transition hover:bg-indigo-100 dark:border-indigo-900 dark:bg-indigo-950 dark:text-indigo-200"
                >
                  {tag}
                  <span aria-hidden="true">×</span>
                </button>
              ))}
            </div>
          </label>
          <div className="flex justify-center">
            <button
              disabled={isUploading || isSubmitting}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:pointer-events-none disabled:opacity-60 bg-indigo-600 text-white shadow-sm hover:bg-indigo-700 h-9 rounded-md px-4 text-sm"
            >
              {isSubmitting ? "Creating..." : "Create Blog"}
            </button>
          </div>
          {message && (
            <p className="text-center text-sm font-medium text-emerald-600">
              {message}
            </p>
          )}
          {error && (
            <p className="text-center text-sm font-medium text-red-600">
              {error}
            </p>
          )}
        </form>
      </section>
    </div>
  );
};
