import {Routes, Route} from "react-router";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";

function App() {
  return (
    <div data-theme="dim">
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/create" element={<CreatePage/>} />
        <Route path="/notes/:id" element={<NoteDetailPage/>} />
      </Routes>
    </div>
  )
}

export default App;
