import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, y: 20, transition: { duration: 0.3, delay: 0.2, ease: "easeIn" } },
};

export default function AboutPage() {
  return (
    <section className="mx-auto text-accent font-secondary px-fluid-s max-w-[1300px] md:px-fluid-l">
      <motion.div
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: true }}
        variants={fadeIn}
        className="mx-auto"
      >
        <p className="text-fluid-m leading-relaxed pt-fluid-s">
          At Simon Solutions, design meets purpose — and every detail matters. Born from a passion for creating intentional, elegant, and one-of-a-kind products, Simon Solutions is a design studio dedicated to precision-crafted objects and custom solutions. Whether physical or digital, everything we create is guided by a deep appreciation for aesthetics, craftsmanship, and meaningful functionality.
        </p>

        <p className="text-fluid-m leading-relaxed pt-fluid-m">
          What began as a pursuit of timeless, well-made objects evolved into a broader exploration of how design shapes the way we live, gift, and interact with our surroundings. This journey builds on the foundation I established with{" "}
          <a
            href="https://sikrdesign.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="link-glint hover:text-blend transition"
          >
            SIKR Design
          </a>
          , which focuses on bath and boat luxury accessories, and now expands into new creative territory.
        </p>

        <p className="text-fluid-m leading-relaxed pt-fluid-m">
          We offer sleek and practical 3D files designed for home, work, and hobby use — ready for download, printing, and personalization. We also craft custom packaging, from engraved wine glass box sets to specialty gift enclosures, to elevate the unboxing experience. Our laser engraving and cutting services use wood, acrylic, and brass to produce premium, personalized pieces. Additionally, we create 3D-printed parts that are both decorative and functional — from kitchen accessories to niche fixtures.
        </p>

        <p className="text-fluid-m leading-relaxed pt-fluid-m">
          Every product and file is made with intention and backed by years of experience in industrial design, CAD/CAM production, and full-cycle manufacturing. If you're curious about my broader background or design philosophy, visit my{" "}
          <a
            href="https://sikr98.github.io/CV-Website/"
            target="_blank"
            rel="noopener noreferrer"
            className="link-glint link-glint-delay hover:text-blend transition"
          >
            Personal site
          </a>
          . Whether you're enhancing your space, elevating your brand, or searching for a one-of-a-kind gift — we're here to turn ideas into tangible, timeless design. Simon Solutions reflects a belief that great design is a solution: not just something to look at, but something to use, experience, and enjoy.
        </p>
      </motion.div>
    </section>
  );
}