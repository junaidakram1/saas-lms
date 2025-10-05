import Image from "next/image";
import Link from "next/link";

interface GuideCardProps {
  id: string;
  name: string;
  topic: string;
  subject: string;
  duration: number;
  color: string;
}

const GuideCard = ({
  id,
  name,
  topic,
  subject,
  duration,
  color,
}: GuideCardProps) => {
  return (
    <article className="guide-card" style={{ backgroundColor: color }}>
      <div className="flex justify-between items-center">
        <div className="subject-badge">{subject}</div>
      </div>

      <h2 className="text-2xl font-bold">{name}</h2>
      <p className="text-sm">{topic}</p>
      <div className="flex items-center gap-2">
        <Image
          src="/icons/clock.svg"
          alt="duration"
          width={13.5}
          height={13.5}
        />
        <p className="text-sm">{duration} minutes</p>
      </div>

      <Link href={`/guides/${id}`} className="w-full">
        <button className="btn-secondary w-full justify-center">
          Let's Start
        </button>
      </Link>
    </article>
  );
};

export default GuideCard;
