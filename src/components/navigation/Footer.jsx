import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useLocation } from "react-router-dom";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0,
      staggerChildren: 0.1,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.1,
      staggerDirection: 1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export default function Footer() {
  const links = [
    {
      href: "https://sikrdesign.com/",
      title: "SIKR Design",
      image: "/sikrLogo.png",
      description: "Elegant accessories for bath & boat",
    },
    {
      href: "https://sikr98.github.io/CV-Website/",
      title: "Simon Kraft",
      image: "/cvLogo.png",
      description: "Portfolio & professional background",
    },
    {
      href: "https://www.instagram.com/Kraft.CreativeDesign/",
      title: "Instagram",
      image: "/instaLogo.png",
      description: "Follow our latest updates and designs",
    },
  ];

  const topTriggerRef = useRef(null);
  const bottomTriggerRef = useRef(null);
  const footerRef = useRef(null);

  const topInView = useInView(topTriggerRef, { amount: 1.0 });
  const bottomInView = useInView(bottomTriggerRef, { amount: 0.1 });
  const bottomOutOfView = !bottomInView;

  const [isCooldown, setIsCooldown] = useState(false);
  const location = useLocation();

  const scrollUpByFooterHeight = () => {
    if (footerRef.current) {
      const height = footerRef.current.offsetHeight;
      window?.lenis?.scrollTo(window.scrollY - height);
    }
  };

  useEffect(() => {
    if (topInView && !bottomInView && !isCooldown) {
      window?.lenis?.scrollTo("bottom");
    }
  }, [topInView, bottomInView, isCooldown]);

  useEffect(() => {
    if (bottomOutOfView) {
      scrollUpByFooterHeight();
      setIsCooldown(true);
      setTimeout(() => setIsCooldown(false), 800);
    }
  }, [bottomOutOfView]);

useEffect(() => {
  if (!footerRef.current || !window?.lenis) return;

  const height = footerRef.current.offsetHeight;

  // First: smooth scroll up by footer height
  window.lenis.scrollTo(window.scrollY - height);

  // Then: after short delay, jump to top (invisible to user)
  const timeout = setTimeout(() => {
    window.lenis.scrollTo(0, { immediate: true });
  }, 600); // adjust timing as needed

  // Cooldown logic (optional)
  setIsCooldown(true);
  const cooldownReset = setTimeout(() => setIsCooldown(false), 1000);

  return () => {
    clearTimeout(timeout);
    clearTimeout(cooldownReset);
  };
}, [location.pathname]);

  return (
    <footer
      ref={footerRef}
      className="w-full h-[24vh] max-h-[160px] max-w-[1500px] flex flex-col items-center justify-between text-fluid-s px-fluid-m text-accent font-secondary text-center mx-auto md:px-fluid-xl relative lg:max-w-[1100px] xl:max-w-[1500px]"
    >
      <div ref={topTriggerRef} className="h-[2px] w-full absolute top-10" />

      <AnimatePresence mode="wait">
        {bottomInView && (
          <motion.div
            key="footer-links"
            className="w-full grid grid-cols-3 max-h-[150px]"
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            {links.map(({ href, title, image, description }) => (
              <motion.div
                key={title}
                variants={cardVariants}
                className="flex justify-center transition-transform duration-200 hover:-translate-y-[2px]"
              >
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="max-w-[28vw] flex flex-col items-center justify-center rounded-fluid-s text-accent"
                >
                  <img
                    src={image}
                    alt={title}
                    className="footer-logo-size aspect-square object-contain mb-2"
                  />
                  <h3 className="font-primary text-fluid-s">{title}</h3>
                  <p className="text-fluid-xs text-center line-clamp-2 max-w-[28vw]">
                    {description}
                  </p>
                </a>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div ref={bottomTriggerRef} className="h-[10px] w-full absolute bottom-2" />
    </footer>
  );
}