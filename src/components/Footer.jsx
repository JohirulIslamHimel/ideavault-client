export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-black py-16 px-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand Section */}
        <div className="sm:col-span-2 md:col-span-2">
          <h3 className="text-2xl font-black tracking-tight text-blue-600 dark:text-blue-500 mb-4">
            Idea<span className="text-black dark:text-white">Vault</span>
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-sm text-sm leading-relaxed">
            The global repository for builders, innovators, and future founders
            to collectively validate and build market-disrupting startups.
          </p>
        </div>

        {/* Platform Links */}
        <div>
          <h4 className="font-bold text-sm tracking-wider uppercase text-neutral-800 dark:text-neutral-200 mb-4">
            Platform
          </h4>
          <ul className="space-y-3 text-neutral-600 dark:text-neutral-400 font-medium text-sm">
            <li>
              <a
                href="/ideas"
                className="hover:text-blue-600 dark:hover:text-blue-500 transition-colors duration-200"
              >
                Explore All Ideas
              </a>
            </li>
            <li>
              <a
                href="/add-idea"
                className="hover:text-blue-600 dark:hover:text-blue-500 transition-colors duration-200"
              >
                Submit Concept
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-blue-600 dark:hover:text-blue-500 transition-colors duration-200"
              >
                Trending Algorithm
              </a>
            </li>
          </ul>
        </div>

        {/* Connect & Contact Info */}
        <div>
          <h4 className="font-bold text-sm tracking-wider uppercase text-neutral-800 dark:text-neutral-200 mb-4">
            Connect
          </h4>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4">
            Questions?{" "}
            <a
              href="mailto:support@ideavault.com"
              className="text-blue-600 dark:text-blue-500 hover:underline"
            >
              support@ideavault.com
            </a>
          </p>

          {/* Social Links */}
          <div className="flex gap-5 items-center">
            <a
              href="#"
              className="text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white text-lg font-bold transition-colors duration-200"
              aria-label="X (formerly Twitter)"
            >
              𝕏
            </a>
            <a
              href="#"
              className="text-neutral-500 dark:text-neutral-400 hover:text-blue-700 dark:hover:text-blue-500 text-sm font-semibold transition-colors duration-200"
            >
              LinkedIn
            </a>
            <a
              href="#"
              className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white text-sm font-semibold transition-colors duration-200"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>

      {/*Copyright Section */}
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-900 text-center text-neutral-500 dark:text-neutral-500 text-xs font-medium">
        © {new Date().getFullYear()} IdeaVault Platform. Formulated to drive
        innovation. All rights reserved.
      </div>
    </footer>
  );
}
