"use client";

import { useEffect, useRef, useState } from "react";
import { cn, configureAssistant, getSubjectColor } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import Image from "next/image";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import soundwaves from "@/constants/soundwaves.json";
import {
  addToSessionHistory,
  canStartNewSession,
  getGuide,
  getCumulativeSessionTime,
} from "@/lib/actions/guide.actions";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

const GuideComponent = ({
  guideId,
  subject,
  topic,
  name,
  userName,
  userImage,
  style,
  voice,
  className,
}: GuideComponentProps) => {
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const [sessionEnded, setSessionEnded] = useState(false);
  const [duration, setDuration] = useState<number | null>(null);
  const [remainingTime, setRemainingTime] = useState<number | null>(null);
  const sessionStartTimeRef = useRef<Date | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const cumulativeCheckIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    const fetchGuide = async () => {
      const guide = await getGuide(guideId);
      if (guide?.duration) {
        setDuration(guide.duration);
      }
    };
    fetchGuide();
  }, [guideId]);

  useEffect(() => {
    if (callStatus === CallStatus.ACTIVE && duration) {
      if (timerRef.current) clearTimeout(timerRef.current);
      const durationMs = duration * 60 * 1000;
      timerRef.current = setTimeout(() => {
        handleDisconnect();
        setSessionEnded(true);
      }, durationMs);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [callStatus, duration]);

  useEffect(() => {
    if (callStatus === CallStatus.ACTIVE && duration) {
      setRemainingTime(duration * 60);
      const interval = setInterval(() => {
        setRemainingTime((prev) => (prev && prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(interval);
    }
    if (callStatus !== CallStatus.ACTIVE) {
      setRemainingTime(null);
    }
  }, [callStatus, duration]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60)
      .toString()
      .padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  useEffect(() => {
    const cumulativeLimitSeconds = 60 * 5;
    const checkCumulativeDuration = async () => {
      if (!sessionStartTimeRef.current) return;
      try {
        const cumulativeDuration = await getCumulativeSessionTime();
        const elapsedCurrentSession =
          (new Date().getTime() - sessionStartTimeRef.current.getTime()) / 1000;
        if (
          cumulativeDuration + elapsedCurrentSession >=
          cumulativeLimitSeconds
        ) {
          handleDisconnect();
          setSessionEnded(true);
        }
      } catch (error) {}
    };
    if (callStatus === CallStatus.ACTIVE) {
      cumulativeCheckIntervalRef.current = setInterval(
        checkCumulativeDuration,
        5000
      );
    } else {
      if (cumulativeCheckIntervalRef.current) {
        clearInterval(cumulativeCheckIntervalRef.current);
        cumulativeCheckIntervalRef.current = null;
      }
    }
    return () => {
      if (cumulativeCheckIntervalRef.current) {
        clearInterval(cumulativeCheckIntervalRef.current);
        cumulativeCheckIntervalRef.current = null;
      }
    };
  }, [callStatus]);

  useEffect(() => {
    if (lottieRef) {
      if (isSpeaking) {
        lottieRef.current?.play();
      } else {
        lottieRef.current?.stop();
      }
    }
  }, [isSpeaking, lottieRef]);

  useEffect(() => {
    const onCallStart = () => {
      setCallStatus(CallStatus.ACTIVE);
      sessionStartTimeRef.current = new Date();
    };
    const onCallEnd = async () => {
      setCallStatus(CallStatus.FINISHED);
      if (!sessionStartTimeRef.current) {
        return;
      }
      const endTime = new Date();
      const diffMs = endTime.getTime() - sessionStartTimeRef.current.getTime();
      const durationSeconds = Math.floor(diffMs / 1000);
      try {
        await addToSessionHistory({ guideId, durationSeconds });
      } catch (error) {}
      setSessionEnded(true);
    };
    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        setMessages((prev) => {
          if (prev.length > 0 && prev[0].role === message.role) {
            const updated = [...prev];
            updated[0] = {
              ...updated[0],
              content: updated[0].content + " " + message.transcript,
            };
            return updated;
          }
          return [{ role: message.role, content: message.transcript }, ...prev];
        });
      }
    };
    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);
    const onError = (error: Error) => {};
    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("error", onError);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("error", onError);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
    };
  }, []);

  const toggleMicrophone = () => {
    const isMuted = vapi.isMuted();
    vapi.setMuted(!isMuted);
    setIsMuted(!isMuted);
  };

  const handleCall = async () => {
    const allowed = await canStartNewSession();
    if (!allowed) {
      alert(
        "You’ve reached your conversation limit for this month. Upgrade your plan to continue."
      );
      return;
    }
    setCallStatus(CallStatus.CONNECTING);
    const assistantOverrides = {
      variableValues: { subject, topic, style },
      clientMessages: ["transcript"],
      serverMessages: [],
    };
    //@ts-expect-error
    vapi.start(configureAssistant(voice, style), assistantOverrides);
  };

  const handleDisconnect = () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
    setSessionEnded(true);
  };

  return (
    <section className={cn("flex flex-col", className)}>
      <section className="flex gap-8 max-sm:flex-col flex-shrink-0">
        <div className="guide-section">
          <div
            className="guide-avatar"
            style={{ backgroundColor: getSubjectColor(subject) }}
          >
            <div
              className={cn(
                "absolute transition-opacity duration-1000",
                callStatus === CallStatus.FINISHED ||
                  callStatus === CallStatus.INACTIVE
                  ? "opacity-1001"
                  : "opacity-0",
                callStatus === CallStatus.CONNECTING &&
                  "opacity-100 animate-pulse"
              )}
            >
              <Image
                src={`/icons/${subject}.svg`}
                alt={subject}
                width={150}
                height={150}
                className="max-sm:w-fit"
              />
            </div>
            <div
              className={cn(
                "absolute transition-opacity duration-1000",
                callStatus === CallStatus.ACTIVE ? "opacity-100" : "opacity-0"
              )}
            >
              <Lottie
                lottieRef={lottieRef}
                animationData={soundwaves}
                autoplay={false}
                className="guide-lottie"
              />
            </div>
          </div>
          <p className="font-bold text-2xl">{name}</p>
        </div>
        <div className="user-section">
          <div className="user-avatar">
            <Image
              src={userImage}
              alt={userName}
              width={130}
              height={130}
              className="rounded-lg"
            />
            <p className="font-bold text-2xl">{userName}</p>
          </div>
          <button
            className="btn-mic"
            onClick={toggleMicrophone}
            disabled={callStatus !== CallStatus.ACTIVE}
          >
            <Image
              src={isMuted ? "/icons/mic-off.svg" : "/icons/mic-on.svg"}
              alt="mic"
              width={36}
              height={36}
            />
            <p className="max-sm:hidden">
              {isMuted ? "Turn on microphone" : "Turn off microphone"}
            </p>
          </button>
          <button
            className={cn(
              "rounded-lg py-2 cursor-pointer transition-colors w-full text-white",
              callStatus === CallStatus.ACTIVE ? "bg-red-700" : "bg-primary",
              callStatus === CallStatus.CONNECTING && "animate-pulse"
            )}
            onClick={
              callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall
            }
          >
            {callStatus === CallStatus.ACTIVE
              ? "End Session"
              : callStatus === CallStatus.CONNECTING
              ? "Connecting"
              : "Start Session"}
          </button>
          {callStatus === CallStatus.ACTIVE && remainingTime !== null && (
            <p
              className="font-mono text-center text-lg mt-2 px-4 py-2 rounded-lg border border-white/40 bg-opacity-60 backdrop-blur-sm shadow-md"
              style={{ backgroundColor: getSubjectColor(subject) }}
              aria-label="Session Timer"
            >
              Timer: {formatTime(remainingTime)}
            </p>
          )}
        </div>
      </section>
      <section className="transcript flex-1 min-h-[300px] overflow-y-auto">
        <div>
          <h1 className="py-5">Transcript:</h1>
        </div>
        <div className="transcript-message no-scrollbar">
          {messages.map((message, index) => {
            if (message.role === "assistant") {
              return (
                <p key={index} className="max-sm:text-sm">
                  {name.split(" ")[0].replace(/[.,]/g, " ")}: {message.content}
                </p>
              );
            } else {
              return (
                <p key={index} className="text-primary max-sm:text-sm">
                  {userName}: {message.content}
                </p>
              );
            }
          })}
        </div>
        <div className="transcript-fade" />
      </section>
      {sessionEnded && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center max-w-sm">
            <h2 className="text-xl font-bold mb-2">Session Ended</h2>
            <p className="text-gray-600 mb-4">
              The call has ended. You can start a new session anytime again.
            </p>
            <button
              onClick={() => setSessionEnded(false)}
              className="bg-primary text-white px-4 py-2 rounded-md cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default GuideComponent;
