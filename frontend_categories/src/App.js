import * as React from "react";
import { Routes, Route} from "react-router-dom";
import Reports from "./pages/Reports";
import Upload from "./pages/Upload";
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from "./components/Menu";
import NoMatch from "./pages/NoMatch";
import Categories from "./pages/Categories/Categories";


export default function App() {
  return (
    <div>
      {/* Routes nest inside one another. Nested route paths build upon
            parent route paths, and nested route elements render inside
            parent route elements. See the note about <Outlet> below. */}
      <Routes>
        <Route path="/" element={<Menu />}>
          <Route index element={<Upload />} />
          <Route path="Categories" element={<Categories />} />
          <Route path="reports" element={<Reports />} />

          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

