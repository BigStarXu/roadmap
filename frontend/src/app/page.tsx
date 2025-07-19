import * as React from "react";
import type { FeatureItem } from "@/types/feature";

const roleRoadmaps: FeatureItem[] = [
  { text: "前端开发路线图", url: "/roadmap/frontend", isNew: true },
  { text: "后端开发路线图", url: "/roadmap/backend" },
  { text: "DevOps 路线图", url: "/roadmap/devops" },
];
const skillRoadmaps: FeatureItem[] = [
  { text: "JavaScript", url: "/roadmap/javascript" },
  { text: "TypeScript", url: "/roadmap/typescript" },
  { text: "React", url: "/roadmap/react" },
];
const projectGroups: FeatureItem[] = [
  { text: "Frontend", url: "/frontend/projects" },
  { text: "Backend", url: "/backend/projects" },
  { text: "DevOps", url: "/devops/projects" },
];
const bestPractices: FeatureItem[] = [
  { text: "API Security", url: "/best-practices/api-security" },
  { text: "Frontend Performance", url: "/best-practices/frontend-performance" },
];
const questions: FeatureItem[] = [
  { text: "JavaScript Questions", url: "/questions/javascript" },
  { text: "React Questions", url: "/questions/react" },
];

function FeatureSection({
  heading,
  items,
}: {
  heading: string;
  items: FeatureItem[];
}) {
  return (
    <section className="w-full max-w-5xl mx-auto mb-10">
      <h2 className="text-xl font-bold text-gray-800 mb-4 pl-2">{heading}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <a
            key={item.text}
            href={item.url}
            className="group bg-white rounded-xl shadow hover:shadow-lg transition p-5 flex flex-col items-start border border-gray-100 hover:border-blue-300"
            aria-label={item.text}
            title={item.text}
          >
            <div className="text-base font-semibold text-gray-800 group-hover:text-blue-700 mb-1 flex items-center">
              {item.icon && <span className="mr-2">{item.icon}</span>}
              {item.text}
              {item.isNew && (
                <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-600 rounded-full">
                  NEW
                </span>
              )}
              {item.isUpcoming && (
                <span className="ml-2 px-2 py-0.5 text-xs bg-yellow-100 text-yellow-600 rounded-full">
                  UPCOMING
                </span>
              )}
            </div>
            {item.desc && (
              <div className="text-gray-500 text-xs">{item.desc}</div>
            )}
          </a>
        ))}
      </div>
    </section>
  );
}

function FeatureAnnouncement() {
  // 占位符，实际可替换为动态内容
  return (
    <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold rounded px-2 py-0.5">
      ✨ 新功能上线！
    </span>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-black pb-16">
      {/* Hero Section 详细还原 */}
      <section className="w-full flex flex-col items-center justify-center py-16 px-4 bg-white">
        <div className="rounded-2xl px-8 py-10 max-w-2xl w-full flex flex-col items-center relative">
          {/* 公告、主标题、副标题等内容 */}
          <p className="-mt-4 mb-7 sm:-mt-10 sm:mb-4 w-full flex justify-center">
            <FeatureAnnouncement />
          </p>
          <h1 className="mb-2 text-black text-2xl font-bold sm:mb-4 sm:text-5xl sm:leading-tight text-center">
            Developer Roadmaps
          </h1>
          {/* 大屏副标题 */}
          <p className="hidden px-4 text-lg text-gray-400 sm:block text-center">
            <span className="font-medium text-gray-400">roadmap.sh</span> is a
            community effort to create roadmaps, guides and other educational
            content to help guide developers in picking up a path and guide
            their learnings.
          </p>
          {/* 小屏副标题 */}
          <p className="text-md block px-0 text-gray-400 sm:hidden text-center">
            Community created roadmaps, guides and articles to help developers
            grow in their career.
          </p>
        </div>
      </section>

      {/* Feature Sections */}
      <div className="mt-10">
        <FeatureSection heading="Role-based Roadmaps" items={roleRoadmaps} />
        <FeatureSection heading="Skill-based Roadmaps" items={skillRoadmaps} />
        <FeatureSection heading="Project Ideas" items={projectGroups} />
        <FeatureSection heading="Best Practices" items={bestPractices} />
        <FeatureSection heading="Questions" items={questions} />
      </div>

      {/* 可选：引导、视频等区块，可后续补充 */}
    </main>
  );
}
