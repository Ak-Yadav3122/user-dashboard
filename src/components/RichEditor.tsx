import { useEffect, useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bold, Italic, Underline, List } from "lucide-react";

const RichEditor = () => {
  const [userData, setUserData] = useState("");
  const [content, setContent] = useState("");
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const data = localStorage.getItem("userData");
    if (data) {
      const parsed = JSON.parse(data);
      setUserData(
        Object.entries(parsed)
          .map(([key, value]) => `${key}: ${value}`)
          .join("\n")
      );
    }
  }, []);

  const formatText = (command: string) => {
    // Focus the editor if it's not already focused
    if (document.activeElement !== editorRef.current) {
      editorRef.current?.focus();
    }

    // Save the current selection
    const selection = window.getSelection();
    const range = selection?.getRangeAt(0);

    // Execute the command
    document.execCommand(command, false);

    // Restore focus and selection if needed
    if (range && !selection?.rangeCount) {
      selection?.addRange(range);
    }
  };

  return (
    <Card className="p-6 max-w-2xl mx-auto">
      <div className="mb-4 flex gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => formatText("bold")}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => formatText("italic")}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => formatText("underline")}
        >
          <Underline className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => formatText("insertUnorderedList")}
        >
          <List className="h-4 w-4" />
        </Button>
      </div>

      <div
        ref={editorRef}
        className="min-h-[200px] p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
        contentEditable
        dangerouslySetInnerHTML={{ __html: userData }}
        onInput={(e) => setContent(e.currentTarget.innerHTML)}
      />
    </Card>
  );
};

export default RichEditor;
