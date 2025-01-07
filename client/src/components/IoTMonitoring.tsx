import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Activity, AlertTriangle } from "lucide-react";

interface Equipment {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'maintenance';
  usage: number;
}

export default function IoTMonitoring() {
  const { data: equipment, isLoading } = useQuery<Equipment[]>({
    queryKey: ['/api/equipment'],
  });

  if (isLoading) {
    return <div className="p-4">Loading equipment status...</div>;
  }

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-semibold mb-4">Equipment Monitoring</h2>
      
      {equipment?.map((item) => (
        <Card key={item.id}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Activity className="h-4 w-4" />
              {item.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Usage</span>
                <span>{item.usage}%</span>
              </div>
              <Progress value={item.usage} />
              
              {item.status === 'maintenance' && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Maintenance required
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
