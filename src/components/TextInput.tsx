import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface TextInputProps {
  onSubmit: (text: string) => void;
}

const TextInput = ({ onSubmit }: TextInputProps) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text);
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to generate 3D asset..."
        className="min-h-[100px] resize-none border-gray-200 focus:border-gray-400 focus:ring-gray-400"
      />
      <Button
        type="submit"
        className="w-full bg-black text-white hover:bg-gray-800"
        disabled={!text.trim()}
      >
        Generate 3D Asset
      </Button>
    </form>
  );
};

export default TextInput;