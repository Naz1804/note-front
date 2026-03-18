import {  redirect } from 'react-router'
import type { Route } from './+types/setting'
import { useMediaQuery } from '~/util/useMediaQuery'
import SettingList from '~/components/SettingList';

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const intent = formData.get('intent');
  
  if (intent === 'logout') {
    return redirect('/login', {
      headers: {
        'Set-Cookie': 'token=; Path=/; Max-Age=0'
      }
    });
  }
}

const setting = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  if (isMobile) {
    return <SettingList />
  }

  return null;
}

export default setting