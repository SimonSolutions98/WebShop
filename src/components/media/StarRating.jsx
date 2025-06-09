import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export default function StarRating({ rating, className = "" }) {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<FaStar key={i} className={className} />);
    } else if (rating >= i - 0.5) {
      stars.push(<FaStarHalfAlt key={i} className={className} />);
    } else {
      stars.push(<FaRegStar key={i} className={className} />);
    }
  }

  return (
    <div className="flex items-center gap-0.5">
      {stars}
    </div>
  );
}
