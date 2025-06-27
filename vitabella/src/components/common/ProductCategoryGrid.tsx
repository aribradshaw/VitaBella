import React from "react";
import products from "@/app/product/products.json";
import VitaBellaButton from "@/components/common/VitaBellaButton";
import styles from "./ProductCategoryGrid.module.css";

interface ProductCategoryGridProps {
  category: string;
}

const ProductCategoryGrid: React.FC<ProductCategoryGridProps> = ({ category }) => {
  // Filter products by category (case-insensitive, partial match)
  const filtered = products.filter(
    (p) =>
      p["Product categories"] &&
      p["Product categories"].toLowerCase().split("|").map((c: string) => c.trim()).includes(category.toLowerCase()) &&
      p.Status === "Active"
  );

  if (!filtered.length) return null;

  return (
    <div className="container" style={{ margin: "var(--space-2x) 0" }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "var(--space-3x)",
        alignItems: "stretch"
      }}>
        {filtered.map((product) => (
          <div key={product.Slug} style={{
            background: "#fff",
            borderRadius: 24,
            boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "0 0 1.5rem 0",
            minHeight: 420,
            position: "relative"
          }}>
            <div style={{
              width: "100%",
              background: "var(--e-global-color-dark-green)",
              borderRadius: "24px 24px 0 0",
              padding: "1.2rem 0.5rem 0.7rem 0.5rem",
              textAlign: "center"
            }}>
              <div style={{ fontFamily: 'Tusker Grotesk, Arial, Helvetica, sans-serif', fontWeight: 700, fontSize: 28, color: '#fff', textTransform: 'uppercase', letterSpacing: 0 }}>{product.Title}</div>
              <div style={{ color: '#fff', fontWeight: 400, fontSize: 18, marginTop: 2, marginBottom: 2 }}>
                from <span style={{ fontWeight: 700 }}>${product.Price?.toFixed(2)}/mo.</span>{product.Price ? '*' : ''}
              </div>
            </div>
            <div style={{ width: "100%", minHeight: 180, background: "#f7f7f7", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 0 }}>
              <img
                src={product.imageF || product.imageM || product.imageBG}
                alt={product.Title}
                style={{ width: "80%", maxHeight: 180, objectFit: "contain", borderRadius: 0 }}
                loading="lazy"
              />
            </div>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 18 }}>
              <VitaBellaButton
                label="Get Started"
                href="/membership"
                bg="var(--e-global-color-dark-green)"
                bgHover="var(--e-global-color-lightgreen)"
                text="var(--e-global-color-lightgreen)"
                textHover="var(--e-global-color-dark-green)"
                arrowCircleColor="var(--e-global-color-lightgreen)"
                arrowCircleColorHover="var(--e-global-color-dark-green)"
                arrowPathColor="var(--e-global-color-dark-green)"
                arrowPathColorHover="var(--e-global-color-lightgreen)"
                style={{ minWidth: 0, width: 130, fontSize: '1rem', padding: '0.4rem 1.2rem' }}
              />
              <VitaBellaButton
                label="Learn More"
                href={`/product/${product.Slug}`}
                bg="#fff"
                bgHover="var(--e-global-color-lightgreen)"
                text="var(--e-global-color-dark-green)"
                textHover="var(--e-global-color-dark-green)"
                arrowCircleColor="var(--e-global-color-dark-green)"
                arrowCircleColorHover="var(--e-global-color-lightgreen)"
                arrowPathColor="var(--e-global-color-lightgreen)"
                arrowPathColorHover="var(--e-global-color-dark-green)"
                style={{ minWidth: 0, width: 130, fontSize: '1rem', padding: '0.4rem 1.2rem', border: '1.5px solid #e6f5e0', boxShadow: 'none' }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCategoryGrid;
