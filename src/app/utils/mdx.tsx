import { CourseMetadata, LessonMetadata } from "./course";
import { notFound } from "next/navigation";

import { courses } from "@/app/content/courses/courses";
import { challenges } from "@/app/content/challenges/challenges";
import { ChallengeMetadata } from "./challenges";

import { AnchorDiscriminatorCalculator } from "@/app/components/AnchorDiscriminatorCalculator/AnchorDiscriminatorCalculator";
import ArticleSection from "@/app/components/ArticleSection/ArticleSection";
import Codeblock from "@/app/components/Codeblock/Codeblock";
import Icon from "@/app/components/Icon/Icon";
import IDE from "@/app/components/TSChallengeEnv/IDE";
import { Requirement } from "@/app/components/Challenges/Requirement";
import { RequirementList } from "@/app/components/Challenges/RequirementList";

import { SafeMdxRenderer } from 'safe-mdx'
import { mdxParse } from 'safe-mdx/parse'

export async function getCourse(courseSlug: string): Promise<CourseMetadata> {
  const course = courses.find((course) => course.slug === courseSlug);

  if (!course) {
    notFound();
  }

  return {
    ...structuredClone(course),
    lessons: course.lessons.map((lesson, index) => ({
      ...structuredClone(lesson),
      lessonNumber: index + 1,
    })),
  };
}

export async function getAllCourses(): Promise<CourseMetadata[]> {
  return structuredClone(courses);
}

export async function getCourseLessons(
  courseSlug: string,
): Promise<LessonMetadata[]> {
  const course = await getCourse(courseSlug);

  if (!course) {
    notFound();
  }

  return structuredClone(course.lessons);
}

export async function getChallenge(
  challengeSlug: string | undefined | null,
): Promise<ChallengeMetadata | undefined> {
  const challenge = challenges.find(
    (challenge) => challenge.slug === challengeSlug,
  );

  return structuredClone(challenge);
}

export async function getAllChallenges(): Promise<ChallengeMetadata[]> {
  return structuredClone(challenges);
}

export function renderSafeMdx(code: string) {
  const ast = mdxParse(code);
  return <SafeMdxRenderer markdown={code} mdast={ast} components={{
    ArticleSection,
    IDE,
    RequirementList,
    Requirement,
    AnchorDiscriminatorCalculator,
    pre: Codeblock,
    blockquote: ({ children }: { children: React.ReactNode }) => (
      <blockquote className="bg-background-primary rounded-xl flex items-start gap-x-2 py-4 px-6">
        <Icon
          name="Warning"
          className="text-brand-secondary flex-shrink-0 top-1.5 relative"
          size={18}
        />
        <div className="overflow-x-auto custom-scrollbar min-w-0">{children}</div>
      </blockquote>
    ),
  }} />;
};