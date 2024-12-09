import { useEffect, useRef, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

interface Preview3DProps {
  modelUrl?: string;
  isLoading?: boolean;
  fileName?: string;
  inputType?: "file" | "text";
}

const Preview3D = ({
  modelUrl = "/3d-assets/astronaut.glb", // Set default model
  isLoading = false,
  fileName = "Astronaut",
  inputType = "file",
}: Preview3DProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [modelViewerLoaded, setModelViewerLoaded] = useState(false);
  const [modelError, setModelError] = useState<string | null>(null);

  const getDisplayName = () => {
    if (fileName) {
      return fileName;
    }
    return inputType === "text" ? "Rocketman" : "Preview";
  };

  useEffect(() => {
    // Dynamically load the model-viewer script
    const script = document.createElement("script");
    script.type = "module";
    script.src = "https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js";
    document.head.appendChild(script);

    script.onload = () => {
      setModelViewerLoaded(true);
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

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
        {modelViewerLoaded ? (
          // @ts-expect-error - model-viewer is loaded dynamically
          <model-viewer
            src={modelUrl}
            alt="3D model preview"
            camera-controls
            auto-rotate
            camera-orbit="45deg 55deg 4m"
            environment-image="neutral"
            shadow-intensity="1"
            exposure="1"
            interaction-prompt="none"
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "transparent",
            }}
            onError={(error: any) => setModelError(error.detail.sourceError)}
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-lg text-muted-foreground">{modelError || "Loading 3D viewer..."}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Preview3D;
