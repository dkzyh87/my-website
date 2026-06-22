interface AboutSectionProps {
  photo?: string;
  bio1?: string;
  bio2?: string;
  bio3?: string;
}

export default function AboutSection({
  photo = '/src/assets/about-photo.svg',
  bio1 = '我是一名全栈开发工程师，热衷于构建设计与技术交汇的产品。从概念到部署，我享受将复杂的想法转化为优雅、高性能的 Web 体验。',
  bio2 = '我的技术栈涵盖 TypeScript、React、Node.js 和云原生架构。我相信优秀的软件始于理解用户——我写的每一行代码都是为了满足真实的需求。',
  bio3 = '不写代码的时候，我会在"欧韵音乐"的品牌下探索音乐创作，尝试 AI 辅助的创意工具，或者研究最新的开发者工具链。',
}: AboutSectionProps) {
  return (
    <section id="about" className="py-16 md:py-24 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-gray-100 mb-12">
          关于我
        </h2>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
          {/* 左侧：个人照片 */}
          <div className="shrink-0">
            <img
              src={photo}
              alt="Portrait"
              loading="lazy"
              className="w-48 h-48 md:w-64 md:h-64 rounded-2xl object-cover shadow-lg"
            />
          </div>

          {/* 右侧：简介 + 品牌标签 */}
          <div className="flex-1">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {bio1}
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {bio2}
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              {bio3}
            </p>

            {/* 品牌标签 */}
            <span className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium">
              欧韵音乐
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
