//Hàm xử lý chuẩn hoá địa chỉ trước khi so sánh
const normalize = (str) => {
  return str
    .normalize("NFD") // Bỏ dấu
    .replace(/[\u0300-\u036f]/g, "") // Bỏ ký tự unicode của dấu
    .toLowerCase() // Viết thường
    .trim() // Bỏ khoảng trắng đầu/cuối
    .replace(/\s+/g, " "); // Bỏ khoảng trắng thừa giữa các từ
};
module.exports = normalize;
