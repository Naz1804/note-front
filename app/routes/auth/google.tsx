import { redirect } from "react-router"

export async function loader() {
    return redirect(`${import.meta.env.VITE_API_URL}/auth/google`);
}

const google = () => {
  return null;
}

export default google