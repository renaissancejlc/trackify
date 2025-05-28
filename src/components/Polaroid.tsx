

import React from 'react';
import '../styles/Polaroid.css';

interface PolaroidProps {
  image: string;
  caption?: string;
  width?: string;
}

const Polaroid: React.FC<PolaroidProps> = ({ image, caption = '', width = '200px' }) => {
  return (
    <div className="polaroid-container" style={{ width }}>
      <div className="polaroid-photo">
        <img src={image} alt={caption} />
      </div>
      {caption && <div className="polaroid-caption handwriting">{caption}</div>}
    </div>
  );
};

export default Polaroid;