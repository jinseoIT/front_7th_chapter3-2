import { useState } from "react";
import Header from "./components/Header";
import ShoppingMallTemplate from "./components/ShoppingMall/Template";
import AdminTemplate from "./components/Admin/Template";
import Noti from "./components/Notification";
import { useCartStore } from "./store/cartStore";

const App = () => {
  const totalItemCount = useCartStore((state) => state.totalItemCount);

  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState<"products" | "coupons">("products");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-hx-screen bg-gray-50">
      <Noti />
      <Header
        isAdmin={isAdmin}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setIsAdmin={setIsAdmin}
        totalItemCount={totalItemCount}
      />
      <main className="max-w-7xl mx-auto px-4 py-8">
        {isAdmin ? (
          <AdminTemplate activeTab={activeTab} setActiveTab={setActiveTab} />
        ) : (
          <ShoppingMallTemplate searchTerm={searchTerm} />
        )}
      </main>
    </div>
  );
};

export default App;
