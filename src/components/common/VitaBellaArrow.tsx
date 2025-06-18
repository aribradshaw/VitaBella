import React from 'react';

const VitaBellaArrow: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = (props) => (
  <img
    src="https://www.vitabella.com/wp-content/uploads/2025/03/Asset-5.svg"
    alt="Vita Bella Arrow"
    className={`vitabella-arrow${props.className ? ' ' + props.className : ''}`}
    {...props}
  />
);

export default VitaBellaArrow;
