// src/commponents/hooks/useRefresh.js
import { useState, useCallback } from "react";

const UseRefresh = () => {
  const [ReFreshProducts, setReFreshProducts] = useState(0);

  const ReFreshProductsRender = useCallback(() => {
    setReFreshProducts(prev => prev + 1);
  }, [ReFreshProducts]); // [] — sahi hai, prev use kar rahe hain

  return { ReFreshProducts, ReFreshProductsRender };
};

export default UseRefresh;