import { Form, redirect, useActionData } from "react-router"
import type { Route } from "./+types/changePassword"
import { getTokenFromRequest } from "~/util/cookie";
import { api } from "~/util/authApi";
import { useMediaQuery } from "~/util/useMediaQuery";
import { toast } from "sonner";

import PasswordInput from "~/components/PasswordInput"
import BackBtn from "~/components/BackBtn";

export async function action({ request }: Route.ActionArgs) {
  const token = getTokenFromRequest(request);

  const formData = await request.formData();
  const oldPassword = formData.get('old-password');
  const newPassword = formData.get('new-password');
  const confirmPassword = formData.get('confirm-password');

  if (newPassword !== confirmPassword) {
    return { error: 'New password do not match'}
  }

  const res = await api.patch('/auth/change-password', { oldPassword, newPassword }, token)
  const data = await res.json()

  if (!res.ok) {
    return { error: data.message }
  }

  return redirect('/login');
}

const ChangePassword = () => {
  const actionData = useActionData<{ error?: string; }>();
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <section className={isMobile ? 
    "section-padding h-nav flex flex-col" : 
    'flex flex-col p-8 w-full max-w-[528px]'}>
      
      <BackBtn text="Setting"/>

      <h1 className="text-preset-1 mt-4">Change Password</h1>

      <Form method="patch" className="flex flex-col gap-5 mt-5">

        <PasswordInput label="Old Password" id="old-password" info={false} />

        <PasswordInput label="New Password" id="new-password" info={true} />

        <PasswordInput label="Confirm New Password" id="confirm-password" info={false} />

        {actionData?.error && <p className="text-red-500 text-preset-6">{actionData.error}</p>}

        <button type="submit" className="blue-btn ml-auto text-preset-4"
        onClick={() => {toast.success('Password changed successfully!')}}>
          Save Password
          </button>
      </Form>
    </section>
  )
}

export default ChangePassword