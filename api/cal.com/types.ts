export interface AvailableSlot {
  startTime: string; // ISO 8601 format
  endTime: string; // ISO 8601 format
}

export interface Booking {
  id: string;
  startTime: string;
  endTime: string;
  attendees: { email: string; name: string }[];
  // Add other relevant booking properties
}
