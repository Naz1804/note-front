import SunIcon from 'app/assets/images/icon-sun.svg?react'
import MoonIcon from 'app/assets/images/icon-moon.svg?react'
import SystemIcon from 'app/assets/images/icon-system-theme.svg?react'
import Options from '~/components/Options'

import type { Route } from './+types/colorTheme'
import { api } from '~/util/authApi'
import { getTokenFromRequest } from '~/util/cookie'
import { useLoaderData } from 'react-router'
import { useEffect } from 'react'


export async function loader({ request }: Route.LoaderArgs) {
  const token = getTokenFromRequest(request);

  const res = await api.get('/auth/me', token)
  return res.json();
}

export async function action({ request }: Route.ActionArgs) {
  const token = getTokenFromRequest(request);

  const formData = await request.formData();
  const theme = formData.get('color_theme'); 

  const res = await api.patch('/auth/setting', { theme }, token)
  return res.json();
}


const ColorTheme = () => {
  const data = useLoaderData();

  useEffect(() => {
    const dbTheme = data.user.color_theme;

    if (dbTheme === 'dark') {
      localStorage.setItem('color_theme', 'dark');
      document.documentElement.classList.add('dark');
    } else if (dbTheme === 'light') {
      localStorage.setItem('color_theme', 'light');
      document.documentElement.classList.remove('dark');
    } else {
      localStorage.removeItem('color_theme');
    }
    
  }, [data.user]);

  const themeOptions = [
    {
      id: 'light',
      icon: <SunIcon className='w-6 h-6' />,
      title: 'Light Mode',
      description: 'Pick a clean and classic light theme'
    },
    {
      id: 'dark',
      icon: <MoonIcon className='w-6 h-6' />,
      title: 'Dark Mode',
      description: 'Select a sleek and modern dark theme'
    },
    {
      id: 'system',
      icon: <SystemIcon className='w-6 h-6' />,
      title: 'System',
      description: 'Adapts to your device\'s theme'
    },
  ]

  return (
    <Options title='Color' name='color_theme' options={themeOptions} active={data.user.color_theme}/>
  )
}

export default ColorTheme