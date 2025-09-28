import Image from "next/image";
import Link from "next/link";

const Cta = () => {
  return (
    <section className="cta-section">
      <div className="cta-badge">Start learning now!</div>
      <h2 className="text-3xl font-bold">
        Create and Customize Learning Guide
      </h2>
      <p>
        Pick your subject, voice, and character, and start learning in
        conversations that flow like real life.
      </p>
      <Image src="images/cta.svg" alt="cta" width={362} height={232} />
      <button className="btn-primary p-5 sm:px-4 sm:py-2">
        <Image src="/icons/plus.svg" alt="plus" width={12} height={12} />
        <Link href="/guides/new">
          <p>Create a New Guide</p>
        </Link>
      </button>
    </section>
  );
};
export default Cta;
