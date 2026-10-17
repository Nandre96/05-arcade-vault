import { getSession } from "@/app/data/session";
import Nav from "./Nav";

export default async function NavSession() {
  return <Nav session={await getSession()} />;
}
