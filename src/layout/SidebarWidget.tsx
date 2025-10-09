import { Instagram, Twitter, Linkedin, Youtube } from "lucide-react";

export default function SidebarWidget() {
  return (
    <>
    <div
      className={`
        mx-auto mb-10 w-full max-w-60 rounded-2xl bg-blue-50 px-4 py-5 text-center dark:bg-blue-900/[0.03] shadow-2xl`}
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
        className="flex items-center justify-center p-3 font-medium text-white rounded-lg bg-[#131626e4] text-theme-sm hover:bg-neutral-900 dark:bg-gray-200"
      >
        Learn More
      </a>
    </div>
        <div className="flex gap-4">
      <a href="https://www.instagram.com/acentrium/" target="_blank" rel="nofollow noopener" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
        <Instagram size={18}/>
      </a>
      <a href="https://twitter.com/acentrium" target="_blank" rel="nofollow noopener" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
        <Twitter size={18}/>
      </a>
      <a href="https://www.linkedin.com/company/acentrium" target="_blank" rel="nofollow noopener" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
        <Linkedin size={18}/>
      </a>
      <a href="https://www.youtube.com/@acentrium" target="_blank" rel="nofollow noopener" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
        <Youtube size={18}/>
      </a>
    </div>
    </>
  );
}
