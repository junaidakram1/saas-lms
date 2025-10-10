import { getGuide } from "@/lib/actions/guide.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getSubjectColor } from "@/lib/utils";
import Image from "next/image";
import GuideComponent from "@/components/GuideComponent";

interface GuideSessionPageProps {
  params: Promise<{ id: string }>;
}

const GuideSession = async ({ params }: GuideSessionPageProps) => {
  const { id } = await params;
  const guide = await getGuide(id);
  const user = await currentUser();

  const { name, subject, title, topic, duration } = guide;

  if (!user) redirect("/sign-in");
  if (!name) redirect("/guides");

  return (
    <main>
      <article className="flex rounded-border justify-between p-6 max-md:flex-col">
        <div className="flex items-center gap-2">
          <div
            className="size-[72px] flex items-center justify-center rounded-lg max-md:hidden"
            style={{ backgroundColor: getSubjectColor(subject) }}
          >
            <Image
              src={`/icons/${subject}.svg`}
              alt={subject}
              width={35}
              height={35}
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
              <p className="font-bold text-2xl">{name}</p>
              <div className="subject-badge max-sm:hidden">{subject}</div>
            </div>
            <p className="text-lg">{topic}</p>
          </div>
        </div>
        <div className="items-start text-2xl max-md:hidden">
          {duration} minutes
        </div>
      </article>

      <div className="min-h-screen flex flex-col">
        <div className="flex-1 flex flex-col">
          <GuideComponent
            {...guide}
            guideId={id}
            userName={user.firstName!}
            userImage={user.imageUrl!}
            className="flex-1 flex flex-col"
          />
        </div>
      </div>
    </main>
  );
};

export default GuideSession;
