import { useState } from "react";
import FileUpload from "@/components/FileUpload";
import TextInput from "@/components/TextInput";
import Preview3D from "@/components/Preview3D";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { toast } from "sonner";

const Index = () => {
  const [previewUrl, setPreviewUrl] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState<string>();
  const [inputType, setInputType] = useState<"file" | "text">("file");
  const { theme, setTheme } = useTheme();

  const handleFileSelect = async (file: File) => {
    setIsLoading(true);
    try {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setFileName(file.name);
      setInputType("file");
      toast.success("File uploaded successfully", {
        description: "Your 3D asset is being generated.",
      });
    } catch (error) {
      toast.error("Error uploading file", {
        description: "Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTextSubmit = async (text: string) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setPreviewUrl("https://images.unsplash.com/photo-1518770660439-4636190af475");
      setFileName(`Generated from: ${text.slice(0, 20)}${text.length > 20 ? "..." : ""}`);
      setInputType("text");
      toast.success("Text processed successfully", {
        description: "Your 3D asset is ready.",
      });
    } catch (error) {
      toast.error("Error processing text", {
        description: "Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Menu Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between border-b border-border bg-background/95 px-8 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="text-xl font-bold tracking-tight">Placeholder</div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? (
            <MoonIcon className="h-5 w-5" />
          ) : (
            <SunIcon className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Main Content */}
      <div className="mt-16 flex flex-col lg:flex-row">
        {/* Left Panel */}
        <div className="flex w-full flex-col space-y-6 p-8 lg:w-1/2">
          <div className="text-left">
            <h1 className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-5xl font-black tracking-tight text-transparent [text-shadow:_0_1px_0_rgb(0_0_0_/_20%)]">
              3D Asset Generator
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Transform your images and text into stunning 3D assets instantly
            </p>
          </div>

          <Tabs defaultValue="file" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="file">Upload File</TabsTrigger>
              <TabsTrigger value="text">Enter Text</TabsTrigger>
            </TabsList>
            <TabsContent value="file" className="mt-4">
              <FileUpload onFileSelect={handleFileSelect} />
            </TabsContent>
            <TabsContent value="text" className="mt-4">
              <TextInput onSubmit={handleTextSubmit} />
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Panel */}
        <div className="flex w-full bg-muted/30 p-8 lg:w-1/2">
          <div className="h-[600px] w-full overflow-hidden rounded-lg border border-border bg-background/50 shadow-lg backdrop-blur-sm">
            <Preview3D
              imageUrl={previewUrl}
              isLoading={isLoading}
              fileName={fileName}
              inputType={inputType}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;