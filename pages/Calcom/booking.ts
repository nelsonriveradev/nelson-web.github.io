import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";
import { Booking } from "./types";

type Data = {
  booking?: Booking;
  error?: string;
};

export async function getBooking(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const { eventTypeId, startTime, endTime, attendeeEmail, attendeeName } =
      req.body;

    if (
      !eventTypeId ||
      !startTime ||
      !endTime ||
      !attendeeEmail ||
      !attendeeName ||
      typeof eventTypeId !== "string" ||
      typeof startTime !== "string" ||
      typeof endTime !== "string" ||
      typeof attendeeEmail !== "string" ||
      typeof attendeeName !== "string"
    ) {
      return res.status(400).json({ error: "Invalid input data" });
    }

    const apiKey = process.env.CALCOM_API_KEY;

    try {
      const response = await fetch("https://api.cal.com/v2/bookings", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventTypeId: eventTypeId,
          startTime: startTime,
          endTime: endTime,
          attendees: [
            {
              email: attendeeEmail,
              name: attendeeName,
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const booking = data as Booking;
      res.status(200).json({ booking });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      } else {
        return res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  }
}
