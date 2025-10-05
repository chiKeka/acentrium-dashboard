export default function SidebarWidget() {
  return (
    <div
      className={`
        mx-auto mb-10 w-full max-w-60 rounded-2xl bg-blue-50 px-4 py-5 text-center dark:bg-blue-900/[0.03]`}
    >
      <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
        Building Africa's AI Future
      </h3>
      <p className="mb-4 text-gray-500 text-theme-sm dark:text-gray-400">
        Empowering African youth through AI education, research, and innovation across the continent.
      </p>
      <a
        href="https://acentrium.org"
        target="_blank"
        rel="nofollow noopener"
        className="flex items-center justify-center p-3 font-medium text-white rounded-lg bg-blue-600 text-theme-sm hover:bg-blue-700"
      >
        Learn More
      </a>
    </div>
  );
}
