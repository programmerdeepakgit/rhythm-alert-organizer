import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, BookOpen } from "lucide-react";
import { ONDAY_TEMPLATE, OFFDAY_TEMPLATE } from "@/types/schedule";

interface ScheduleTypeSelectorProps {
  onSelectTemplate: (type: 'onday' | 'offday') => void;
  onClose: () => void;
}

export const ScheduleTypeSelector = ({ onSelectTemplate, onClose }: ScheduleTypeSelectorProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
          Choose Your Schedule
        </h2>
        <p className="text-muted-foreground">
          Select a template to get started with your daily routine
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Onday Schedule */}
        <Card className="transition-all duration-300 hover:shadow-card cursor-pointer group" 
              onClick={() => onSelectTemplate('onday')}>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gradient-primary text-primary-foreground">
                <BookOpen size={20} />
              </div>
              <div>
                <CardTitle className="text-lg">Onday Schedule</CardTitle>
                <Badge variant="secondary" className="mt-1">
                  {ONDAY_TEMPLATE.length} activities
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {ONDAY_TEMPLATE.slice(0, 3).map((task) => (
              <div key={task.id} className="flex items-center gap-2 text-sm">
                <Clock size={14} className="text-muted-foreground" />
                <span className="font-medium text-primary">{task.time}</span>
                <span className="text-muted-foreground">{task.activity}</span>
              </div>
            ))}
            <div className="text-xs text-muted-foreground pt-1">
              + {ONDAY_TEMPLATE.length - 3} more activities
            </div>
          </CardContent>
        </Card>

        {/* Offday Schedule */}
        <Card className="transition-all duration-300 hover:shadow-card cursor-pointer group" 
              onClick={() => onSelectTemplate('offday')}>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gradient-accent text-accent-foreground">
                <Calendar size={20} />
              </div>
              <div>
                <CardTitle className="text-lg">Offday Schedule</CardTitle>
                <Badge variant="secondary" className="mt-1">
                  {OFFDAY_TEMPLATE.length} activities
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {OFFDAY_TEMPLATE.slice(0, 3).map((task) => (
              <div key={task.id} className="flex items-center gap-2 text-sm">
                <Clock size={14} className="text-muted-foreground" />
                <span className="font-medium text-accent">{task.time}</span>
                <span className="text-muted-foreground">{task.activity}</span>
              </div>
            ))}
            <div className="text-xs text-muted-foreground pt-1">
              + {OFFDAY_TEMPLATE.length - 3} more activities
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </div>
  );
};