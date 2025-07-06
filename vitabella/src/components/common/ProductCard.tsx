'use client';

import React, { useEffect, useState } from "react";
import styles from "@/app/b12/b12.module.css";
import VitaBellaButton from "@/components/common/VitaBellaButton";

interface ProductCardProps {
  product: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
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

  if (!prod) return null;
  return (
    <div
      className={styles.b12ProductBox}
      itemScope
      itemType="https://schema.org/Product"
      style={{ padding: "var(--space-2x)", maxWidth: 420, width: "100%" }}
    >
      <meta itemProp="name" content={prod.Title} />
      <meta itemProp="description" content={prod["Short Description"]} />
      <meta itemProp="image" content={prod.imageBG?.replace("/public", "")} />
      <div
        className={styles.b12ProductImage}
        style={{
          width: "100%",
          height: 320,
          padding: 0,
          background: "#fff",
          borderRadius: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          marginBottom: "0rem",
        }}
      >
        <img
          src={prod.imageBG?.replace("/public", "")}
          alt={prod.Title}
          className={styles.b12HeroImage}
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
            background: "#fff",
            borderRadius: 16,
            boxShadow: "0 2px 16px rgba(44,60,50,0.07)",
            display: "block",
          }}
          loading="lazy"
          itemProp="image"
        />
      </div>
      <div className={styles.b12ProductDetails}>
        <h2 className={styles.b12ProductTitle} itemProp="name">
          {prod.Title}
        </h2>
        <p
          className={styles.b12ProductDesc}
          itemProp="description"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            // Remove minHeight/maxHeight to avoid cutting off desc
          }}
        >
          {prod["Short Description"]}
        </p>
        <ul className={styles.b12ProductList}>
          <li>
            <strong>Price:</strong>{" "}
            <span itemProp="offers" itemScope itemType="https://schema.org/Offer">
              from <span itemProp="priceCurrency" content="USD">$</span>
              <span itemProp="price">{prod.Price}</span>/mo.
            </span>
          </li>
          <li>
            <strong>Application:</strong> {prod.application}
          </li>
          <li>
            <strong>Dosage:</strong> {prod.dosage}
          </li>
          <li>
            <strong>Frequency:</strong> {prod.frequency}
          </li>
        </ul>
        <VitaBellaButton
          href={`/product/${prod.Slug}`}
          label="View Treatment Details"
          bg="var(--e-global-color-dark-green)"
          bgHover="var(--e-global-color-green)"
          text="var(--e-global-color-white)"
          textHover="var(--e-global-color-dark-green)"
          arrowCircleColor="var(--e-global-color-lightgreen)"
          arrowCircleColorHover="var(--e-global-color-dark-green)"
          arrowPathColor="var(--e-global-color-dark-green)"
          arrowPathColorHover="var(--e-global-color-green)"
          className={styles.b12ProductBtn}
          style={{ marginTop: "1.2rem", width: "calc(100% - var(--space-2x))" }}
          itemProp="url"
        />
      </div>
    </div>
  );
};

export default ProductCard;