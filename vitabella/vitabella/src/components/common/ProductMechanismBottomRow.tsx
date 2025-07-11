
import React from "react";
import VitaBellaButton from '@/components/common/VitaBellaButton';
import styles from './ProductMechanism.module.css';

interface ProductMechanismBottomRowProps {
  product: {
    Title: string;
    benefit1?: string;
    benefit2?: string;
    benefit3?: string;
    doctor?: string;
    frequency?: string;
    application?: string;
    dosage?: string;
  };
}

const ProductMechanismBottomRow: React.FC<ProductMechanismBottomRowProps> = ({ product }) => {
  return (
    <>
      <div className={styles.productMechanismRow}>
        {/* Bottom Left */}
        <div className={styles.leftCol}>
          <div style={{ fontSize: 56, fontWeight: 700, color: 'var(--e-global-color-green)', lineHeight: 1, marginBottom: 8, textAlign: 'left' }}>60%</div>
          <div className="h4" style={{ fontFamily: 'Switzer, Arial, Helvetica, sans-serif', fontWeight: 400, color: 'var(--e-global-color-white)', marginBottom: 8, textTransform: 'none', textAlign: 'left' }}>more affordable than our competitors.</div>
          <div className="body-text" style={{ color: 'var(--e-global-color-white)', marginBottom: 16, textAlign: 'left' }}>Select the membership plan that suits your goals and lifestyle, and book your initial consultation.</div>
          <VitaBellaButton
            href="/membership"
            label="Start Today"
            bg="var(--e-global-color-white)"
            bgHover="var(--e-global-color-lightgreen)"
            text="var(--e-global-color-dark-green)"
            textHover="var(--e-global-color-dark-green)"
            arrowCircleColor="var(--e-global-color-dark-green)"
            arrowCircleColorHover="var(--e-global-color-dark-green)"
            arrowPathColor="var(--e-global-color-lightgreen)"
            arrowPathColorHover="var(--e-global-color-lightgreen)"
            className="start-today-btn"
            style={{ width: 'fit-content', minWidth: 0, maxWidth: '100%', display: 'inline-flex' }}
          />
        </div>
        {/* Bottom Right: Table */}
        <div className={styles.rightCol}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', color: 'var(--e-global-color-white)', borderCollapse: 'collapse', fontSize: 16 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.18)' }}>
                  <th style={{ textAlign: 'left', padding: '6px 8px', fontWeight: 700, color: 'var(--e-global-color-green)', whiteSpace: 'nowrap' }}>
                    <span className="h6" style={{ color: 'var(--e-global-color-green)', fontWeight: 700, marginBottom: 0 }}>NAD+</span>
                  </th>
                  <th style={{ textAlign: 'center', padding: '6px 8px', fontWeight: 700, color: 'var(--e-global-color-white)' }}>Med / IV Clinics</th>
                  <th style={{ textAlign: 'center', padding: '6px 8px', fontWeight: 700, color: 'var(--e-global-color-white)' }}>
                    {/* Use VitaBellaLogo component for logo only */}
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 0, justifyContent: 'center', width: '100%' }}>
                      {/* @ts-ignore */}
                      {require('./VitaBellaLogo').default({ style: { height: 22, width: 'auto', display: 'block', color: '#fff', margin: 0 } })}
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ background: 'rgba(0,0,0,0.10)' }}>
                  <td style={{ padding: '6px 8px' }}>25mg injection</td>
                  <td style={{ textAlign: 'center', padding: '6px 8px' }}>$59 per shot</td>
                  <td style={{ textAlign: 'center', padding: '6px 8px' }}>$7 per shot*</td>
                </tr>
                <tr>
                  <td style={{ padding: '6px 8px' }}>1000mg (40 treatments)</td>
                  <td style={{ textAlign: 'center', padding: '6px 8px' }}>$2,360</td>
                  <td style={{ textAlign: 'center', padding: '6px 8px' }}>$249 (supplies included)**</td>
                </tr>
                <tr style={{ background: 'rgba(0,0,0,0.10)' }}>
                  <td style={{ padding: '6px 8px' }}>Private At-Home Use</td>
                  <td style={{ textAlign: 'center', padding: '6px 8px' }}>No</td>
                  <td style={{ textAlign: 'center', padding: '6px 8px' }}>Yes</td>
                </tr>
                <tr>
                  <td style={{ padding: '6px 8px' }}>US FDA-Inspected Pharmacy</td>
                  <td style={{ textAlign: 'center', padding: '6px 8px' }}>No</td>
                  <td style={{ textAlign: 'center', padding: '6px 8px' }}>Yes</td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* Asterisks: always under the table, inside rightCol */}
          <div className={styles.asteriskRow}>
            <div className={styles.asteriskText}>
              *with Membership<br />
              **1000mg vial (40 × 25mg injections)
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductMechanismBottomRow;
