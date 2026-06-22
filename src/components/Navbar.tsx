interface NavbarProps {
  brandName?: string;
}

const NAV_LINKS = [
  { label: '首页', href: '#home' },
  { label: '项目', href: '#projects' },
  { label: '联系我', href: '#contact' },
] as const;

export default function Navbar({ brandName = '五花' }: NavbarProps) {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 nav-glass">
      <div className="max-w-6xl mx-auto px-4 md:px-6 max-[360px]:px-3 h-14 md:h-16 flex items-center justify-between">
        {/* 品牌名 */}
        <a
          href="#home"
          className="text-sm md:text-base max-[360px]:text-xs font-semibold text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 rounded truncate max-w-40 sm:max-w-48"
        >
          {brandName}
        </a>

        {/* 导航链接 */}
        <div className="flex items-center gap-4 md:gap-8 max-[360px]:gap-2">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm md:text-base max-[360px]:text-xs text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 rounded"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
