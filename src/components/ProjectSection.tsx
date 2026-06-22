interface Project {
  image: string;
  name: string;
  description: string;
  githubUrl: string;
}

const PROJECTS: Project[] = [
  {
    image: '/src/assets/project-1.svg',
    name: 'Vibe Coding Platform',
    description:
      'AI 驱动的交互式编码环境，支持自然语言描述生成前端界面，实时预览与迭代。',
    githubUrl: 'https://github.com/example/vibe-coding',
  },
  {
    image: '/src/assets/project-2.svg',
    name: 'Distributed Task Scheduler',
    description:
      '基于 Redis 的分布式任务调度系统，支持优先级队列、失败重试、执行日志追踪。',
    githubUrl: 'https://github.com/example/task-scheduler',
  },
  {
    image: '/src/assets/project-3.svg',
    name: 'Design System Kit',
    description:
      '企业级 React 组件库，包含 30+ 可访问组件，支持主题定制与 Tree Shaking。',
    githubUrl: 'https://github.com/example/design-system',
  },
  {
    image: '/src/assets/project-4.svg',
    name: 'Real-Time Data Pipeline',
    description:
      '流式数据管道，整合 Kafka + Flink + ClickHouse，日处理 10 亿级事件。',
    githubUrl: '',
  },
];

export default function ProjectSection() {
  return (
    <section id="projects" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-gray-100 mb-12">
          My Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project) => (
            <article
              key={project.name}
              className="group rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
            >
              {/* 项目截图 */}
              <div className="aspect-video overflow-hidden bg-gray-100 dark:bg-gray-700">
                <img
                  src={project.image}
                  alt={project.name}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* 卡片内容 */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {project.name}
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* GitHub 链接（空 URL 时隐藏） */}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 rounded"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    GitHub
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
