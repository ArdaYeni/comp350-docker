import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostUser from "./components/PostUser";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="post" element={<PostUser />} />
      </Routes>
    </BrowserRouter>
  );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
