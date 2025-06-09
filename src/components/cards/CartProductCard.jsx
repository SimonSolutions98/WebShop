import { Link } from "react-router-dom";
import PriceTag from "../media/PriceTag";
import ProductStats from "../media/ProductStats";
import CartPageQuantityControls from "../inputs/CartPageQuantityControls";

export default function CartPageProductCard({ item, onRemoveRequest }) {
  const slug = `${item.name.toLowerCase().replace(/\s+/g, "-")}-${item.id}`;

  return (
    <Link
      to={`/product/${slug}`}
      className="block bg-secondary p-fluid-xs rounded-lg border border-blend"
    >
      <div className="grid grid-cols-3 gap-fluid-xs items-start">
        {/* Image */}
        <div className="col-span-1 row-span-1 md:row-span-2 aspect-square w-full rounded overflow-hidden shrink-0">
          <img
            src={item.images[0]}
            alt={item.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              if (item.images[1]) e.target.src = item.images[1];
            }}
          />
        </div>

        {/* Content */}
        <div className="col-span-2 flex flex-col justify-evenly pl-fluid-xs h-full">
          <div className="flex items-center justify-between gap-fluid-xs">
            <h3 className="text-fluid-l font-secondary">{item.name}</h3>
            <PriceTag
              className="text-fluid-s font-secondary"
              value={item.price}
              currency={item.productCurrency}
            />
          </div>

          <p className="text-fluid-s line-clamp-3 sm:line-clamp-5 items-center text-accent">
            {item.longDescription}
          </p>
        </div>

        {/* Stats and Controls */}
        <div className="col-span-3 md:col-start-2 col-span-2 flex flex-col justify-between h-full">
          <div className="flex justify-between items-center gap-fluid-xs mt-auto text-fluid-s">
            <ProductStats
              rating={item.rating}
              estimatedTimeMinutes={item.estimatedTimeMinutes}
              estimatedMaterialUseGrams={item.estimatedMaterialUseGrams}
            />
            <div
              className="flex gap-2 items-center"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <CartPageQuantityControls
                productId={item.id}
                quantity={item.quantity}
                onConfirmRemove={onRemoveRequest}
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
