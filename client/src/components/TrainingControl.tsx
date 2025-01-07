import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, Users, BookOpen } from "lucide-react";

interface Document {
  id: string;
  title: string;
  type: 'training' | 'manual' | 'policy';
  lastUpdated: string;
}

export default function TrainingControl() {
  const { data: documents, isLoading } = useQuery<Document[]>({
    queryKey: ['/api/documents'],
  });

  if (isLoading) {
    return <div className="p-4">Loading documents...</div>;
  }

  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-4">
        <h2 className="text-lg font-semibold mb-4">Training & Documents</h2>

        <div className="grid grid-cols-1 gap-4">
          {documents?.map((doc) => (
            <Card key={doc.id} className="cursor-pointer hover:bg-accent/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  {doc.type === 'training' && <Users className="h-4 w-4" />}
                  {doc.type === 'manual' && <BookOpen className="h-4 w-4" />}
                  {doc.type === 'policy' && <FileText className="h-4 w-4" />}
                  {doc.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  Last updated: {new Date(doc.lastUpdated).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
}
