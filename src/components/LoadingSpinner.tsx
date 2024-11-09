import { Loader2 } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin-slow text-indigo-500 dark:text-indigo-400" />
    </div>
  );
};

export default LoadingSpinner;