export const createSlug = (string) => string.toLowerCase().split(" ").join("-");
export const formatMoney = (number) => {
  return number?.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};
export const formatPrice = (number) => {
  return Math.round(number / 1000) * 1000;
};
export const formatLabel = (str) => {
  return str.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());
};
export const validate = (payload, setInvalidFields) => {
  let invalids = 0;
  const formatPayload = Object.entries(payload);
  for (let arr of formatPayload) {
    if (arr[1].trim() === "") {
      invalids++;
      setInvalidFields((prev) => [
        ...prev,
        { name: arr[0], message: "Require this field" },
      ]);
    }
  }
  for (let arr of formatPayload) {
    switch (arr[0]) {
      case "email": {
        const regex =
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org|vn|edu)(\.[a-zA-Z]{2})?$/;
        if (!arr[1].match(regex)) {
          invalids++;
          setInvalidFields((prev) => [
            ...prev,
            { name: arr[0], message: "Invalid email" },
          ]);
        }
        break;
      }
      case "password": {
        const regex = /^.{6,}$/;
        if (!arr[1].match(regex)) {
          invalids++;
          setInvalidFields((prev) => [
            ...prev,
            { name: arr[0], message: "Password must be at least 6 characters" },
          ]);
        }
        break;
      }
      case "phoneNumber": {
        const regex = /^(0[3|5|7|8|9])[0-9]{8}$/;
        if (!arr[1].match(regex)) {
          invalids++;
          setInvalidFields((prev) => [
            ...prev,
            { name: arr[0], message: "Invalid phone number" },
          ]);
        }
        break;
      }
      default:
        break;
    }
  }
  return invalids;
};
export const validateEmail = (value) => {
  const regex =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org|vn|edu)(\.[a-zA-Z]{2})?$/;
  if (value.match(regex)) {
    return true;
  } else return false;
};
