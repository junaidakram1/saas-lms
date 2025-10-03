import CTA from "@/components/CTA";
import GuideCard from "@/components/GuideCard";
import GuideList from "@/components/GuideList";
import { recentSessions } from "@/constants";
import { getAllGuides, getRecentSessions } from "@/lib/actions/guide.actions";
import { getSubjectColor } from "@/lib/utils";

const Page = async () => {
  const guides = await getAllGuides({ limit: 3 });
  const recentSessionsGuides = await getRecentSessions(10);

  return (
    <main>
      <h1>Dashboard</h1>
      <section className="home-section">
        {guides.map((guide) => (
          <GuideCard
            key={guide.id}
            {...guide}
            color={getSubjectColor(guide.subject)}
          />
        ))}

        <GuideCard
          id="789"
          name="Mansion Designer"
          topic="Industrial Design"
          subject="Design"
          duration={45}
          color="#7cff6e"
        />
        <GuideCard
          id="789"
          name="Eye for Eye"
          topic="Optometry"
          subject="science"
          duration={40}
          color="#caf456"
        />
      </section>
      <section className="flex flex-col sm:flex-row gap-10">
        <GuideList
          title="Recently Completed Guides"
          guides={recentSessionsGuides}
          classNames="w-2/3 max-lg:w-full mb-10"
        />
        <CTA />
      </section>
    </main>
  );
};

export default Page;
