import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthPage } from "./Routes/AuthPage";
import { MainPage } from "./Routes/MainPage";
import { Signup } from "./Routes/Signup";
import { DetailPage } from "./Routes/DetailPage";

function App() {
  return (
    <div className="w-screen h-screen">
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={<MainPage />} />
            <Route path="/detail/:id" element={<DetailPage />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
