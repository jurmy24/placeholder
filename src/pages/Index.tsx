import { useState } from "react";
import FileUpload from "@/components/FileUpload";
import TextInput from "@/components/TextInput";
import Preview3D from "@/components/Preview3D";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MoonIcon, SunIcon, Github, Share2 } from "lucide-react";
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center space-x-3">
          <img 
            src="/lovable-uploads/b3a3d13e-9c8a-4e56-baf8-7dbee5c4d9c5.png" 
            alt="Logo" 
            className="h-8 w-8"
          />
          <span className="text-xl font-bold">Placeholder</span>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Github className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Share2 className="h-5 w-5" />
          </Button>
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
      </header>

      {/* Main Content */}
      <main className="container mx-auto pt-24 px-4">
        {/* Model Title */}
        <div className="mb-8">
          <h1 className="font-mono text-2xl font-semibold mb-2">placeholder / x-to-3D</h1>
          <div className="flex space-x-4 text-sm text-muted-foreground">
            <span className="flex items-center">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
              Running
            </span>
            <span>23.1k views</span>
            <span>1.2k assets generated</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <Tabs defaultValue="text" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="text">text-to-3D</TabsTrigger>
                <TabsTrigger value="image">image-to-3D</TabsTrigger>
              </TabsList>
              <TabsContent value="text" className="mt-4">
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Provide a description here of an object you would like to generate a 3D model of:
                  </p>
                  <TextInput onSubmit={handleTextSubmit} />
                </div>
              </TabsContent>
              <TabsContent value="image" className="mt-4">
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Upload an image to generate a 3D model:
                  </p>
                  <FileUpload onFileSelect={handleFileSelect} />
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Preview Section */}
          <div className="h-[500px] rounded-lg border border-border overflow-hidden">
            <Preview3D
              imageUrl={previewUrl}
              isLoading={isLoading}
              fileName={fileName}
              inputType={inputType}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;