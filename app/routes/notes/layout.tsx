import { useLoaderData } from "react-router"
import { getTokenFromRequest } from "~/util/cookie";
import type { Route } from "../setting/+types/colorTheme";
import { getAllNotes, getTagsNote } from "~/util/noteApi";
import { useMediaQuery } from "~/util/useMediaQuery";
import { api } from "~/util/authApi";
import { useEffect } from "react";

import MobileLayout from "~/components/MobileLayout";
import DesktopLayout from "~/components/DesktopLayout";

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const token = getTokenFromRequest(request);

  const isArchive = url.pathname.includes('/archive')

  const [notesData, tagsData, userData] = await Promise.all([
    isArchive 
      ? await getAllNotes('/archived' , token)   
      : await getAllNotes('/' ,token),                          
      await getTagsNote(token),
      await api.get('/auth/me', token)
  ]);

  const notes = await notesData.json();
  const tags = await tagsData.json();
  const user = await userData.json();
  
  return { 
    allNotes: notes.allNotes,
    tags: tags.tags,
    user: user.user
   };
}


function layoutNotes() {
  const data = useLoaderData();
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    const dbFont = data.user.font_theme;
    
    localStorage.setItem('font_theme', dbFont);
    document.body.classList.remove('font-sans', 'font-serif', 'font-mono');
    document.body.classList.add(`font-${dbFont}`);
  }, [data.user]);

  if (isMobile) {
    return <MobileLayout />
  }

  return <DesktopLayout data={data} /> 
}

export default layoutNotes