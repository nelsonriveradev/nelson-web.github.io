import { getAuth } from "@clerk/nextjs/server";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = getAuth(req);
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { eventTypeId, date } = req.query;
  if (!eventTypeId || !date) {
    return res
      .status(400)
      .json({ error: "Missing eventTypeId or date parameters" });
  }

  const apiKey = process.env.NEXT_PUBLIC_CAL_DEV_API_KEY;

  if (!apiKey) {
    console.log("Missing Cal.com Api key");
    return res.status(500).json({
      error: "Cal.com api key is not present in enviroment variables",
    });
  }

  try {
    const response = await fetch(
      `https://api.cal.com/v2/availability/${eventTypeId}?date=${date}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );
    if (!response.ok) {
      return res
        .status(response.status)
        .json({ message: `${response.statusText}` });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error: any) {
    console.log("Error fetching availability:", error);
    return res.status(500).json({
      error: "Error fetching availability",
      errorMessage: error.message,
    });
  }
}
