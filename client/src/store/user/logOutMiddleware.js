const logOutMiddleware = (store) => (next) => (action) => {
  if (action.type === "user/logOut") {
    
    const userData = localStorage.getItem("persist:shop/user");
    if (userData) {
      localStorage.removeItem("persist:shop/user");
    }
    store.dispatch({
      type: "user/updateState",
      payload: {
        accessToken: null,
        isLoggedIn: false,
        currentUser: null,
      },
    })
  }
  return next(action);
};
export default logOutMiddleware;
