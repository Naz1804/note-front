import { NavLink } from "react-router"
import type { ComponentType, SVGProps } from "react";

import ArrowIcon from 'app/assets/images/icon-chevron-right.svg?react'


interface Props {
  to: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  children: string;
}

const SideNavLink = ({ to, icon: Icon, children }: Props) => {
  return (
    <NavLink to={to} end>
      {({ isActive }) => (
        <div className={`focus-link group ${isActive && 'bg-neutral-100 dark:bg-neutral-800'}`}>
          <Icon className={`w-5 h-5 group-hover:text-blue-500 ${isActive && 'text-blue-500'}`} />
          <p className="text-preset-4">{children}</p>
          <ArrowIcon className={`hover-icon ${isActive && 'text-neutral-950 dark:text-white'}`} />
        </div>
      )}
    </NavLink>
  )
}

export default SideNavLink