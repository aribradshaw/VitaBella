import React from "react";
import VitaBellaButton from '@/components/common/VitaBellaButton';
import { FiCalendar } from 'react-icons/fi';
import { PiPill } from 'react-icons/pi';
import { FaAsterisk } from 'react-icons/fa';
import styles from './ProductMechanism.module.css';


interface ProductMechanismModuleProps {
  product: {
    Title: string;
    mechanism?: string;
    ingredients?: string;
    benefits?: string;
    benefit1?: string;
    benefit2?: string;
    benefit3?: string;
    doctor?: string;
    frequency?: string;
    application?: string;
    dosage?: string;
  };
}

const divider = <div className="divider" style={{ background: 'var(--e-global-color-white)', opacity: 0.18, width: 100, margin: 'var(--space-1x) 0' }} />;
const dividerFull = <div style={{ width: '100%', height: 1, background: 'var(--e-global-color-white)', opacity: 0.18, margin: '18px 0' }} />;

const check = <span style={{ color: 'var(--e-global-color-green)', fontWeight: 700, fontSize: 20, marginRight: 8 }}>✔</span>;

const ProductMechanismModule: React.FC<ProductMechanismModuleProps> = ({ product }) => {
  const iconMap = [
    <FiCalendar key="calendar" style={{ marginRight: 8, fontSize: 18, verticalAlign: 'middle' }} />,
    <PiPill key="pill" style={{ marginRight: 8, fontSize: 18, verticalAlign: 'middle' }} />,
    <FaAsterisk key="asterisk" style={{ marginRight: 8, fontSize: 16, verticalAlign: 'middle' }} />,
  ];

  // <-- Add missing return statement
  return (
    <section style={{ width: '100vw', position: 'relative', left: '50%', right: '50%', marginLeft: '-50vw', marginRight: '-50vw', background: 'var(--e-global-color-dark-green)', color: 'var(--e-global-color-white)', padding: 'var(--space-4x) 0', border: 'none', borderRadius: 32 }}>
      <div className="container" style={{ maxWidth: 1340, margin: '0 auto', padding: 'var(--space-3x) 0', display: 'flex', flexDirection: 'column', gap: 'var(--space-3x)', color: 'var(--e-global-color-white)' }}>
        {/* Top Row - No Wrap */}
        <div className={styles.productMechanismRow} style={{ flexWrap: 'nowrap' }}>
          {/* Left */}
          <div className={styles.leftCol}>
            <h2 className="h2-alt" style={{ color: 'var(--e-global-color-white)', marginBottom: 8, fontWeight: 400, marginTop: 0 }}>
              <span style={{ fontWeight: 400 }}>The mechanism of</span><br />
              <span style={{ fontWeight: 600 }}>{product.Title}</span>
            </h2>
            <div className="body-text" style={{ marginBottom: 10, color: 'var(--e-global-color-white)' }}>{product.mechanism}</div>
            {dividerFull}
            <div className="h6 font-tusker" style={{ color: 'var(--e-global-color-green)', marginBottom: 4, fontFamily: 'Tusker Grotesk, Arial, Helvetica, sans-serif', fontWeight: 600, letterSpacing: 0 }}>INGREDIENTS</div>
            <div className="body-text" style={{ marginBottom: 8, color: 'var(--e-global-color-white)' }}>{product.ingredients}</div>
            {dividerFull}
            <div className="h6 font-tusker" style={{ color: 'var(--e-global-color-green)', marginBottom: 4, fontFamily: 'Tusker Grotesk, Arial, Helvetica, sans-serif', fontWeight: 600, letterSpacing: 0 }}>BENEFITS</div>
            <div className="body-text" style={{ marginBottom: 10, color: 'var(--e-global-color-white)' }}>{product.benefits}</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {product.benefit1 && <li style={{ marginBottom: 6 }}>{check}<span style={{ color: 'var(--e-global-color-white)' }}>{product.benefit1}</span></li>}
              {product.benefit2 && <li style={{ marginBottom: 6 }}>{check}<span style={{ color: 'var(--e-global-color-white)' }}>{product.benefit2}</span></li>}
              {product.benefit3 && <li style={{ marginBottom: 6 }}>{check}<span style={{ color: 'var(--e-global-color-white)' }}>{product.benefit3}</span></li>}
            </ul>
          </div>
          {/* Right - Nutrition Label Style */}
          <div className={styles.rightCol} style={{ background: '#fff', border: '2px solid #333', borderRadius: 16, color: '#333', boxShadow: '0 2px 16px rgba(0,0,0,0.07)', gap: 18, padding: 'var(--space-2x)' }}>
            <div className="h6" style={{ color: '#333', fontWeight: 700, letterSpacing: 1, marginBottom: 4 }}>Doctors Say:</div>
            <div className="body-text" style={{ marginBottom: 12, color: '#333', fontWeight: 400 }}>{product.doctor}</div>
            {/* Profile sub-box */}
            <div style={{ border: '2px solid #333', borderRadius: 10, padding: 'var(--space-1x) var(--space-2x)', background: '#fff', marginTop: 8, marginBottom: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div className="h6" style={{ color: '#333', fontWeight: 700, margin: '0 0 8px 0', letterSpacing: 1 }}>Profile</div>
              <div style={{ borderTop: '2px solid #333', margin: '0 0 8px 0', width: '100%' }} />
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#333', fontWeight: 500, fontSize: 16 }}>
                {product.frequency && <li style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>{iconMap[0]}{product.frequency}</li>}
                {product.application && <li style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>{iconMap[1]}{product.application}</li>}
                {product.dosage && <li style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>{iconMap[2]}{product.dosage}</li>}
              </ul>
            </div>
          </div>
        </div>
        {/* Bottom Row - No Wrap */}
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
      </div>
      <style jsx global>{`
        .start-today-btn {
          background: #fff !important;
          color: var(--e-global-color-dark-green) !important;
          border: none !important;
          box-shadow: none !important;
        }
        .start-today-btn:hover {
          background: var(--e-global-color-lightgreen) !important;
          color: var(--e-global-color-dark-green) !important;
        }
        .start-today-btn .vitabella-arrow .arrow-circle,
        .start-today-btn:hover .vitabella-arrow .arrow-circle {
          fill: var(--e-global-color-dark-green) !important;
        }
        .start-today-btn .vitabella-arrow .arrow-path,
        .start-today-btn:hover .vitabella-arrow .arrow-path {
          fill: var(--e-global-color-green) !important;
        }
        .white-to-lightgreen-btn {
          background: #fff !important;
          color: var(--e-global-color-dark-green) !important;
          border: none !important;
          box-shadow: none !important;
        }
        .white-to-lightgreen-btn:hover {
          background: var(--e-global-color-lightgreen) !important;
          color: var(--e-global-color-dark-green) !important;
        }
        .white-to-lightgreen-btn .vitabella-arrow .arrow-circle,
        .white-to-lightgreen-btn:hover .vitabella-arrow .arrow-circle {
          fill: var(--e-global-color-dark-green) !important;
        }
        .white-to-lightgreen-btn .vitabella-arrow .arrow-path,
        .white-to-lightgreen-btn:hover .vitabella-arrow .arrow-path {
          fill: var(--e-global-color-green) !important;
        }
        .start-today-btn span,
        .start-today-btn:hover span,
        .white-to-lightgreen-btn span,
        .white-to-lightgreen-btn:hover span {
          color: var(--e-global-color-dark-green) !important;
        }
      `}</style>
    </section>
  );
};

export default ProductMechanismModule;
