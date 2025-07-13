import { Check, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Task } from "@/types/schedule";

interface TaskCardProps {
  task: Task;
  onToggleComplete?: (taskId: string) => void;
  className?: string;
}

export const TaskCard = ({ task, onToggleComplete, className }: TaskCardProps) => {
  const isCompleted = task.completed;
  const currentTime = new Date();
  const taskTime = new Date();
  const [hours, minutes] = task.time.split(':');
  taskTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
  
  const isCurrentTask = Math.abs(currentTime.getTime() - taskTime.getTime()) < 30 * 60 * 1000; // 30 min window

  return (
    <Card 
      className={cn(
        "p-4 transition-all duration-300 cursor-pointer hover:shadow-card",
        isCurrentTask && "bg-gradient-primary text-primary-foreground shadow-glow",
        isCompleted && "opacity-70 bg-success/10",
        className
      )}
      onClick={() => onToggleComplete?.(task.id)}
    >
      <div className="flex items-center gap-3">
        <div className={cn(
          "flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors",
          isCompleted 
            ? "bg-success border-success text-success-foreground" 
            : isCurrentTask 
            ? "border-primary-foreground text-primary-foreground"
            : "border-muted-foreground"
        )}>
          {isCompleted ? (
            <Check size={16} />
          ) : (
            <Clock size={16} />
          )}
        </div>
        
        <div className="flex-1">
          <div className={cn(
            "text-sm font-medium",
            isCurrentTask ? "text-primary-foreground" : "text-primary"
          )}>
            {task.time}
          </div>
          <div className={cn(
            "text-sm",
            isCompleted && "line-through",
            isCurrentTask ? "text-primary-foreground/90" : "text-foreground"
          )}>
            {task.activity}
          </div>
        </div>
      </div>
    </Card>
  );
};