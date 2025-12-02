import { useEffect, useState } from "react";
import { ProductWithUI } from "../../types";
import { initialProducts } from "../constants";

const useProducts = () => {
  const [products, setProducts] = useState<ProductWithUI[]>(() => {
    const saved = localStorage.getItem("products");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return initialProducts;
      }
    }
    return initialProducts;
  });

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  return { products, setProducts };
};

export default useProducts;
