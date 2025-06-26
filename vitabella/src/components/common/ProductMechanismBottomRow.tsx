import React from "react";
import VitaBellaButton from '@/components/common/VitaBellaButton';

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
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', gap: 'var(--space-2x)', width: '100%', alignItems: 'center', minWidth: 0 }}>
        {/* Bottom Left */}
        <div style={{ flex: '1 1 45%', minWidth: 0, maxWidth: '45%', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
          <div style={{ fontSize: 56, fontWeight: 700, color: 'var(--e-global-color-green)', lineHeight: 1, marginBottom: 8, textAlign: 'left' }}>60%</div>
          <div className="h4" style={{ fontFamily: 'Switzer, Arial, Helvetica, sans-serif', fontWeight: 400, color: 'var(--e-global-color-white)', marginBottom: 8, textTransform: 'none', textAlign: 'left' }}>more affordable than our competitors.</div>
          <div className="body-text" style={{ color: 'var(--e-global-color-white)', marginBottom: 16, textAlign: 'left' }}>Select the membership plan that suits your goals and lifestyle, and book your initial consultation.</div>
          <VitaBellaButton href="/membership" className="start-today-btn" style={{ width: 'fit-content', minWidth: 0, maxWidth: '100%', display: 'inline-flex' }}>Start Today</VitaBellaButton>
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
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 78.82" style={{ height: 22, width: 'auto', display: 'block' }}><g id="Art"><g><g><path fill="#fff" d="M47.71,43.57l16.54,16.54c.5.5.5,1.3,0,1.79l-16.54,16.54c-.5.5-1.3.5-1.79,0l-16.54-16.54c-.5-.5-.5-1.3,0-1.79l16.54-16.54c.5-.5,1.3-.5,1.79,0Z"></path><path fill="#fff" d="M30.9,15.06L44.34,1.62c.6-.6.17-1.62-.67-1.62h-27.02c-.34,0-.66.13-.9.37L1.49,14.62c-1.98,1.98-1.98,5.18-.01,7.17l14.44,14.52c.24.24.56.37.9.37h27.14c.85,0,1.27-1.02.67-1.62l-13.72-13.72c-1.73-1.73-1.73-4.54,0-6.28Z"></path><path fill="#fff" d="M62.72,15.06L49.28,1.62C48.69,1.02,49.11,0,49.96,0h27.02c.34,0,.66.13.9.37l14.26,14.25c1.98,1.98,1.98,5.18.01,7.17l-14.44,14.52c-.24.24-.56.37-.9.37h-27.14c-.85,0-1.27-1.02-.67-1.62l13.72-13.72c-1.73-1.73-1.73-4.54,0-6.28Z"></path></g></g></g></svg>
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
    </>
  );
};

export default ProductMechanismBottomRow;
