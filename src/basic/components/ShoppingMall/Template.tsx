import { CartItem, Product } from "../../../types";
import Cart from "./Cart";
import Products from "./Products";

type Props = {
  products: any[];
  cart: any[];
  coupons: any[];
  filteredProducts: any[];
  debouncedSearchTerm: string;
  getRemainingStock: (product: any) => number;
  addToCart: (product: any) => void;
  calculateItemTotal: (product: any) => number;
  removeFromCart: (productId: string) => void;
  updateQuantity: (products: Product[], productId: string, quantity: number) => void;
  selectedCoupon: any;
  applyCoupon: (coupon: any, cartTotal: number) => void;
  setSelectedCoupon: (coupon: any) => void;
  totals: {
    totalBeforeDiscount: number;
    totalAfterDiscount: number;
  };
  addNotification: (message: string) => void;
  completeOrder: (onSuccess?: () => void) => void;
};

const ShoppingMallTemplate = ({
  products,
  cart,
  coupons,
  filteredProducts,
  debouncedSearchTerm,
  getRemainingStock,
  addToCart,
  calculateItemTotal,
  removeFromCart,
  updateQuantity,
  selectedCoupon,
  applyCoupon,
  setSelectedCoupon,
  totals,
  addNotification,
  completeOrder,
}: Props) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* 상품 목록 */}
      <Products
        products={products}
        filteredProducts={filteredProducts}
        debouncedSearchTerm={debouncedSearchTerm}
        getRemainingStock={getRemainingStock}
        addToCart={addToCart}
      />

      <Cart
        products={products}
        cart={cart}
        coupons={coupons}
        selectedCoupon={selectedCoupon}
        totals={totals}
        applyCoupon={applyCoupon}
        setSelectedCoupon={setSelectedCoupon}
        calculateItemTotal={calculateItemTotal}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
        addNotification={addNotification}
        completeOrder={completeOrder}
      />
    </div>
  );
};

export default ShoppingMallTemplate;
