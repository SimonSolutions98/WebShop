import { useEffect, useState } from "react";
import { fetchCategories } from "../utilities/fetchCategories.js";

export default function useFetchCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, []);

  return { categories, loading, error };
}