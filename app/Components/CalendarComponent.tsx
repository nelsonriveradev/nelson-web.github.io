"use client";
import { Calendar } from "@/components/ui/calendar";
import { useState, useEffect } from "react";

export default function CalendarComponent() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [availableTime, setAvailableTime] = useState<{
    startTime: string;
    endTime: string;
  }>({
    startTime: "",
    endTime: "",
  });
  useEffect(() => {
    async function getMySchedule() {
      try {
        const response = await fetch("/api/Calcom/getSchedule");
        const data = await response.json();
        const { startTime, endTime } = data;
        console.log(startTime);
      } catch (error) {
        console.log(error);
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
          className={`border-2 p-4 border-zinc-200 mx-auto w-fit rounded-lg`}
          classNames={{
            day: "h-8 w-8 p-0 font-normal aria-selected:opacity-100 hover:scale-105 hover:border-2 hover:border-zinc-200 rounded-md transition-all duration-100 ease-in-out",
            day_outside: "text-zinc-500",
            day_selected:
              "bg-zinc-200 text-zinc-800 rounded-md hover:scale-105 transition-all duration-100 ease-in-out",
          }}
        />
      </div>
      <h1>{date?.toDateString()}</h1>
    </div>
  );
}
