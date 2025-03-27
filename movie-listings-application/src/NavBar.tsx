import { Outlet } from "react-router";
import { Link, NavLink } from "react-router";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "./components/ui/navigation-menu"
 //className="ps-15 pb-5 pt-5"

const NavBar = () => {
    return (
      <>
        <div className="bg-slate-700 flex justify-evenly w-full">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem > 
                <NavLink to="/trending">
                  <div className="px-15 py-8 hover:bg-slate-800">Trending</div>
                </NavLink>
              </NavigationMenuItem>
              <NavigationMenuItem > 
                <NavLink to="/top-rated">
                  <div className="px-15 py-8 hover:bg-slate-800">Top Rated</div>
                </NavLink>
              </NavigationMenuItem>
              <NavigationMenuItem > 
                <NavLink to="/action">
                  <div className="px-15 py-8 hover:bg-slate-800">Action</div>
                </NavLink>
              </NavigationMenuItem>
              <NavigationMenuItem > 
                <NavLink to="/animation">
                  <div className="px-15 py-8 hover:bg-slate-800">Animation</div>
                </NavLink>
              </NavigationMenuItem>
              <NavigationMenuItem > 
                <NavLink to="/comedy">
                  <div className="px-15 py-8 hover:bg-slate-800">Comedy</div>
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