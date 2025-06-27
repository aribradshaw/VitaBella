import React from "react";
import VitaBellaButton from '@/components/common/VitaBellaButton';
import { FiCalendar } from 'react-icons/fi';
import { PiPill } from 'react-icons/pi';
import { FaAsterisk } from 'react-icons/fa';

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

  return (
    <section style={{ width: '100vw', position: 'relative', left: '50%', right: '50%', marginLeft: '-50vw', marginRight: '-50vw', background: 'var(--e-global-color-dark-green)', color: 'var(--e-global-color-white)', padding: 'var(--space-4x) 0', border: 'none', borderRadius: 32 }}>
      <div className="container" style={{ maxWidth: 1340, margin: '0 auto', padding: 'var(--space-3x) 0', display: 'flex', flexDirection: 'column', gap: 'var(--space-3x)', color: 'var(--e-global-color-white)' }}>
        {/* Top Row - No Wrap */}
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', gap: 'var(--space-2x)', width: '100%', alignItems: 'flex-start', minWidth: 0 }}>
          {/* Left */}
          <div style={{ flex: '1 1 55%', minWidth: 0, maxWidth: '55%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
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
          <div style={{
            flex: '1 1 45%',
            minWidth: 0,
            maxWidth: '45%',
            background: '#fff',
            border: '2px solid #333',
            borderRadius: 16,
            padding: 'var(--space-2x)',
            marginLeft: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
            color: '#333',
            boxShadow: '0 2px 16px rgba(0,0,0,0.07)'
          }}>
            <div className="h6" style={{ color: '#333', fontWeight: 700, letterSpacing: 1, marginBottom: 4 }}>Doctors Say:</div>
            <div className="body-text" style={{ marginBottom: 12, color: '#333', fontWeight: 400 }}>{product.doctor}</div>
            {/* Profile sub-box */}
            <div style={{
              border: '2px solid #333',
              borderRadius: 10,
              padding: 'var(--space-1x) var(--space-2x)',
              background: '#fff',
              marginTop: 8,
              marginBottom: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 8
            }}>
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
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', gap: 'var(--space-2x)', width: '100%', alignItems: 'center', minWidth: 0 }}>
          {/* Bottom Left */}
          <div style={{ flex: '1 1 45%', minWidth: 0, maxWidth: '45%', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
            <div style={{ fontSize: 56, fontWeight: 700, color: 'var(--e-global-color-green)', lineHeight: 1, marginBottom: 8, textAlign: 'left' }}>60%</div>
            <div className="h4" style={{ fontFamily: 'Switzer, Arial, Helvetica, sans-serif', fontWeight: 400, color: 'var(--e-global-color-white)', marginBottom: 8, textTransform: 'none', textAlign: 'left' }}>more affordable than our competitors.</div>
            <div className="body-text" style={{ color: 'var(--e-global-color-white)', marginBottom: 16, textAlign: 'left' }}>Select the membership plan that suits your goals and lifestyle, and book your initial consultation.</div>
            <VitaBellaButton
              href="/membership"
              label="Start Today"
              bg="#fff"
              bgHover="var(--e-global-color-lightgreen)"
              text="var(--e-global-color-dark-green)"
              textHover="var(--e-global-color-dark-green)"
              arrowCircleColor="var(--e-global-color-dark-green)"
              arrowCircleColorHover="var(--e-global-color-dark-green)"
              arrowPathColor="var(--e-global-color-green)"
              arrowPathColorHover="var(--e-global-color-green)"
              style={{ width: 'fit-content', minWidth: 0, maxWidth: '100%', display: 'inline-flex' }}
            />
          </div>
          {/* Bottom Right: Table */}
          <div style={{ flex: '1 1 55%', minWidth: 0, maxWidth: '55%', background: 'rgba(255,255,255,0.07)', border: '3px dotted var(--e-global-color-lightgreen)', borderRadius: 18, padding: 'var(--space-2x)', marginLeft: 'auto', display: 'flex', flexDirection: 'column', gap: 12, justifyContent: 'center', height: '100%' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', color: 'var(--e-global-color-white)', borderCollapse: 'collapse', fontSize: 16 }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.18)' }}>
                    <th style={{ textAlign: 'left', padding: '6px 8px', fontWeight: 700, color: 'var(--e-global-color-green)', whiteSpace: 'nowrap' }}>
                      <span className="h6" style={{ color: 'var(--e-global-color-green)', fontWeight: 700, marginBottom: 0 }}>NAD+</span>
                    </th>
                    <th style={{ textAlign: 'center', padding: '6px 8px', fontWeight: 700, color: 'var(--e-global-color-white)' }}>Med / IV Clinics</th>
                    <th style={{ textAlign: 'center', padding: '6px 8px', fontWeight: 700, color: 'var(--e-global-color-white)' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ display: 'inline-block', height: 22, width: 32, verticalAlign: 'middle', marginRight: 4 }}>
                          {/* Inline SVG for Vita Bella logo */}
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 78.82" style={{ height: 22, width: 'auto', display: 'block' }}><g id="Art"><g><g><path fill="#fff" d="M47.71,43.57l16.54,16.54c.5.5.5,1.3,0,1.79l-16.54,16.54c-.5.5-1.3.5-1.79,0l-16.54-16.54c-.5-.5-.5-1.3,0-1.79l16.54-16.54c.5-.5,1.3-.5,1.79,0Z"></path><path fill="#fff" d="M30.9,15.06L44.34,1.62c.6-.6.17-1.62-.67-1.62h-27.02c-.34,0-.66.13-.9.37L1.49,14.62c-1.98,1.98-1.98,5.18-.01,7.17l14.44,14.52c.24.24.56.37.9.37h27.14c.85,0,1.27-1.02.67-1.62l-13.72-13.72c-1.73-1.73-1.73-4.54,0-6.28Z"></path><path fill="#fff" d="M62.72,15.06L49.28,1.62C48.69,1.02,49.11,0,49.96,0h27.02c.34,0,.66.13.9.37l14.26,14.25c1.98,1.98,1.98,5.18.01,7.17l-14.44,14.52c-.24.24-.56.37-.9.37h-27.14c-.85,0-1.27-1.02-.67-1.62l13.72-13.72c1.73-1.73,1.73-4.54,0-6.28Z"></path></g></g></g></svg>
                        </span>
                        <span style={{ fontWeight: 700, color: 'var(--e-global-color-white)', marginLeft: 2 }}>VITA BELLA</span>
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
          </div>
        </div>
        {/* Asterisks outside the dotted border */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'row', gap: 'var(--space-2x)', marginTop: 8 }}>
          <div style={{ flex: '1 1 45%' }}></div>
          <div style={{ flex: '1 1 55%', color: 'var(--e-global-color-white)', fontSize: 13, marginTop: 0 }}>
            *with Membership<br />
            **1000mg vial (40 × 25mg injections)
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
