// /components/inputs/CheckoutFormFields.jsx
export default function CheckoutForm({ formData, handleChange }) {
  return (
    <div className="grid gap-fluid-xs">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">First Name</label>
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            spellCheck="false"
            className="w-full border border-blend px-3 py-2 rounded bg-secondary"
          />
        </div>
        <div>
          <label className="block mb-1">Last Name</label>
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            spellCheck="false"
            className="w-full border border-blend px-3 py-2 rounded bg-secondary"
          />
        </div>
      </div>

      <div>
        <label className="block mb-1">Email</label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          spellCheck="false"
          className="w-full border border-blend px-3 py-2 rounded bg-secondary"
        />
      </div>

      <div>
        <label className="block mb-1">Shipping Address</label>
        <input
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          spellCheck="false"
          className="w-full border border-blend px-3 py-2 rounded bg-secondary"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">Country</label>
          <input
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
            spellCheck="false"
            className="w-full border border-blend px-3 py-2 rounded bg-secondary"
          />
        </div>
        <div>
          <label className="block mb-1">Zip Code</label>
          <input
            name="zip"
            value={formData.zip}
            onChange={handleChange}
            required
            spellCheck="false"
            className="w-full border border-blend px-3 py-2 rounded bg-secondary"
          />
        </div>
      </div>
    </div>
  );
}
