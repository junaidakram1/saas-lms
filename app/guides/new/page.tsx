import GuideForm from "@/components/GuideForm";
import { newGuidePermissions } from "@/lib/actions/guide.actions";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const NewGuide = async () => {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const canCreateGuide = await newGuidePermissions();
  return (
    <main className="min-lg:w-1/3 min-md:w-2/3 items-center justify-center py-5">
      {canCreateGuide ? (
        <article className="w-full gap-4 flex flex-col">
          <h1 className="text-center">Guide Creator</h1>
          <h2 className="text-center font-semibold">Build a New Guide</h2>
          <GuideForm />
        </article>
      ) : (
        <article className="guide-limit mb-25">
          <Image
            src="/images/limit.svg"
            alt="Guide limit reached"
            width={360}
            height={230}
          />
          <div className="cta-badge">Premium Access</div>
          <h1>You’ve Reached Your Limit</h1>
          <p>
            You’ve created the maximum number of guides allowed on your plan.
            Upgrade now to unlock more slots and advanced features.
          </p>
          <Link
            href="/subscription"
            className="btn-primary w-full justify-center"
          >
            Upgrade Now
          </Link>
        </article>
      )}
    </main>
  );
};

export default NewGuide;
