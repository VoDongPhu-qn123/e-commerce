import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Login, Home, Public } from "./pages/public";
import PATH from "./ultils/path";
function App() {
  return (
    <div className="min-h-screen font-main">
      <Routes path>
        <Route path={PATH.PUBLIC} element={<Public />}>
          <Route path={PATH.HOME} element={<Home />}></Route>
          <Route path={PATH.LOGIN} element={<Login />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
