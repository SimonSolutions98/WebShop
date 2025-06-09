import { useParams } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";

import useFetchProducts from "../hooks/useFetchProducts";
import { useCart } from "../context/useCart";

// import GoBackButton from "../components/Buttons/GoBackButton";
import ConfirmModal from "../components/inputs/YesNoPopUp";
import QuantityControls from "../components/inputs/QuantityControls";
import ProductStats from "../components/media/ProductStats";
import PriceTag from "../components/media/PriceTag";
import ImageCarousel from "../components/media/ImageCarousel";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, delay: 0.2, ease: "easeIn" } },
};

export default function DetailedProductPage() {
  const { slug } = useParams();
  const id = parseInt(slug.split("-").pop());
  const { products, loading, error } = useFetchProducts();

  const { cart, addToCart, removeFromCart } = useCart();
  const [showConfirm, setShowConfirm] = useState(false);
  const product = products.find((p) => p.id === id);
  const cartItem = cart.find((item) => item.id === id);

  if (loading) return <main className="p-8 text-center"></main>;
  if (error) return <main className="p-8 text-center text-red-500">{error}</main>;
  if (!product) return <main className="p-8 text-center">Product not found.</main>;

  const {
    name,
    images,
    shortDescription,
    longDescription,
    extendedDescription,
    price,
    currency,
    rating,
    estimatedTimeMinutes,
    estimatedMaterialUseGrams,
  } = product;

  return (
    <motion.main
      className="py-fluid-xs mx-auto text-accent font-secondary text-center px-fluid-s md:px-fluid-m"
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="bg-secondary p-[8px] rounded-lg grid grid-cols-1 lg:grid-cols-[repeat(2,_minmax(0,_40vw))] lg:justify-center items-start text-left lg:gap-fluid-m lg:bg-primary">
        
        {/* Left: Image - Sticky on Desktop */}
        <div className="w-full aspect-square mx-auto lg:sticky lg:top-60 lg:self-start">
          <ImageCarousel images={images} alt={name} className="w-full h-full" />
        </div>

        {/* Right: Info */}
        <div className="flex items-start justify-center w-full h-full">
          <div className="flex flex-col justify-start w-full p-fluid-s lg:p-0">
            <p className="text-fluid-m text-accent ">{shortDescription} {longDescription}</p>


            <div className="mb-4 mt-2 text-fluid-s">
              <ProductStats
                rating={rating}
                estimatedTimeMinutes={estimatedTimeMinutes}
                estimatedMaterialUseGrams={estimatedMaterialUseGrams}
              />
            </div>

            {!cartItem ? (
              <button
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
                <span><PriceTag value={price} currency={currency} /></span>
                <span>Add To Cart</span>
              </button>
            ) : (
              <QuantityControls
                productId={id}
                quantity={cartItem.quantity}
                onConfirmRemove={() => setShowConfirm(true)}
              />
            )}

            {/* Extended Description - Below cart controls */}
            {extendedDescription && (
              <div className="mt-4 text-fluid-s leading-relaxed">
                {extendedDescription}
              </div>
            )}
          </div>
        </div>
      </div>

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
    </motion.main>
  );
}
