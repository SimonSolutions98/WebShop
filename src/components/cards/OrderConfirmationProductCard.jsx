export default function OrderConfirmationProductCard({ item, currency }) {
  const formatPrice = (value) =>
    new Intl.NumberFormat(undefined, {
      style: "currency",
      currency,
    }).format(value);

  return (
    <div className="grid grid-cols-5 gap-fluid-xs items-center text-left rounded-lg p-2  border border-blend">
      {/* Image */}
      <div className="col-span-2 aspect-square w-full rounded overflow-hidden shrink-0">
        <img
          src={item.images[0]}
          alt={item.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            if (item.images[1]) e.target.src = item.images[1];
          }}
        />
      </div>

      {/* Title + Price */}
      <div className="col-span-3 flex flex-col justify-evenly pl-fluid-xs h-full">
        <div className="flex items-center justify-between gap-fluid-xs">
          <h3 className="text-fluid-l font-secondary">{item.name}</h3>

        </div>

        <p className="text-fluid-s sm:text-fluid-m line-clamp-3 sm:line-clamp-5 items-center text-accent">
          {item.longDescription}
        </p>
        <div className="grid grid-cols-3 text-fluid-m sm:text-fluid-l text-left">
          <span className="">
            {formatPrice(item.convertedPrice ?? item.price)}
          </span>
          <div className="">Qty: {item.quantity}</div>
         </div> 
      </div>
    </div>
  );
}
