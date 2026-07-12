import react from "react";
export const Footer = () => {
  return (
    <footer
      className="mt-0 py-20"
      style={{ backgroundColor: "oklab(0.508375 0.0304459 -0.22989 / 0.05)" }}
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 md:grid-cols-[1.9fr_1fr_1fr_1fr]">
        <div>
          <img
            alt="QuickBlog"
            className="mb-6 h-12"
            src="data:image/png;base64,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"
          />
          <p className="max-w-md text-base leading-7 text-slate-950 dark:text-slate-300">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum unde
            quaerat eveniet cumque accusamus atque qui error quo enim fugiat?
          </p>
        </div>
        <div>
          <h2 className="mb-4 font-bold">Quick Links</h2>
          <ul className="space-y-3 text-sm">
            <li>
              <a
                className="text-slate-600 hover:text-indigo-600 dark:text-slate-300"
                href="/"
                data-discover="true"
              >
                Home
              </a>
            </li>
            <li>
              <a
                className="text-slate-600 hover:text-indigo-600 dark:text-slate-300"
                href="/"
                data-discover="true"
              >
                Best Sellers
              </a>
            </li>
            <li>
              <a
                className="text-slate-600 hover:text-indigo-600 dark:text-slate-300"
                href="/"
                data-discover="true"
              >
                Offers &amp; Deals
              </a>
            </li>
            <li>
              <a
                className="text-slate-600 hover:text-indigo-600 dark:text-slate-300"
                href="/"
                data-discover="true"
              >
                Contact Us
              </a>
            </li>
            <li>
              <a
                className="text-slate-600 hover:text-indigo-600 dark:text-slate-300"
                href="/"
                data-discover="true"
              >
                FAQs
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="mb-4 font-bold">Need Help?</h2>
          <ul className="space-y-3 text-sm">
            <li>
              <a
                className="text-slate-600 hover:text-indigo-600 dark:text-slate-300"
                href="/"
                data-discover="true"
              >
                Delivery Information
              </a>
            </li>
            <li>
              <a
                className="text-slate-600 hover:text-indigo-600 dark:text-slate-300"
                href="/"
                data-discover="true"
              >
                Return &amp; Refund Policy
              </a>
            </li>
            <li>
              <a
                className="text-slate-600 hover:text-indigo-600 dark:text-slate-300"
                href="/"
                data-discover="true"
              >
                Payment Methods
              </a>
            </li>
            <li>
              <a
                className="text-slate-600 hover:text-indigo-600 dark:text-slate-300"
                href="/"
                data-discover="true"
              >
                Track your Order
              </a>
            </li>
            <li>
              <a
                className="text-slate-600 hover:text-indigo-600 dark:text-slate-300"
                href="/"
                data-discover="true"
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="mb-4 font-bold">Follow Us</h2>
          <ul className="space-y-3 text-sm">
            <li>
              <a
                className="text-slate-600 hover:text-indigo-600 dark:text-slate-300"
                href="/"
                data-discover="true"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                className="text-slate-600 hover:text-indigo-600 dark:text-slate-300"
                href="/"
                data-discover="true"
              >
                Twitter
              </a>
            </li>
            <li>
              <a
                className="text-slate-600 hover:text-indigo-600 dark:text-slate-300"
                href="/"
                data-discover="true"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                className="text-slate-600 hover:text-indigo-600 dark:text-slate-300"
                href="/"
                data-discover="true"
              >
                YouTube
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
