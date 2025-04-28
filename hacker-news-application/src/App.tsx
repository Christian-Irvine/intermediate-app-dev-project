import { BrowserRouter, Routes, Route } from "react-router";
import NavBar from './components/NavBar';
import StoryDisplay from './components/StoryDisplay';
import PageNotFound from './components/PageNotFound';

const App: React.FC = () => {
  const routes: Array<string> = [
    "ask-stories",
    "best-stories",
    "job-stories",
    "new-stories",
    "show-stories",
    "top-stories",
    "leaders",
  ];

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavBar routes={routes}/>}>
          <Route path="*" element={<PageNotFound />} />
          <Route index element={<StoryDisplay type={routes[0]}/>} />
          {routes.map((route: any) => (            
            <Route key={route} path={route} element={<StoryDisplay type={route}/>} />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
