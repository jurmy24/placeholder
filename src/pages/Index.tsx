import { useState } from "react";
import FileUpload from "@/components/FileUpload";
import TextInput from "@/components/TextInput";
import Preview3D from "@/components/Preview3D";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [previewUrl, setPreviewUrl] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFileSelect = async (file: File) => {
    setIsLoading(true);
    try {
      // Here we would normally upload the file and get back a 3D asset
      // For now, we'll just create an object URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      toast({
        title: "File uploaded successfully",
        description: "Your 3D asset is being generated.",
      });
    } catch (error) {
      toast({
        title: "Error uploading file",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTextSubmit = async (text: string) => {
    setIsLoading(true);
    try {
      // Here we would normally send the text to generate a 3D asset
      // For now, we'll just show a placeholder
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setPreviewUrl("https://images.unsplash.com/photo-1518770660439-4636190af475");
      toast({
        title: "Text processed successfully",
        description: "Your 3D asset is ready.",
      });
    } catch (error) {
      toast({
        title: "Error processing text",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Left Panel */}
      <div className="flex w-full flex-col space-y-8 bg-white p-8 lg:w-1/2">
        <div className="text-center lg:text-left">
          <h1 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent">
            3D Asset Generator
          </h1>
          <p className="mt-2 text-gray-600">
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
      <div className="flex w-full bg-gray-50 p-8 lg:w-1/2">
        <div className="h-[600px] w-full">
          <Preview3D imageUrl={previewUrl} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default Index;