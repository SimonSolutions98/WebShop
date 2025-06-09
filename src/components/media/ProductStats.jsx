import StarRating from "./StarRating.jsx";
import EstimatedTime from "./EstimatedTime.jsx";
import EstimatedWeight from "./EstimatedWeight.jsx";

export default function ProductStats({
  rating,
  estimatedTimeMinutes,
  estimatedMaterialUseGrams,
}) {
  return (
    <div className="flex justify-around items-center w-full">
      <StarRating rating={rating} />
      <EstimatedTime minutes={estimatedTimeMinutes} />
      <EstimatedWeight grams={estimatedMaterialUseGrams} />
    </div>
  );
}
