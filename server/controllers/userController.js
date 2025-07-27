const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const crypto = require("crypto");
const normalize = require("../ultils/normalize");
const makeToken = require("uniqid");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../middlewares/jwt");
const sendMail = require("../ultils/sendMail");
// const register = asyncHandler(async (req, res) => {
//   const { email, password, firstName, lastName } = req.body;
//   if (!email || !password || !firstName || !lastName) {
//     return res.status(400).json({
//       success: false,
//       message: "Missing inputs",
//     });
//   }
//   const user = await User.findOne({ email });
//   if (user) throw new Error("User has existed!");
//   else {
//     const newUser = User.create(req.body);
//     return res.status(200).json({
//       success: newUser ? true : false,
//       message: newUser
//         ? "Register is successfully. Please login!"
//         : "Something went wrong!",
//     });
//   }
// });
const register = asyncHandler(async (req, res) => {
  const { email, password, firstName, lastName, phoneNumber } = req.body;
  if (!email || !password || !firstName || !lastName || !phoneNumber) {
    return res.status(400).json({
      success: false,
      message: "Missing inputs",
    });
  }
  const user = await User.findOne({ email });
  if (user) {
    throw new Error("User has existed!");
  } else {
    const token = makeToken();
    res.cookie("dataRegister", JSON.stringify({ ...req.body, token }), {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    });
    const html = `Xin vui lòng click vào link dưới đây để hoàn tất quá trình đăng kí của bạn. Link này sẽ hết hạn 15 phút kể từ bây giờ. <a href=${process.env.URL_SERVER}/api/user/final-register/${token}>Click here</a>`;
    try {
      await sendMail({ email, html, subject: "Complete registration" });
      return res.status(200).json({
        success: true,
        message: "Please check your email to active your account",
      });
    } catch (error) {
      console.error("Error sending email: ", error);
      return res.status(500).json({
        success: false,
        message: "Failed to send verification email. Please try again.",
      });
    }
  }
});
const finalRegister = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  console.log(cookie?.dataRegister);
  if (!cookie?.dataRegister) {
    res.clearCookie("dataRegister");
    return res.redirect(`${process.env.CLIENT_URL}/final-register/failed`);
  }
  const { token, ...data } = JSON.parse(cookie.dataRegister);
  const { registerToken } = req.params;

  if (token !== registerToken) {
    res.clearCookie("dataRegister");
    return res.redirect(`${process.env.CLIENT_URL}/final-register/failed`);
  }

  const newUser = User.create(data);
  res.clearCookie("dataRegister");
  if (newUser) {
    return res.redirect(`${process.env.CLIENT_URL}/final-register/success`);
  } else {
    return res.redirect(`${process.env.CLIENT_URL}/final-register/failed`);
  }
});
// refreshToken => Cấp mới accessToken
// accessToken => Xác thực người dùng, phân quyền người dùng
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Missing inputs",
    });
  }
  const response = await User.findOne({ email });
  if (response && (await response.isCorrectPassword(password))) {
    const { password, role, refreshToken, ...userData } = response.toObject();
    // Tạo accessToken
    const accessToken = generateAccessToken(response._id, role);
    // Tạo refreshToken
    const newRefreshToken = generateRefreshToken(response._id);
    // Lưu refreshToken vào database
    await User.findByIdAndUpdate(
      response._id,
      { refreshToken: newRefreshToken },
      { new: true }
    );
    // Lưu refreshToken vào cookie
    res.cookie("refreshToken", newRefreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
    });
    return res.status(200).json({
      success: true,
      accessToken,
      userData,
    });
  } else {
    throw new Error("Invalid credentials!");
  }
});
const getCurrentUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id).select("-refreshToken -password -role"); //select(-) loại trừ các trường này khỏi kết quả trả về
  return res.status(200).json({
    success: user ? true : false,
    res: user ? user : "User not found",
  });
});
// Tạo accessToken mới khi nó hết hạn dựa trên refreshToken
const refreshAccessToken = asyncHandler(async (req, res) => {
  //Lấy refreshToken từ cookie
  const cookies = req.cookies;
  // Check xem có refreshToken hay ko
  if (!cookies && !cookies.refreshToken) {
    throw new Error("No refresh token in cookies!");
  }
  // Check refreshToken có hợp lệ hay ko
  const result = await jwt.verify(cookies.refreshToken, process.env.JWT_SECRET);
  // Check xem refreshToken có khớp với refreshToken đã lưu trong db
  const response = await User.findOne({
    _id: result._id,
    refreshToken: cookies.refreshToken,
  });
  return res.status(200).json({
    success: response ? true : false,
    newAcessToken: response
      ? generateAccessToken(response._id, response.role)
      : "Refresh token not matched!",
  });
});
const logOut = asyncHandler(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies || !cookies.refreshToken) {
    throw new Error("No refresh token in cookies!");
  }
  // Xóa refreshToken trong db
  await User.findOneAndUpdate(
    { refreshToken: cookies.refreshToken },
    { refreshToken: "" },
    { new: true }
  );
  // Xóa refreshToken trong cookies
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  return res.status(200).json({
    success: true,
    message: "Logout is done",
  });
});
// Reset mật khẩu
// Client gửi email đã đăng ký
// Server check email có hợp lệ hay ko => gửi về email + kèm theo link (password change token)
// Client check email => click link
// Client gửi api kèm token
// Check token có giống với token mà server gửi mail hay ko
// Change password

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  // Check xem có email gửi lên ko
  if (!email) {
    throw new Error("Missing email!");
  }
  // Check xem có email trong db ko
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found!");
  }
  // Tạo resetToken
  const resetToken = user.createPasswordChangedToken();
  // Lưu token vào db
  await user.save();

  const html = `Xin vui lòng click vào đây để thay đổi mật khẩu của bạn. Link này sẽ hết hạn 15 phút kể từ bây giờ. <a href=${process.env.CLIENT_URL}/reset-password/${resetToken}>Click here</a>`;
  const data = {
    email,
    html,
    subject: "Forgot password",
  };
  const result = await sendMail(data);
  return res.status(200).json({
    success: true,
    result,
  });
});
const resetPassword = asyncHandler(async (req, res) => {
  const { password, token } = req.body;
  if (!password || !token) {
    throw new Error("Missing password!");
  }
  const passwordResetToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  const user = await User.findOne({
    passwordResetToken,
    passwordResetExpries: { $gt: Date.now() },
  });
  if (!user) {
    throw new Error("Invalid password reset token!");
  }
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordChangedAt = Date.now();
  user.passwordResetExpries = undefined;
  await user.save();
  return res.status(200).json({
    success: user ? true : false,
    message: user ? "Reset password successful!" : "Something went wrong!",
  });
});
const getAllUsers = asyncHandler(async (req, res) => {
  const user = await User.find().select("-password -role -refreshToken");
  return res.status(200).json({
    success: user ? true : false,
    user,
  });
});
const deleteUserByAdmin = asyncHandler(async (req, res) => {
  const { _id } = req.query;
  if (!_id) {
    throw new Error("Missing inputs");
  }
  const response = await User.findByIdAndDelete(_id);
  return res.status(200).json({
    success: response ? true : false,
    deletedUser: response
      ? `User with email: ${response.email} deleted`
      : "No user delete",
  });
});
const updateUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  if (!_id || Object.keys(req.body).length === 0) {
    throw new Error("Missing inputs");
  }
  // // Tách address ra khỏi phần còn lại
  // const { address, ...otherFields } = req.body;
  // // Tạo đối tượng cập nhật
  // const updateData = {};
  // // Nếu có các trường khác thì dùng $set
  // if (Object.keys(otherFields).length > 0) {
  //   updateData.$set = otherFields;
  // }
  // // Nếu có address thì push
  // if (address) {
  //   updateData.$push = { address: address };
  // }
  const response = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  }).select("-password -role -refreshToken");
  return res.status(200).json({
    success: response ? true : false,
    updatedUser: response ? response : "Something went wrong",
  });
});
const updateUserByAdmin = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  if (Object.keys(req.body).length === 0) {
    throw new Error("Missing inputs");
  }
  const response = await User.findByIdAndUpdate(userId, req.body, {
    new: true,
  }).select("-password -role -refreshToken");
  return res.status(200).json({
    success: response ? true : false,
    updatedUserByAdmin: response ? response : "Something went wrong",
  });
});
const updateUserAddress = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { address } = req.body;
  if (!address) {
    throw new Error("Missing address inputs");
  }
  const user = await User.findById(_id);
  if (!user) {
    throw new Error("User not found");
  }
  const isDuplicate = user.address.some(
    (el) => normalize(el) === normalize(address)
  );
  if (isDuplicate) throw new Error("Address already exists");
  const response = await User.findByIdAndUpdate(
    _id,
    { $push: { address: address } },
    { new: true }
  ).select("-password -role -refreshToken");
  return res.status(200).json({
    success: response ? true : false,
    response: response || "Cannot update user Address",
  });
});
const updateCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { productId, quantity, color } = req.body;
  if (!productId || !quantity || !color) {
    throw new Error("Missing inputs");
  }
  const user = await User.findById(_id);
  if (!user) {
    throw new Error("User not found");
  }
  const alreadyProductWithColor = user.cart.find(
    (el) =>
      el.product.toString() === productId &&
      normalize(el.color) === normalize(color)
  ); // Kiểm tra đã có sản phẩm + màu này chưa
  if (alreadyProductWithColor) {
    await User.findOneAndUpdate(
      {
        _id: _id,
        cart: { $elemMatch: { product: productId, color: color } },
      },
      {
        $inc: { "cart.$.quantity": +quantity },
      }
    ); //  Nếu đã tồn tại → cập nhật số lượng:
  } else {
    await User.findByIdAndUpdate(
      _id,
      { $push: { cart: { product: productId, quantity, color } } },
      { new: true }
    );
  } // nếu chưa thì thêm mới
  const updatedUser = await User.findById(_id).populate("cart.product", "name");
  return res.status(200).json({
    success: updatedUser ? true : false,
    updatedCart: updatedUser.cart || "Something went wrong",
  });
});
module.exports = {
  register,
  finalRegister,
  login,
  getCurrentUser,
  refreshAccessToken,
  logOut,
  forgotPassword,
  resetPassword,
  getAllUsers,
  deleteUserByAdmin,
  updateUser,
  updateUserByAdmin,
  updateUserAddress,
  updateCart,
};
