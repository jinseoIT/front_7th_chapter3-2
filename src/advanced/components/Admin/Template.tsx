import { formatPrice } from "../../utils/formatters";
import ProductManagement from "./ProductManagement";
import CouponManagement from "./CouponManagement";
import AdminTabBar from "./AdminTabBar";
import { useProductForm } from "../../hooks/useProductForm";
import { useCouponForm } from "../../hooks/useCouponForm";
import { useProductStore } from "../../store/productStore";
import { useCouponStore } from "../../store/couponStore";
import { useCartStore } from "../../store/cartStore";

type Props = {
  activeTab: "products" | "coupons";
  setActiveTab: React.Dispatch<React.SetStateAction<"products" | "coupons">>;
};

const Template = ({ activeTab, setActiveTab }: Props) => {
  // Store에서 데이터 가져오기
  const products = useProductStore((state) => state.products);
  const addProduct = useProductStore((state) => state.addProduct);
  const updateProduct = useProductStore((state) => state.updateProduct);
  const deleteProduct = useProductStore((state) => state.deleteProduct);

  const coupons = useCouponStore((state) => state.coupons);
  const addCoupon = useCouponStore((state) => state.addCoupon);
  const deleteCoupon = useCouponStore((state) => state.deleteCoupon);

  const getRemainingStock = useCartStore((state) => state.getRemainingStock);

  const {
    showProductForm,
    setShowProductForm,
    editingProduct,
    setEditingProduct,
    productForm,
    setProductForm,
    startEditProduct,
    startAddProduct,
    handleProductSubmit,
    handlePriceChange,
    handlePriceBlur,
    handleStockChange,
    handleStockBlur,
  } = useProductForm({ addProduct, updateProduct });

  const {
    showCouponForm,
    setShowCouponForm,
    couponForm,
    setCouponForm,
    handleCouponSubmit,
    handleDiscountValueChange,
    handleDiscountValueBlur,
  } = useCouponForm({
    addCoupon,
  });

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">관리자 대시보드</h1>
        <p className="text-gray-600 mt-1">상품과 쿠폰을 관리할 수 있습니다</p>
      </div>

      <AdminTabBar activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "products" ? (
        <ProductManagement
          products={products}
          activeTab={activeTab}
          formatPrice={formatPrice}
          getRemainingStock={getRemainingStock}
          startEditProduct={startEditProduct}
          startAddProduct={startAddProduct}
          deleteProduct={deleteProduct}
          showProductForm={showProductForm}
          setShowProductForm={setShowProductForm}
          handleProductSubmit={handleProductSubmit}
          productForm={productForm}
          setProductForm={setProductForm}
          editingProduct={editingProduct}
          setEditingProduct={setEditingProduct}
          handlePriceChange={handlePriceChange}
          handlePriceBlur={handlePriceBlur}
          handleStockChange={handleStockChange}
          handleStockBlur={handleStockBlur}
        />
      ) : (
        <CouponManagement
          coupons={coupons}
          deleteCoupon={deleteCoupon}
          showCouponForm={showCouponForm}
          setShowCouponForm={setShowCouponForm}
          handleCouponSubmit={handleCouponSubmit}
          couponForm={couponForm}
          setCouponForm={setCouponForm}
          handleDiscountValueChange={handleDiscountValueChange}
          handleDiscountValueBlur={handleDiscountValueBlur}
        />
      )}
    </div>
  );
};

export default Template;
