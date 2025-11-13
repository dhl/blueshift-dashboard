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
import { SafeMdxRenderer } from "safe-mdx";
import { mdxParse } from "safe-mdx/parse";
import { getSingletonHighlighter } from "@/lib/shiki/highlighter";
import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import { Fragment, jsxs, jsx } from "react/jsx-runtime";

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
  courseSlug: string
): Promise<LessonMetadata[]> {
  const course = await getCourse(courseSlug);

  if (!course) {
    notFound();
  }

  return structuredClone(course.lessons);
}

export async function getChallenge(
  challengeSlug: string | undefined | null
): Promise<ChallengeMetadata | undefined> {
  const challenge = challenges.find(
    (challenge) => challenge.slug === challengeSlug
  );

  return structuredClone(challenge);
}

export async function getAllChallenges(): Promise<ChallengeMetadata[]> {
  return structuredClone(challenges);
}

export async function renderSafeMdx(code: string) {
  const mdast = mdxParse(code);
  const highlighter = await getSingletonHighlighter();

  return (
    <SafeMdxRenderer
      markdown={code}
      mdast={mdast}
      components={{
        ArticleSection,
        IDE,
        RequirementList,
        Requirement,
        AnchorDiscriminatorCalculator,
        blockquote: ({ children }: { children: React.ReactNode }) => (
          <blockquote className="bg-background-primary rounded-xl flex items-start gap-x-2 py-4 px-6">
            <Icon
              name="Warning"
              className="text-brand-secondary flex-shrink-0 top-1.5 relative"
              size={18}
            />
            <div className="overflow-x k-auto custom-scrollbar min-w-0">
              {children}
            </div>
          </blockquote>
        ),
      }}
      renderNode={(node) => {
        if (node.type === "code") {
          const lang = node.lang || "text";

          // Skip syntax highlighting for bash and sh code blocks
          if (lang === "bash" || lang === "sh") {
            return;
          }

          const codeHtml = highlighter.codeToHast(node.value, {
            lang,
            theme: "blueshift",
          });

          return (
            <Codeblock data-language={lang}>
              {toJsxRuntime(codeHtml, { Fragment, jsxs, jsx })}
            </Codeblock>
          );
        }

        // fall back to default rendering for other nodes
        return;
      }}
    />
  );
}
