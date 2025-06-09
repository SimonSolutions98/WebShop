import { Link } from "react-router-dom";

export default function LogoButton() {
  return (
    <Link to="/" className="flex items-center justify-center">
      <img
        src={`${import.meta.env.BASE_URL}logo.png`}
        alt="Simon Solutions Logo"
        className="main-logo-size transition ease duration-300 hover:[filter:drop-shadow(0_0_7px_rgba(255,217,0,0.65))] animate-[spin_14s_linear_infinite]"
      />
    </Link>
  );
}
