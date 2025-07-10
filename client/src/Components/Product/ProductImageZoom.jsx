import React, { useRef, useState } from "react";

const ProductImageZoom = ({ src }) => {
  const imgRef = useRef(null);
  const [zoomData, setZoomData] = useState({ visible: false, x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { top, left, width, height } = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomData({ visible: true, x, y });
  };

  const handleMouseLeave = () => {
    setZoomData({ ...zoomData, visible: false });
  };

  return (
    <div className="relative flex justify-center items-center w-full">
      {/* Original Image */}
      <div
        className=" overflow-hidden mt-6 w-full max-w-[350px] sm:max-w-[300px]"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <img
          ref={imgRef}
          src={src}
          alt="Product"
          className="w-full h-auto object-cover  "
        />
      </div>

      {/* Floating Zoom Box */}
      {zoomData.visible && (
        <div
          className="absolute top-0 mt-4 left-[420px] w-[600px] h-[400px] border z-50 shadow-xl hidden lg:block"
          style={{
            backgroundImage: `url(${src})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: `${zoomData.x}% ${zoomData.y}%`,
            backgroundSize: "350%",
          }}
        />
      )}
    </div>
  );
};

export default ProductImageZoom;
