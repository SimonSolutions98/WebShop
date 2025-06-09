import { motion } from "framer-motion";
import useFetchCategories from "../hooks/useFetchCategories.js";
import CategoryCard from "../components/cards/CategoryCard.jsx";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0,     // wait a bit after page fade-in
      staggerChildren: 0.08,   // stagger entry
    },
  },
  exit: {
    transition: {
      delayChildren: 0,
      staggerChildren: 0.08,
      staggerDirection: 1,   // reverse on exit
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

export default function HomePage() {
  const { categories, loading, error } = useFetchCategories();

  if (loading) {
    return <div className="text-center mt-10"></div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">Error: {error}</div>;
  }

  return (
    <motion.div
      className="grid grid-cols-2 lg:grid-cols-4 gap-fluid-m"
      variants={containerVariants}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      {categories.map((category) => (
        <motion.div key={category.id} variants={cardVariants}>
          <CategoryCard
            slug={category.categoryTitle}
            imageUrl={category.image}
            fallbackUrl={category.imageBackup}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
