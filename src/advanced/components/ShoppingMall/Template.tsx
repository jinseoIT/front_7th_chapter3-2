import Cart from "./Cart";
import Products from "./Products";
import { useProductStore } from "../../store/productStore";
import { useCartStore } from "../../store/cartStore";
import { useCouponStore } from "../../store/couponStore";
import { useDebounce } from "../../hooks/useDebounce";
import { filterProducts } from "../../utils/productCalculations";

type Props = {
  searchTerm: string;
};

const ShoppingMallTemplate = ({ searchTerm }: Props) => {
  // Store에서 데이터 가져오기
  const products = useProductStore((state) => state.products);
  const cart = useCartStore((state) => state.cart);
  const coupons = useCouponStore((state) => state.coupons);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const filteredProducts = filterProducts(products, debouncedSearchTerm);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* 상품 목록 */}
      <Products
        products={products}
        filteredProducts={filteredProducts}
        debouncedSearchTerm={debouncedSearchTerm}
      />

      <Cart cart={cart} coupons={coupons} />
    </div>
  );
};

export default ShoppingMallTemplate;
