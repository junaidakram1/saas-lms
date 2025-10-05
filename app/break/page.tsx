"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./Break.module.scss";
import { TypeAnimation } from "react-type-animation";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import PageSkeleton from "@/components/PageSkeleton";

const Break = () => {
  const [typingStatus, setTypingStatus] = useState("human1");
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoaded && !user) {
      router.push("/sign-in");
    }
  }, [user, isLoaded, router]);

  if (!isLoaded || !user) return null;

  if (loading) return <PageSkeleton />;

  return (
    <div className={`${styles.homepage} ${styles.blackBg}`}>
      <img
        src="/orbital.png"
        alt=""
        className={styles.orbital}
        width={800}
        height={600}
      />

      <div className={styles.left}>
        <div className="">
          <h1 className="font-bold text-2xl">{user?.firstName || "there"}!</h1>
        </div>
        <h2>Recharge Your Mind & Body!</h2>
        <h3>
          Step away from your lessons and give yourself a moment to relax. Take
          a short pause, clear your thoughts, and refresh your energy, so you
          can return focused, creative, and ready to learn.
        </h3>
        <Link
          href="/"
          className={`${styles.btn} ${styles["btn-down"]} ${styles["btn-down--blue"]}`}
        >
          Back To Grind!
        </Link>
      </div>

      <div className={styles.right}>
        <div className={styles.imgContainer}>
          <div className={styles.bgContainer}>
            <div className={styles.bg}></div>
          </div>
          <Image
            src="/bot.png"
            alt=""
            className={styles.bot}
            width={300}
            height={300}
          />
          <div className={styles.chat}>
            <Image
              src={
                typingStatus === "human1"
                  ? "/human1.jpeg"
                  : typingStatus === "human2"
                  ? "/human2.jpeg"
                  : "/bot.png"
              }
              alt=""
              width={32}
              height={32}
            />
            <TypeAnimation
              sequence={[
                "Human: I think I need a break...",
                2000,
                () => setTypingStatus("bot"),
                "Bot: Agreed. Let’s grab some coffee ☕",
                2000,
                () => setTypingStatus("human2"),
                "Human: I think I need a break...",
                2000,
                () => setTypingStatus("bot"),
                "Bot: Agreed. Let’s grab some coffee ☕",
                2000,
                () => setTypingStatus("human1"),
              ]}
              wrapper="span"
              repeat={Infinity}
              cursor={true}
              omitDeletionAnimation={true}
            />
          </div>
        </div>
      </div>

      {/* <div className={styles.terms}>
        <div className={styles.links}>
          <Link href="/">Terms of Service</Link>
          <span>|</span>
          <Link href="/">Privacy Policy</Link>
        </div>
      </div> */}
    </div>
  );
};

export default Break;
