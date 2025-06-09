import { Link } from "react-router-dom";

export default function CategoryCard({ title, imageUrl, fallbackUrl, slug }) {
  const handleImageError = (event) => {
    event.target.onerror = null;
    event.target.src = fallbackUrl;
  };

  return (
    <Link to={`/products?category=${slug}`}>
      <div>
        <img
          src={imageUrl}
          alt={title}
          onError={handleImageError}
          className="w-full aspect-square object-cover rounded-fluid-l border-2 border-highlight transform hover:scale-105 transition duration-250"
        />
      </div>
    </Link>
  );
}
