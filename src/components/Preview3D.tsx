import { useEffect, useRef } from "react";
import LoadingSpinner from "./LoadingSpinner";

interface Preview3DProps {
  imageUrl?: string;
  isLoading?: boolean;
  fileName?: string;
  inputType?: "file" | "text";
}

const Preview3D = ({ imageUrl, isLoading, fileName, inputType }: Preview3DProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const getDisplayName = () => {
    if (fileName) {
      return fileName;
    }
    return inputType === "text" ? "Text Generated Asset" : "Preview";
  };

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
    <div className="flex h-full w-full flex-col">
      <div className="border-b border-border bg-background/50 p-4">
        <h2 className="text-lg font-medium">{getDisplayName()}</h2>
      </div>
      <div ref={containerRef} className="flex-1 bg-background p-4">
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
    </div>
  );
};

export default Preview3D;