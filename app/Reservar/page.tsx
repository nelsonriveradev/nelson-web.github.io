import CalendarComponent from "../Components/CalendarComponent";
import getClerkCurrentUser from "../../lib/actions/clerk/actions";
export default async function ReservarPage() {
  const user = await getClerkCurrentUser();
  return (
    <div>
      <CalendarComponent user={user} />
    </div>
  );
}
