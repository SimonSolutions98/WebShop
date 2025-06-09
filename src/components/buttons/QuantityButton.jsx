export default function QuantityButton({ label, onClick }) {
  return (
    <button type="button" onClick={onClick} className="quantity-button">
      {label}
    </button>
  );
}
