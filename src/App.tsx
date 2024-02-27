import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SearchPage from "./pages/searchMovie";
import MoviePage from "./pages/movie";

const routers = createBrowserRouter([
  { path: "/", element: <SearchPage /> },
  { path: "/movie/:id", element: <MoviePage /> },
]);

function App() {
  return <RouterProvider router={routers} />;
}

export default App;
