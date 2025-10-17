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
  FinalRegister,
  ResetPassword,
} from "./pages/public";
import { getCategories } from "./store/app/asyncActions";
import { getNewProducts } from "./store/products/asyncAction";
import { useDispatch, useSelector } from "react-redux";
import PATH from "./ultils/path";
import { useEffect } from "react";
import { ToastContainer, Bounce } from "react-toastify";
import { Modal } from "./components";
function App() {
  const dispatch = useDispatch();
  const { isShowModal, modalChildren } = useSelector((state) => state.app);
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getNewProducts());
  }, [dispatch]);
  return (
    <div className="font-main relative">
      {isShowModal && <Modal>{modalChildren}</Modal>}
      <Routes path>
        <Route path={PATH.PUBLIC} element={<Public />}>
          <Route path={PATH.HOME} element={<Home />}></Route>
          <Route path={PATH.LOGIN} element={<Login />}></Route>
          <Route path={PATH.FINAL_REGISTER} element={<FinalRegister />}></Route>
          <Route path={PATH.RESET_PASSWORD} element={<ResetPassword />}></Route>
          <Route path={PATH.PRODUCTS} element={<Products />}></Route>
          <Route
            path={PATH.DETAIL_PRODUCT_CATEGORY_PID_NAME}
            element={<DetailProducts />}
          ></Route>
          <Route path={PATH.BLOGS} element={<Blogs />}></Route>
          <Route path={PATH.OUR_SERVICES} element={<Services />}></Route>
          <Route path={PATH.FAQS} element={<FAQ />}></Route>
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Bounce}
        theme="colored"
      />
    </div>
  );
}

export default App;
