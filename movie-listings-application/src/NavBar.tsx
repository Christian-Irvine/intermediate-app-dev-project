import { Outlet } from 'react-router'
import './App.css'

const NavBar = () => {
  return (
    <>
      <h1>NavBar</h1>
      <Outlet/>
    </>
  )
}
  
export default NavBar
  