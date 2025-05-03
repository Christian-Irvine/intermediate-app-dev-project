import { Outlet } from "react-router";
import { NavLink } from "react-router";
import { getDisplayName } from "../Utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "./ui/navigation-menu"

interface NavProps {
  routes: Array<string>,
}

const NavBar: React.FC<NavProps> = (props: NavProps) => {
  return (
    <>
      <div className="bg-slate-700 flex justify-evenly w-full">
        <NavigationMenu>
          <NavigationMenuList>
            {props.routes.map((route: any) => (                
              <NavigationMenuItem key={route}> 
                <NavLink to={`/${route}`}>
                  <div className="px-15 py-8 hover:bg-slate-800">{getDisplayName(route)}</div>
                </NavLink>
              </NavigationMenuItem>
            ))}
              <NavigationMenuItem> 
                <NavLink to={'/user'}>
                  <div className="px-15 py-8 hover:bg-slate-800">Leaders</div>
                </NavLink>
              </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
        <Outlet />
    </>
  )
}
  
export default NavBar