import { cn } from "@/lib/utils";

interface MessageBubbleProps {
  message: string;
  isAi: boolean;
}

export default function MessageBubble({ message, isAi }: MessageBubbleProps) {
  return (
    <div
      className={cn(
        "rounded-lg p-4 max-w-[80%] shadow-sm",
        isAi 
          ? "bg-gray-800 text-white ml-0 mr-auto" 
          : "bg-white border border-gray-200 mr-0 ml-auto hover:bg-gray-50 transition-colors"
      )}
    >
      <p className="text-sm leading-relaxed">{message}</p>
    </div>
  );
}