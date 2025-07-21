import "./App.css";
import { Routes, Route } from "react-router-dom";
import {
  Login,
  Home,
  Public,
  Products,
  DetailProducts,
  Blogs,
  Services,
  FAQ,
} from "./pages/public";
import { getCategories } from "./store/app/asyncActions";
import { getNewProducts } from "./store/products/asyncAction";
import { useDispatch } from "react-redux";
import PATH from "./ultils/path";
import { useEffect } from "react";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getNewProducts());
  }, [dispatch]);
  return (
    <div className="min-h-screen font-main">
      <Routes path>
        <Route path={PATH.PUBLIC} element={<Public />}>
          <Route path={PATH.HOME} element={<Home />}></Route>
          <Route path={PATH.LOGIN} element={<Login />}></Route>
          <Route path={PATH.PRODUCTS} element={<Products />}></Route>
          <Route
            path={PATH.DETAIL_PRODUCT_PID_NAME}
            element={<DetailProducts />}
          ></Route>
          <Route path={PATH.BLOGS} element={<Blogs />}></Route>
          <Route path={PATH.OUR_SERVICES} element={<Services />}></Route>
          <Route path={PATH.FAQS} element={<FAQ />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
