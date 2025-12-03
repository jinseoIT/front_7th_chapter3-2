import { useCallback, useState } from "react";
import { Coupon } from "../../types";

type CouponFormData = {
  name: string;
  code: string;
  discountType: "amount" | "percentage";
  discountValue: number;
};

type Props = {
  addCoupon: (newCoupon: Coupon) => void;
};

export const useCouponForm = ({ addCoupon }: Props) => {
  const [showCouponForm, setShowCouponForm] = useState(false);
  const [couponForm, setCouponForm] = useState<CouponFormData>({
    name: "",
    code: "",
    discountType: "amount",
    discountValue: 0,
  });

  const resetForm = useCallback(() => {
    setCouponForm({
      name: "",
      code: "",
      discountType: "amount",
      discountValue: 0,
    });
    setShowCouponForm(false);
  }, []);

  const startAddCoupon = useCallback(() => {
    resetForm();
    setShowCouponForm(true);
  }, [resetForm]);

  const handleCouponSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      addCoupon(couponForm);
      resetForm();
    },
    [couponForm, addCoupon, resetForm]
  );

  return {
    showCouponForm,
    setShowCouponForm,
    couponForm,
    setCouponForm,
    startAddCoupon,
    handleCouponSubmit,
    resetForm,
  };
};
