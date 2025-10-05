"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./Break.module.scss";
import { TypeAnimation } from "react-type-animation";
import { useState } from "react";

const Break = () => {
  const [typingStatus, setTypingStatus] = useState("human1");

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
        <h1>JD AI</h1>
        <h2>Supercharge Your Creativity & Productivity</h2>
        <h3>
          Meet JuniDepp (JD) AI, your intelligent chatbot that helps you
          generate ideas, solve problems, and boost productivity — all with
          effortless conversations.
        </h3>
        <Link
          href="/"
          className={`${styles.btn} ${styles["btn-down"]} ${styles["btn-down--blue"]}`}
        >
          Get Started!
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
                "Human: We produce food for Mice",
                2000,
                () => setTypingStatus("bot"),
                "Bot: We produce food for Hamsters",
                2000,
                () => setTypingStatus("human2"),
                "Human2: We produce food for Capybaras",
                2000,
                () => setTypingStatus("bot"),
                "Bot: We produce food for Chinchillas",
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

      <div className={styles.terms}>
        <div className={styles.links}>
          <Link href="/">Terms of Service</Link>
          <span>|</span>
          <Link href="/">Privacy Policy</Link>
        </div>
      </div>
    </div>
  );
};

export default Break;
