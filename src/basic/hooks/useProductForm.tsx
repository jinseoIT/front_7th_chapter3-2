import { useCallback, useState } from "react";
import { ProductWithUI } from "../../types";

type ProductFormData = {
  name: string;
  price: number;
  stock: number;
  description: string;
  discounts: Array<{ quantity: number; rate: number }>;
};

type Props = {
  addProduct: (newProduct: Omit<ProductWithUI, "id">) => void;
  updateProduct: (productId: string, updates: Partial<ProductWithUI>) => void;
};

export const useProductForm = ({ addProduct, updateProduct }: Props) => {
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [productForm, setProductForm] = useState<ProductFormData>({
    name: "",
    price: 0,
    stock: 0,
    description: "",
    discounts: [],
  });

  const resetForm = useCallback(() => {
    setProductForm({
      name: "",
      price: 0,
      stock: 0,
      description: "",
      discounts: [],
    });
    setEditingProduct(null);
    setShowProductForm(false);
  }, []);

  const startEditProduct = useCallback((product: ProductWithUI) => {
    setEditingProduct(product.id);
    setProductForm({
      name: product.name,
      price: product.price,
      stock: product.stock,
      description: product.description || "",
      discounts: product.discounts || [],
    });
    setShowProductForm(true);
  }, []);

  const startAddProduct = useCallback(() => {
    setEditingProduct("new");
    resetForm();
    setShowProductForm(true);
  }, [resetForm]);

  const handleProductSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (editingProduct && editingProduct !== "new") {
        updateProduct(editingProduct, productForm);
      } else {
        addProduct({
          ...productForm,
          discounts: productForm.discounts,
        });
      }

      resetForm();
    },
    [editingProduct, productForm, addProduct, updateProduct, resetForm]
  );

  return {
    showProductForm,
    setShowProductForm,
    editingProduct,
    setEditingProduct,
    productForm,
    setProductForm,
    startEditProduct,
    startAddProduct,
    handleProductSubmit,
    resetForm,
  };
};
