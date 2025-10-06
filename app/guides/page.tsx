import { getAllGuides } from "@/lib/actions/guide.actions";
import GuideCard from "@/components/GuideCard";
import { getSubjectColor } from "@/lib/utils";
import SearchInput from "@/components/SearchInput";
import SubjectFilter from "@/components/SubjectFilter";
import GuideCardSkeleton from "@/components/GuideCardSkeleton";

const GuideLibrary = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const filters = searchParams;

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
          <SearchInput />
          <SubjectFilter />
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
