import * as React from "react";
import type { FeatureItem } from "@/types/feature";
import { getUser } from "@/lib/auth";

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
  return (
    <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold rounded px-2 py-0.5">
      ✨ 新功能上线！
    </span>
  );
}

function UserWelcome() {
  const user = getUser();

  if (!user) {
    return null;
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
      <p className="text-blue-800">
        欢迎回来，<span className="font-semibold">{user.name}</span>
        ！继续您的学习之旅。
      </p>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-black pb-16">
      {/* Hero Section */}
      <section className="w-full flex flex-col items-center justify-center py-16 px-4 bg-white">
        <div className="rounded-2xl px-8 py-10 max-w-2xl w-full flex flex-col items-center relative">
          <p className="-mt-4 mb-7 sm:-mt-10 sm:mb-4 w-full flex justify-center">
            <FeatureAnnouncement />
          </p>
          <h1 className="mb-2 text-black text-2xl font-bold sm:mb-4 sm:text-5xl sm:leading-tight text-center">
            Developer Roadmaps
          </h1>
          <p className="hidden px-4 text-lg text-gray-400 sm:block text-center">
            <span className="font-medium text-gray-400">roadmap.sh</span>{" "}
            是一个社区项目，
            旨在创建路线图、指南和其他教育内容，帮助开发者选择学习路径并指导他们的学习。
          </p>
          <p className="text-md block px-0 text-gray-400 sm:hidden text-center">
            社区创建的学习路线图、指南和文章，帮助开发者在职业生涯中成长。
          </p>
        </div>
      </section>

      {/* User Welcome Section */}
      <div className="max-w-5xl mx-auto px-4">
        <UserWelcome />
      </div>

      {/* Feature Sections */}
      <div className="mt-10">
        <FeatureSection heading="基于角色的路线图" items={roleRoadmaps} />
        <FeatureSection heading="基于技能的路线图" items={skillRoadmaps} />
        <FeatureSection heading="项目创意" items={projectGroups} />
        <FeatureSection heading="最佳实践" items={bestPractices} />
        <FeatureSection heading="问答" items={questions} />
      </div>
    </main>
  );
}
