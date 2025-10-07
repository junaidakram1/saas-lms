export const dynamic = "force-dynamic";
import { getAllGuides } from "@/lib/actions/guide.actions";
import GuideCard from "@/components/GuideCard";
import { getSubjectColor } from "@/lib/utils";
import SearchInput from "@/components/SearchInput";
import SubjectFilter from "@/components/SubjectFilter";
import GuideCardSkeleton from "@/components/GuideCardSkeleton";
import React, { Suspense } from "react";

const GuideLibrary = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  // Await searchParams
  const filters = await searchParams;

  const subject = filters.subject ? String(filters.subject) : "";
  const topic = filters.topic ? String(filters.topic) : "";

  const guides = await getAllGuides({ subject, topic, page: 1, limit: 10 });

  if (!guides || guides.length === 0) {
    return <GuideCardSkeleton />;
  }

  return (
    <main>
      <section className="flex justify-between gap-4 max-sm:flex-col">
        <h1 className="underliner after:w-[300px] m-auto sm:m-0">
          Guide Learning Hub
        </h1>
        <div className="flex gap-4">
          {/* Wrap client components in Suspense */}
          <Suspense fallback={<div>Loading Search...</div>}>
            <SearchInput />
          </Suspense>
          <Suspense fallback={<div>Loading Filter...</div>}>
            <SubjectFilter />
          </Suspense>
        </div>
      </section>
      <section className="guide-grid mt-15 mb-15">
        {guides.map((guide) => (
          <GuideCard
            key={guide.id}
            {...guide}
            color={getSubjectColor(guide.subject)}
          />
        ))}
      </section>
    </main>
  );
};

export default GuideLibrary;
