import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];
export default function CalendarComponent() {
  const [value, setValue] = useState<Value>(new Date());

  const onChange = (nextValue: Value) => {
    setValue(nextValue);
  };
  return (
    <div className="">
      <Calendar
        className="bg-zinc-600 text-zinc-100 rounded-lg"
        onChange={onChange}
        value={value}
      />
    </div>
  );
}
