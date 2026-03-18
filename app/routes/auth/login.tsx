import FormDesign from "~/components/Form"
import type { Route } from "./+types/login";
import { redirect, useActionData } from "react-router";
import { api } from "~/util/authApi";

export async function action({ request }: Route.ActionArgs) {
  
  const formData = await request.formData();

  const res = await api.post('/auth/login', { 
    email: formData.get('email'), 
    password: formData.get('password')
  })

  const data = await res.json();

  if (!res.ok) {
    return { error: data.message }
  }

  return redirect('/notes', {
    headers: {
      'Set-Cookie': `token=${data.token}; Path=/; HttpOnly; Secure; SameSite=Strict`
    }
  })
}

function login() {
  const actionData = useActionData<{ error?: string; }>();

  return (
    <FormDesign 
    title="Welcome to Note" 
    desc="Please log in to continue" 
    btn="Login" 
    account="No account yet?" 
    signIn="Sign Up" 
    linkTo="/register" 
    error={actionData?.error}/> 
  )
}

export default login