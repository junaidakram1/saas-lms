export const dynamic = "force-dynamic";
import CTA from "@/components/CTA";
import GuideCard from "@/components/GuideCard";
import GuideCardSkeleton from "@/components/GuideCardSkeleton";
import GuideList from "@/components/GuideList";
import { recentSessions } from "@/constants";
import { getAllGuides, getRecentSessions } from "@/lib/actions/guide.actions";
import { getSubjectColor } from "@/lib/utils";

const Page = async () => {
  const guides = await getAllGuides({ limit: 5 });
  const recentSessionsGuides = await getRecentSessions(10);
  if (!guides || guides.length === 0) {
    return <GuideCardSkeleton />;
  }
  return (
    <main>
      <div className="flex justify-center">
        <h1 className="underliner">Dashboard</h1>
      </div>
      <section className="home-section mt-10">
        {guides.map((guide) => (
          <GuideCard
            key={guide.id}
            {...guide}
            color={getSubjectColor(guide.subject)}
          />
        ))}
      </section>
      <section className="flex flex-col sm:flex-row gap-10 mt-30">
        <GuideList
          title="Recently Completed Guides"
          guides={recentSessionsGuides}
          classNames="w-2/3 max-lg:w-full mb-10 "
        />
        <CTA />
      </section>
    </main>
  );
};

export default Page;
