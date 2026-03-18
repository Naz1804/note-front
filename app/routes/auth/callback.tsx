import { redirect } from "react-router";
import type { Route } from "./+types/callback";

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const token = url.searchParams.get('token'); 
  
  if (!token) {
    console.log('No token found, redirecting to login');
    return redirect('/login');
  }
  
  return redirect('/notes', {
    headers: {
      'Set-Cookie': `token=${token}; Path=/; HttpOnly; Secure; SameSite=Lax`
    }
  });
}

const GoogleCallback = () => {
  return (
    <div className="bg-white dark:bg-neutral-950 border-2 border-neutral-200 dark:border-neutral-800 
    rounded-xl w-full max-w-135 min-h-155.75 flex items-center justify-center">
      <h1 className="text-preset-1">Logging in...</h1>
    </div>
  )
}

export default GoogleCallback