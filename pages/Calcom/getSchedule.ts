import { NextApiRequest, NextApiResponse } from "next";

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const options = {
      method: "GET",
      headers: {
        Authorization: `${process.env.NEXT_PUBLIC_CAL_DEV_API_KEY}`,
        "cal-api-version": "2024-06-11",
      },
    };
    const response = await fetch(
      `https://api.cal.com/v2/schedules/541524`,
      options
    );
    const data = await response.json();
    const endTime = data.data.workingHours[0].endTime;
    const startTime = data.data.workingHours[0].startTime;
    const timeZone = data.data.timeZone;

    res.status(200).json({ startTime, endTime, timeZone, data });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
