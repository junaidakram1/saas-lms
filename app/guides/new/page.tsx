import GuideForm from "@/components/GuideForm";

const NewGuide = () => {
  return (
    <main className="min-lg:w-1/3 min-md:w-2/3 items-center justify-center py-5">
      <article className="w-full gap-4 flex flex-col">
        <h1 className="text-center">Guide Creator</h1>
        <h2 className="text-center font-semibold">Build a New Guide</h2>
        <GuideForm />
      </article>
    </main>
  );
};

export default NewGuide;
