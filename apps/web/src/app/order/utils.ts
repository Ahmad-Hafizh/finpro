import { useState, useEffect } from "react";

export const formatTime = (ms: number): string => {
  if (ms <= 0) return "Waktu habis";
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

export const useCountdown = (deadline: number): number => {
  const [remainingTime, setRemainingTime] = useState(deadline - Date.now());

  useEffect(() => {
    const intervalId = setInterval(() => {
      const timeLeft = deadline - Date.now();
      setRemainingTime(timeLeft > 0 ? timeLeft : 0);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [deadline]);

  return remainingTime;
};
