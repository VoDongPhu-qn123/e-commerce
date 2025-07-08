import icons from "./icons";
const { FaStar, FaRegStar } = icons;
export const renderStarsFromNumber = (number) => {
  //4* => [11110]
  //2* => [11000]
  const stars = [];
  for (let i = 0; i < number; i++) {
    stars.push(<FaStar key={i} color="orange" />);
  }
  for (let j = 5; j > number; j--) {
    stars.push(<FaRegStar key={j} color="orange" />);
  }
  return stars;
};
