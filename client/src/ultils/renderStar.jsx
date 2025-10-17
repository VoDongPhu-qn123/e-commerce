import icons from "./icons";
const { FaStar, FaRegStar, FaStarHalfAlt } = icons;
export const renderStarsFromNumber = (number) => {
  //4* => [11110]
  //2* => [11000]
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (number >= i) {
      stars.push(<FaStar key={i} color="orange" />);
    } else if (number >= i - 0.5) {
      stars.push(<FaStarHalfAlt key={i} color="orange" />);
    } else {
      stars.push(<FaRegStar key={i} color="orange" />);
    }
  }
  return stars;
};
