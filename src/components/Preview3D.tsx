import { useEffect, useRef } from "react";
import LoadingSpinner from "./LoadingSpinner";

interface Preview3DProps {
  imageUrl?: string;
  isLoading?: boolean;
}

const Preview3D = ({ imageUrl, isLoading }: Preview3DProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (imageUrl) {
      // Here we would initialize a 3D viewer like Three.js
      // For now, we'll show a placeholder
    }
  }, [imageUrl]);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="h-full w-full rounded-lg bg-background">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="Preview"
          className="h-full w-full rounded-lg object-cover"
        />
      ) : (
        <div className="flex h-full items-center justify-center">
          <p className="text-lg text-muted-foreground">Preview will appear here</p>
        </div>
      )}
    </div>
  );
};

export default Preview3D;