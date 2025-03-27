import { BrowserRouter, Routes, Route } from "react-router";
import NavBar from './NavBar';
import MovieDisplay from './MovieDisplay';
import PageNotFound from './PageNotFound';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/" element={<NavBar />}>
          <Route path=":types" element={<MovieDisplay />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
