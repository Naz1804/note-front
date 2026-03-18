// routes/_index.tsx
import { redirect } from "react-router";
import { getTokenFromRequest } from "~/util/cookie";
import type { Route } from "./+types/_index";

export async function loader({ request }: Route.LoaderArgs) {
  const token = getTokenFromRequest(request);
  
  if (token) {
    return redirect('/notes');
  }
  
  return redirect('/login');
}

export default function Root() {

  return null;
}

