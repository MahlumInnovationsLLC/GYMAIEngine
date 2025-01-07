import { useState } from "react";
import SlideablePanel from "@/components/SlideablePanel";
import IoTMonitoring from "@/components/IoTMonitoring";
import TrainingControl from "@/components/TrainingControl";
import { Button } from "@/components/ui/button";
import { PanelLeftOpen, PanelRightOpen, Bot } from "lucide-react";
import MessageBubble from "@/components/MessageBubble";

export default function Dashboard() {
  const [leftPanelOpen, setLeftPanelOpen] = useState(true);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);
  const [messages, setMessages] = useState<Array<{text: string, isAi: boolean}>>([
    { text: "Welcome to GYM AI Engine! How can I assist you today?", isAi: true }
  ]);

  return (
    <div className="h-screen flex overflow-hidden bg-background">
      <SlideablePanel 
        side="left" 
        isOpen={leftPanelOpen} 
        onOpenChange={setLeftPanelOpen}
      >
        <IoTMonitoring />
      </SlideablePanel>

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="flex items-center justify-between p-4 border-b">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLeftPanelOpen(!leftPanelOpen)}
          >
            <PanelLeftOpen className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Bot className="h-6 w-6" />
            <h1 className="text-xl font-bold">GYM AI Engine</h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setRightPanelOpen(!rightPanelOpen)}
          >
            <PanelRightOpen className="h-5 w-5" />
          </Button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, idx) => (
            <MessageBubble key={idx} message={msg.text} isAi={msg.isAi} />
          ))}
        </div>

        <div className="p-4 border-t">
          {/* Chat input implementation */}
          <div className="flex gap-2">
            <input 
              type="text"
              placeholder="Type your message..."
              className="flex-1 rounded-md border p-2"
            />
            <Button>Send</Button>
          </div>
        </div>
      </main>

      <SlideablePanel 
        side="right" 
        isOpen={rightPanelOpen} 
        onOpenChange={setRightPanelOpen}
      >
        <TrainingControl />
      </SlideablePanel>
    </div>
  );
}
