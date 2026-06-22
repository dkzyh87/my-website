import ParticleCanvas from './ParticleCanvas';

interface HeroSectionProps {
  name?: string;
  title?: string;
  tagline?: string;
}

export default function HeroSection({
  name = '五花',
  title = '全栈开发工程师',
  tagline = '构建优雅的解决方案，解决复杂的技术问题。',
}: HeroSectionProps) {
  return (
    <section
      id="home"
      className="relative hero-min-height flex items-center justify-center overflow-hidden"
      style={{
        background:
          'linear-gradient(135deg, var(--hero-gradient-from), var(--hero-gradient-via), var(--hero-gradient-to))',
      }}
    >
      {/* 粒子背景层 */}
      <ParticleCanvas />

      {/* 内容层 */}
      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-4 tracking-tight break-words">
          {name}
        </h1>

        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-2 break-words">
          {title}
        </p>

        <p className="text-base sm:text-lg text-gray-500 dark:text-gray-500 mb-10 max-w-lg mx-auto leading-relaxed break-words">
          {tagline}
        </p>

        <a
          href="#projects"
          className="inline-block px-8 py-3 rounded-lg text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors font-medium text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
        >
          查看项目
        </a>
      </div>
    </section>
  );
}
