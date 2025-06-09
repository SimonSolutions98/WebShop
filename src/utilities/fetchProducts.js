const PRODUCT_API_URL = "https://681c7902f74de1d219ac8779.mockapi.io/api/v1/products";

export default async function fetchProducts() {
  try {
    const response = await fetch(PRODUCT_API_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Product fetch error:", error);
    return [];
  }
}
