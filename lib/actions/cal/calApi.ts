// for controling Cal.com Api

export async function getAllSchedule(date: Date) {
  const options = {
    method: "GET",
    headers: {
      Authorization: `${process.env.NEXT_PUBLIC_CAL_DEV_API_KEYey}`,
      "cal-api-version": "2024-06-11",
    },
  };

  const response = await fetch("https://api.cal.com/v2/schedules/", options);
  const data = await response.json();
  const availabilityDays = data[0].availability.days;

  return availabilityDays;
}

export default async function getSchedule(scheduleId: string) {
  const options = {
    method: "GET",
    headers: {
      Authorization: `${process.env.NEXT_PUBLIC_CAL_DEV_API_KEY}`,
      "cal-api-version": "<cal-api-version>",
    },
  };
  const response = await fetch(
    `https://api.cal.com/v2/schedules/${scheduleId}`,
    options
  );
  const data = await response.json();
  const endTime = data.data.workingHours[0].endTime;
  const startTime = data.data.workingHours[0].startTime;
  const timeZone = data.data.timeZone;

  return { startTime, endTime, timeZone, data };
}

export async function createaBooking() {}
