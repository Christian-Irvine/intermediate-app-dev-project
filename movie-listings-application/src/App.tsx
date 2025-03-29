import { BrowserRouter, Routes, Route } from "react-router";
import NavBar from './components/NavBar';
import MovieDisplay from './components/MovieDisplay';
import PageNotFound from './components/PageNotFound';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route path="*" element={<PageNotFound />} />
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
