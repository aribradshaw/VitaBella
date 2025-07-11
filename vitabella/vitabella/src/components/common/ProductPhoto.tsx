'use client';

import React, { useEffect, useState } from "react";
import styles from "@/app/b12/b12.module.css";

interface ProductPhotoProps {
  product: string;
  style?: React.CSSProperties;
}

const ProductPhoto: React.FC<ProductPhotoProps> = ({ product, style }) => {
  const [prod, setProd] = useState<any>(null);

  useEffect(() => {
    let mounted = true;
    import("@/app/product/products.json")
      .then((mod) => {
        const productsRaw = mod.default || mod;
        const found = productsRaw.find(
          (p: any) =>
            (p.Slug && p.Slug.toLowerCase() === product.toLowerCase()) ||
            (p.Title && p.Title.toLowerCase() === product.toLowerCase())
        );
        if (mounted) setProd(found);
      })
      .catch(() => setProd(null));
    return () => {
      mounted = false;
    };
  }, [product]);

  if (!prod || !prod.imageBG) return null;
  return (
    <img
      src={prod.imageBG.replace("/public", "")}
      alt={prod.Title}
      className={styles.b12IntroImage}
      loading="lazy"
      style={{
        objectFit: "cover",
        maxWidth: 340,
        minWidth: 180,
        height: 420,
        minHeight: 320,
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 2px 12px rgba(44,60,50,0.07)",
        ...style,
      }}
    />
  );
};

export default ProductPhoto;
