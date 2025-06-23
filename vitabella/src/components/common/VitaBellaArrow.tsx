import React from 'react';

const VitaBellaArrow: React.FC<React.SVGAttributes<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 730.01 730.01"
    width="30"
    height="30"
    className={`vitabella-arrow${props.className ? ' ' + props.className : ''}`}
    {...props}
  >
    <circle 
      cx="365.01" 
      cy="365.01" 
      r="365.01" 
      fill="var(--e-global-color-dark-green)"
      className="arrow-circle"
    />
    <path 
      d="M250.42,511.01l215.63-215.63v193.17h44.92V219.01H241.44v44.92h193.17l-215.63,215.63,31.45,31.45Z" 
      fill="var(--e-global-color-green)"
      className="arrow-path"
    />
  </svg>
);

export default VitaBellaArrow;
