import React, { useState } from 'react';
import ImageDetail from './ImageDetails';

const ImageUpload = () => {
  const [imageData, setImageData] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      const description = 'A beautiful scenery with mountains and a river.'; // Replace with actual image description
      const title = 'Mountain River'; // Replace with actual image title
      setImageData({ imageUrl, description, title });
    }
  };

  return (
    <div className="image-upload">
      <input type="file" onChange={handleImageUpload} />
      {imageData && <ImageDetail {...imageData} />}
    </div>
  );
};

export default ImageUpload;
