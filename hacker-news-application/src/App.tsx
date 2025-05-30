/**
 * Created by Christian James Irvine
 * Handles all the routes in the project and displays their relevant components
 */

import { BrowserRouter, Routes, Route } from "react-router";
import NavBar from "./components/NavBar";
import StoryDisplay from "./components/StoryDisplay";
import PageNotFound from "./components/PageNotFound";
import Story from "./components/Story";
import UserSearch from "./components/UserSearch";

const App: React.FC = () => {
  const routes: Array<string> = [
    "ask-stories",
    "best-stories",
    "job-stories",
    "new-stories",
    "show-stories",
    "top-stories",
  ];

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavBar routes={routes} />}>
          <Route path="*" element={<PageNotFound />} />
          <Route index element={<StoryDisplay type={routes[0]} />} />
          {routes.map((route: any) => (
            <Route
              key={route}
              path={route}
              element={<StoryDisplay type={route} />}
            />
          ))}
          <Route path="story/:id" element={<Story />} />
          <Route path="user" element={<UserSearch />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
