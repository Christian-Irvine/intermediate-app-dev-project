import { BrowserRouter, Routes, Route } from "react-router";
import NavBar from "./components/NavBar";
import MovieDisplay from "./components/MovieDisplay";
import PageNotFound from "./components/PageNotFound";

const App: React.FC = () => {
  const routes: Array<string> = [
    "trending",
    "top-rated",
    "action",
    "animation",
    "comedy",
  ];

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavBar routes={routes} />}>
          <Route path="*" element={<PageNotFound />} />
          <Route index element={<MovieDisplay type={routes[0]} />} />
          {routes.map((route: any) => (
            <Route
              key={route}
              path={route}
              element={<MovieDisplay type={route} />}
            />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
