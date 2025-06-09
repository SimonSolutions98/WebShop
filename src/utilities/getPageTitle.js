export function getPageTitle(pathname, categorySlug, categories = []) {
  if (pathname === "/") return "SIMON SOLUTIONS";
  if (pathname === "/about") return "ABOUT US";
  if (pathname === "/contact") return "CONTACT";
  if (pathname === "/cart") return "YOUR CART";
  if (pathname === "/checkout") return "CHECKOUT";
  if (pathname === "/confirmation") return "CONFIRMATION";

  if (pathname.includes("/product/")) {
    const slug = pathname.split("/product/")[1];
    if (slug) {
      const parts = slug.split("-");
      if (parts.length > 1 && /^\d+$/.test(parts[parts.length - 1])) {
        parts.pop(); // remove numeric ID
      }
      const formatted = parts
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
        .toUpperCase(); // make all caps
      return formatted;
    }
    return "PRODUCT DETAILS";
  }

  if (pathname === "/products" && categorySlug) {
    const match = categories.find((c) => c.categoryTitle === categorySlug);
    return match ? match.categoryDisplayName.toUpperCase() : "";
  }

  if (pathname === "/products") return "ALL PRODUCTS";

  return "SIMON SOLUTIONS";
}
