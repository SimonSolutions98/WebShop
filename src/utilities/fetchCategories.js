const CATEGORY_API_URL = 'https://681c7902f74de1d219ac8779.mockapi.io/api/v1/categories';

export async function fetchCategories() {
  try {
    const response = await fetch(CATEGORY_API_URL);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return await response.json();
  } catch (error) {
    console.error('Category fetch error:', error);
    return [];
  }
}