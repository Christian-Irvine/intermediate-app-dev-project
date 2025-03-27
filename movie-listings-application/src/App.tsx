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
          <Route index element={<MovieDisplay type="trending"/>} />
          <Route path="/trending" element={<MovieDisplay type="trending"/>} />
          <Route path="/top-rated" element={<MovieDisplay type="top-rated"/>} />
          <Route path="/action" element={<MovieDisplay type="action"/>} />
          <Route path="/animation" element={<MovieDisplay type="animation"/>} />
          <Route path="/comedy" element={<MovieDisplay type="comedy"/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
