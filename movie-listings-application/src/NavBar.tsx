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
        <div className="bg-slate-700 flex justify-evenly">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem className="px-15 py-8"> 
                <NavLink to="/trending">Trending</NavLink>
              </NavigationMenuItem>
              <NavigationMenuItem className="px-15 py-8">
                <NavLink to="/top-rated">Top Rated</NavLink>
              </NavigationMenuItem>
              <NavigationMenuItem className="px-15 py-8">
                <NavLink to="/action">Action</NavLink>
              </NavigationMenuItem>
              <NavigationMenuItem className="px-15 py-8">
                <NavLink to="/animation">Animation</NavLink>
              </NavigationMenuItem>
              <NavigationMenuItem className="px-15 py-8">
                <NavLink to="/comedy">Comedy</NavLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
          <Outlet />
      </>
    )
  }
  
  export default NavBar