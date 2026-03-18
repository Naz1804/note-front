import FormDesign from "~/components/Form"
import { redirect, useActionData } from "react-router";
import { api } from "~/util/authApi";
import type { Route } from "./+types/register";

export async function action({ request }: Route.ActionArgs) {
  
  const formData = await request.formData();

  const res = await api.post('/auth/register', { 
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

const register = () => {
  const actionData = useActionData<{ error?: string; }>();

  return (
    <FormDesign 
    title="Create Your Account" 
    desc="Sign up to start organizing your notes and boost your productivity."
    btn="Sign Up" 
    account="Already have an account?" 
    signIn="Login" 
    linkTo="/login" 
    error={actionData?.error} />
  )
}

export default register