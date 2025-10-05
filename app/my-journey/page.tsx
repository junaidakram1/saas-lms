import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUserGuides, getUserSessions } from "@/lib/actions/guide.actions";
import Image from "next/image";
import GuideList from "@/components/GuideList";

const ProfilePage = async () => {
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  const guides = await getUserGuides(user.id);
  const sessionHistory = await getUserSessions(user.id);

  return (
    <main className="min-lg:w-3/4">
      <section className="flex justify-between gap-4 max-sm:flex-col items-center">
        <div className="flex gap-4 items-center">
          <Image
            src={user.imageUrl}
            alt={user.firstName!}
            width={110}
            height={110}
          />
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-2xl">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-sm text-muted-foreground">
              {user.emailAddresses[0].emailAddress}
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="border-[1.5px] border-[#3F2B96] rounded-lg p-3 gap-2 flex flex-col h-fit">
            <div className="flex gap-2 items-center">
              <Image
                src="/icons/check.svg"
                alt="checkmark"
                width={22}
                height={22}
              />
              <p className="text-2xl font-bold">{sessionHistory.length}</p>
            </div>
            <div>Lessons completed</div>
          </div>
          <div className="border-[1.5px] border-[#3F2B96] rounded-md p-3 gap-2 flex flex-col h-fit">
            <div className="flex gap-2 items-center">
              <Image src="/icons/cap.svg" alt="cap" width={22} height={22} />
              <p className="text-2xl font-bold">{guides.length}</p>
            </div>
            <div>Guides created</div>
          </div>
        </div>
      </section>
      <Accordion type="multiple">
        <AccordionItem
          value="recent"
          className="border-b-[3px] border-[#3F2B96]"
        >
          <AccordionTrigger className="text-2xl font-bold">
            Recent Sessions
          </AccordionTrigger>
          <AccordionContent>
            <GuideList title="Recent Sessions" guides={sessionHistory} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="guides"
          className="border-b-[2px] border-gray-800"
        >
          <AccordionTrigger className="text-2xl font-bold">
            My Guides {`(${guides.length})`}
          </AccordionTrigger>
          <AccordionContent>
            <GuideList title="My Guides" guides={guides} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </main>
  );
};
export default ProfilePage;
