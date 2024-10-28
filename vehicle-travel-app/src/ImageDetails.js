import React from 'react';

const ImageDetail = ({ imageUrl, description, title }) => {
  return (
    <div className="image-detail">
      <img src={Location.jpg} alt={title} />
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default ImageDetail;
