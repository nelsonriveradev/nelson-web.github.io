"use client";

import { Calendar } from "@/components/ui/calendar";
import { useState, useEffect } from "react";

interface ScheduleData {
  startTime: string;
  endTime: string;
}

export default function CalendarComponent() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [availableTime, setAvailableTime] = useState<ScheduleData>({
    startTime: "",
    endTime: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getMySchedule() {
      try {
        setLoading(true);
        const response = await fetch("/api/Calcom/getSchedule");

        if (!response.ok) {
          throw new Error("Failed to fetch schedule");
        }

        const data = await response.json();
        setAvailableTime({
          startTime: data.startTime,
          endTime: data.endTime,
        });
      } catch (error) {
        console.error(error);
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }
    getMySchedule();
  }, []);

  return (
    <div className="">
      <div className="mx-auto mt-10">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="border-2 p-4 border-zinc-200 mx-auto w-fit rounded-lg"
          classNames={{
            day: "h-8 w-8 p-0 font-normal aria-selected:opacity-100 hover:scale-105 hover:border-2 hover:border-zinc-200 rounded-md transition-all duration-100 ease-in-out",
            day_outside: "text-zinc-500",
            day_selected:
              "bg-zinc-200 text-zinc-800 rounded-md hover:scale-105 transition-all duration-100 ease-in-out",
          }}
        />
      </div>
      <div className="mt-4">
        <h1>{date?.toDateString()}</h1>
        {loading && <p>Loading schedule...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {availableTime.startTime && (
          <div>
            <p>Start Time: {availableTime.startTime}</p>
            <p>End Time: {availableTime.endTime}</p>
          </div>
        )}
      </div>
    </div>
  );
}
