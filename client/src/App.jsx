import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Login, Home, Public } from "./pages/public";
import { getCategories } from "./store/asyncActions";
import { useDispatch } from "react-redux";
import PATH from "./ultils/path";
import { useEffect } from "react";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
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
