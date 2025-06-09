import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import useFetchProducts from "../hooks/useFetchProducts.js";
import ProductCard from "../components/cards/ProductCard.jsx";

// Container for stagger effect
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0,
      staggerChildren: 0.08,
    },
  },
  exit: {
    transition: {
      delayChildren: 0,
      staggerChildren: 0.05,
      staggerDirection: 1,
    },
  },
};

// Each product card
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

export default function ProductPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categorySlug = searchParams.get("category");

  const { products, loading, error } = useFetchProducts();

  const filteredProducts = categorySlug
    ? products.filter((product) => product.mainCategory === categorySlug)
    : products;

  if (loading) {
    return <div className="text-center mt-10"></div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">Error loading products.</div>;
  }

  if (filteredProducts.length === 0) {
    return <div className="text-center mt-10">No products found for this category.</div>;
  }

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 [@media(min-width:1400px)]:grid-cols-4 gap-fluid-s max-w-[80vw] mx-auto mt-fluid-xs pb-fluid-m [@media(min-width:330px)]:pb-0 2xl:mb-fluid-l"
      variants={containerVariants}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      {filteredProducts.map((product) => (
        <motion.div key={product.id} variants={cardVariants}>
          <ProductCard product={product} />
        </motion.div>
      ))}
    </motion.div>
  );
}
