import { getAllGuides } from "@/lib/actions/guide.actions";
import GuideCard from "@/components/GuideCard";
import { getSubjectColor } from "@/lib/utils";

const GuideLibrary = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const filters = searchParams;

  const subject = filters.subject ? String(filters.subject) : "";
  const topic = filters.topic ? String(filters.topic) : "";

  const guides = await getAllGuides({ subject, topic, page: 1, limit: 10 });

  return (
    <main>
      <section className="flex justify-between gap-4 max-sm:flex-col">
        <h1>Guide Learning Hub</h1>
        <div className="flex gap-4">
          <h3>Filters</h3>
        </div>
      </section>
      <section className="companions-grid">
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
