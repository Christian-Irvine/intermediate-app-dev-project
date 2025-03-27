import './App.css'

interface RouteProps {
  type: string,
}

const Home: React.FC<RouteProps> = (props) => {
    return (
      <>
        <h1>Home {props.type}</h1>
      </>
    )
  }
  
  export default Home
  