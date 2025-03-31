import { Outlet } from "react-router";
import { Link, NavLink } from "react-router";
import { getDisplayName } from "../Utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "./ui/navigation-menu"
 //className="ps-15 pb-5 pt-5"

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
            </NavigationMenuList>
          </NavigationMenu>
        </div>
          <Outlet />
      </>
    )
  }
  
  export default NavBar