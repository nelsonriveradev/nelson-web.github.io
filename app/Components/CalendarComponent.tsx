"use client";
import Calendar from "react-calendar";
import { useState, useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import getSchedule from "@/lib/actions/cal/calApi";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export function fromMinutestoHours(minutes: number) {
  const hour = Math.floor(minutes / 60);
  const minute = minutes % 60;
  return { hour, minute };
}

interface CalendarComponentProps {
  user: string | null;
}

export default function CalendarComponent({ user }: CalendarComponentProps) {
  const [selectedDate, setSelectedDate] = useState<Value>(new Date());
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);

  const handleDateChange = (value: Value) => {
    if (value instanceof Date) {
      setSelectedDate(value);
    }
  };

  useEffect(() => {
    const fetchAvailableTimes = async () => {
      if (selectedDate instanceof Date) {
        try {
          const { startTime, endTime, timeZone } = await getSchedule("541524");
          const startHour = fromMinutestoHours(startTime).hour;
          const endHour = fromMinutestoHours(endTime).hour;

          // Generate available hours within the desired range (9 AM to 5 PM)
          const availableSlots = [];
          for (let hour = 9; hour <= 17; hour++) {
            // Use a fixed range from 9 to 17 (5 PM)
            const date = new Date(selectedDate); // Use selectedDate to create the date
            date.setHours(hour, 0, 0, 0); // Set hours directly on the date object

            // Convert to local time zone
            const localTime = new Intl.DateTimeFormat("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
              timeZone: timeZone,
            }).format(date);

            availableSlots.push(localTime);
          }

          // Filter the available slots based on the fetched start and end times
          const filteredSlots = availableSlots.filter((time) => {
            const timeParts = time.match(/(\d+):(\d+)\s([AP]M)/);
            if (!timeParts) return false;

            let hour = parseInt(timeParts[1]);
            const minute = parseInt(timeParts[2]);
            const ampm = timeParts[3];

            if (ampm === "PM" && hour !== 12) hour += 12;
            if (ampm === "AM" && hour === 12) hour = 0; // Midnight

            return hour >= startHour && hour <= endHour;
          });

          setAvailableTimes(filteredSlots);
        } catch (error) {
          console.error("Error fetching schedule:", error);
        }
      }
    };

    fetchAvailableTimes();
  }, [selectedDate]);

  return (
    <div className="text-black flex items-center justify-center flex-col mt-10">
      <Calendar
        className="bg-zinc-600 rounded-lg"
        onChange={handleDateChange}
        value={selectedDate}
        view="month"
      />
      <div className="text-zinc-200">
        <h2 className="text-3xl text-bold">Espacios disponible</h2>
        <div className="flex flex-col flex-wrap h-48 gap-x-4 gap-y-1">
          {availableTimes.map((time, index) => (
            <button
              onClick={() => console.log(time)}
              className="border-2 py-1 px-2 rounded-md hover:scale-105 transition-all ease-in-out duration-100"
              key={index}
            >
              {time}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
