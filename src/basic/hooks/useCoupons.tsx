import { useEffect, useState } from "react";
import { Coupon } from "../../types";
import { initialCoupons } from "../constants";

type Props = {
  addNotification: (message: string, type?: "error" | "success" | "warning") => void;
};

const useCoupons = ({ addNotification }: Props) => {
  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem("coupons");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return initialCoupons;
      }
    }
    return initialCoupons;
  });
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  useEffect(() => {
    localStorage.setItem("coupons", JSON.stringify(coupons));
  }, [coupons]);

  return {
    coupons,
    selectedCoupon,
    setCoupons,
    setSelectedCoupon,
  };
};

export default useCoupons;
