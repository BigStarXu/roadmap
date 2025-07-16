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

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-black pb-16">
      {/* Hero Section */}
      <section className="w-full flex flex-col items-center justify-center py-16 px-4 bg-gradient-to-b from-slate-900 to-black">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 text-center tracking-tight drop-shadow">
          Developer Roadmaps
        </h1>
        <p className="text-lg text-slate-200 mb-8 text-center max-w-2xl">
          Community driven roadmaps, articles and guides for developers to grow
          in their career.
        </p>
        <a
          href="#role-roadmaps"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full px-8 py-3 text-lg shadow transition"
        >
          浏览路线图
        </a>
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
