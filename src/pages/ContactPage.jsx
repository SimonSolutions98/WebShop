import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import ReCAPTCHA from "react-google-recaptcha";

const SERVICE_ID = "service_fo2qef9";
const TEMPLATE_ID = "template_b2sp50b";
const PUBLIC_KEY_RECAPTCHA = "6LdiE1grAAAAAKDw92_AeHiH5zN9a7XG1rqcO2VO";
const PUBLIC_KEY_EMAILJS = "qMVKlZyKP50EHzWXj";

export default function ContactPage() {
  const [formData, setFormData] = useState(() => {
    const saved = sessionStorage.getItem("contactForm");
    return saved
      ? JSON.parse(saved)
      : { name: "", email: "", subject: "", message: "" };
  });

  const [captchaToken, setCaptchaToken] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const recaptchaRef = useRef();

  useEffect(() => {
    sessionStorage.setItem("contactForm", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleCaptchaChange = (token) => setCaptchaToken(token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    setLoading(true);

    if (!captchaToken) {
      setStatus("❌ Please complete the reCAPTCHA.");
      setLoading(false);
      return;
    }

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          ...formData,
          "g-recaptcha-response": captchaToken,
        },
        PUBLIC_KEY_EMAILJS
      );

      setStatus("✅ Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
      sessionStorage.removeItem("contactForm");
      setCaptchaToken(null);

      // Reset the reCAPTCHA widget
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
    } catch (error) {
      console.error(error);
      setStatus("❌ Failed to send message. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.main
      className="max-w-[1000px] mx-auto p-fluid-s pb-fluid-xl text-accent font-secondary md:mb-fluid-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-fluid-l text-center pb-fluid-s">
        We'd love to hear from you! Fill out the form and we'll get back to you shortly.
      </p>

      <form onSubmit={handleSubmit} className="space-y-fluid-s">
        <div className="grid md:grid-cols-2 gap-fluid-m w-full">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            spellCheck="false"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-secondary text-accent border border-blend rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            spellCheck="false"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-secondary text-accent border border-blend rounded"
          />
        </div>

        <input
          type="text"
          name="subject"
          placeholder="Subject"
          required
          spellCheck="false"
          value={formData.subject}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-secondary text-accent border border-blend rounded"
        />

        <textarea
          name="message"
          placeholder="Your Message"
          rows="5"
          required
          spellCheck="false"
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-secondary text-accent border border-blend rounded"
        ></textarea>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-accent text-primary py-2 px-6 rounded transition-transform duration-200 hover:-translate-y-[2px] cursor-pointer"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>

        {/* Centered reCAPTCHA */}
        <div className="flex flex-col items-center justify-center pt-fluid-xs md:pb-fluid-xl md:mb-fluid-xl">
          <ReCAPTCHA
            sitekey={PUBLIC_KEY_RECAPTCHA}
            onChange={handleCaptchaChange}
            ref={recaptchaRef}
          />
          {status && (
            <p className="mt-fluid-l text-center text-fluid-s italic">{status}</p>
          )}
        </div>

      </form>

      
    </motion.main>
  );
}
