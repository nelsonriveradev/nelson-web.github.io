import { currentUser, User } from "@clerk/nextjs/server";

export default async function getClerkCurrentUser() {
  const user: User | null = await currentUser();
  if (user) {
    console.log("User: User is true");
  } else {
    console.log("User is null");
  }
}
