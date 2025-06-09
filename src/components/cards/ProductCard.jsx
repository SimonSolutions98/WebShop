import { Link } from "react-router-dom";
import { useCart } from "../../context/useCart";
import { useState } from "react";

import generateSlug from "../../utilities/slugGenerator.js";
import ConfirmModal from "../inputs/YesNoPopUp.jsx";
import QuantityControls from "../inputs/QuantityControls.jsx";
import PriceTag from "../media/PriceTag.jsx";
import ProductImage from "../media/ProductImage.jsx";
import ProductStats from "../media/ProductStats.jsx";

export default function ProductCard({ product }) {
  const {
    id,
    name,
    images,
    shortDescription,
    price,
    currency,
    rating,
    estimatedTimeMinutes,
    estimatedMaterialUseGrams,
  } = product;

  const slug = generateSlug(name, id);
  const { cart, addToCart, removeFromCart } = useCart();
  const cartItem = cart.find((item) => item.id === id);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div
      className="
        font-primary text-center
        flex flex-col justify-between
        bg-secondary text-accent border border-highlight rounded-xl
        p-4 w-full max-w-full mx-auto
        transition-transform hover:-translate-y-1
      "
    >
      <Link to={`/product/${slug}`} className="block">
        <div className="w-full aspect-[10/10] overflow-hidden rounded-lg">
          <ProductImage images={images} alt={name} className="w-full h-full object-cover object-center"/>
        </div>

        <h3 className="font-primary text-fluid-l line-clamp-1">
          {name}
        </h3>

        <p className=" text-fluid-s text-accent line-clamp-2 min-h-[calc(1.5em*2)]">
          {shortDescription}
        </p>

        <div className="my-2 text-accent text-fluid-xs font-secondary ">
          <ProductStats
            rating={rating}
            estimatedTimeMinutes={estimatedTimeMinutes}
            estimatedMaterialUseGrams={estimatedMaterialUseGrams}
          />
        </div>

      </Link>



      {!cartItem ? (
            <div
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart(product);
              }}
              className="
                flex justify-evenly items-center
                bg-accent text-secondary border border-primary
                rounded-sm mt-auto cursor-pointer
                hover:bg-secondary hover:text-accent hover:border-accent transition
                font-primary text-fluid-m py-[2px]
                
              "
            >
              <span className="">
                <PriceTag value={price} currency={currency} />
              </span>
              <span className="">
                Add To Cart
              </span>
            </div>
      ) : (
        <QuantityControls
          productId={id}
          quantity={cartItem.quantity}
          onConfirmRemove={() => setShowConfirm(true)}
        />
      )}

      {showConfirm && (
        <ConfirmModal
          message={`Remove "${name}" from cart?`}
          onConfirm={() => {
            removeFromCart(id);
            setShowConfirm(false);
          }}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}
