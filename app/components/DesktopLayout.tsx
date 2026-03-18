import { Outlet, useLocation } from "react-router";
import NoteList from "~/components/NoteList";
import SearchBar from "~/components/SearchBar";
import Sidebar from "~/components/Sidebar";
import SettingList from "./SettingList";

interface Props {
  data: {
    allNotes: Note[];
    tags: string[];
    user: {
      id: number;
      email: string;
      color_theme: string;
      font_theme: string;
    };
  };
}

const desktopLayout = ({ data }: Props) => {
  const location = useLocation();
  
  const isTagRoute = location.pathname.includes('/tags/');
  const isSearching = location.pathname.includes('/search');
  const isSetting = location.pathname.includes('/setting')

  return (
    <div className="max-w-[1440px] mx-auto">
      <main className="hidden lg:flex items-start w-full">
        <Sidebar tags={data.tags}/>
        <div className="w-full">
          {!isSearching && <SearchBar />}
          <div className="flex items-start">
            {!isSetting && !isTagRoute && !isSearching && <NoteList allNotes={data.allNotes}/>}
            {isSetting && <SettingList />}
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  )
}

export default desktopLayout

