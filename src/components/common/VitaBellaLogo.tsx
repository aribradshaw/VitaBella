import React from 'react';

/**
 * Vita Bella Logo component. Uses the SVG logo with a fallback to styled text if the image fails to load.
 * Usage: <VitaBellaLogo style={{ height: '2.2rem' }} />
 */
const VitaBellaLogo: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = (props) => {
  const [imgError, setImgError] = React.useState(false);

  if (imgError) {
    return (
      <span style={{ fontFamily: 'Tusker Grotesk, sans-serif', fontSize: '2rem', fontWeight: 700, color: '#fff', letterSpacing: '0.04em' }}>
        VITA BELLA
      </span>
    );
  }

  return (
    <img
      src="https://www.vitabella.com/wp-content/uploads/2025/02/03_VB_Main-Logo_White_RGB.svg"
      alt="Vita Bella Logo"
      onError={() => setImgError(true)}
      {...props}
    />
  );
};

export default VitaBellaLogo;
