import Options from "~/components/Options"
import SansIcon from 'app/assets/images/icon-font-sans-serif.svg?react'
import SerifIcon from 'app/assets/images/icon-font-serif.svg?react'
import MonoIcon from 'app/assets/images/icon-font-monospace.svg?react'

import { getTokenFromRequest } from "~/util/cookie";
import { useLoaderData } from "react-router";
import { api } from "~/util/authApi";
import type { Route } from "./+types/fontTheme";
import { useEffect } from "react";

export async function loader({ request }: Route.LoaderArgs) {
  const token = getTokenFromRequest(request);

  const res = await api.get('/auth/me', token)
  return res.json();
}

export async function action({ request }: Route.ActionArgs) {
  const token = getTokenFromRequest(request);

  const formData = await request.formData();
  const font = formData.get('font_theme'); 

  const res = await api.patch('/auth/setting', { font }, token)
  return res.json()
}


const FontTheme = () => {
  const data = useLoaderData();

  useEffect(() => {
    const dbFont = data.user.font_theme;
    
    localStorage.setItem('font_theme', dbFont);
    document.body.classList.remove('font-sans', 'font-serif', 'font-mono');
    document.body.classList.add(`font-${dbFont}`);
  }, [data.user]);

  const themeOptions = [
    {
      id: 'sans-serif',
      icon: <SansIcon className='w-6 h-6' />,
      title: 'Sans-serif',
      description: 'Clean and modern, easy to read.'
    },
    {
      id: 'serif',
      icon: <SerifIcon className='w-6 h-6' />,
      title: 'Serif',
      description: 'Classic and elegant for a timeless feel.'
    },
    {
      id: 'mono',
      icon: <MonoIcon className='w-6 h-6' />,
      title: 'Monospace',
      description: 'Code-like, great for a technical vibe.'
    },
  ]
  return (
    <Options title='Font' name='font_theme' options={themeOptions} active={data.user.font_theme}/>
  )
}

export default FontTheme