import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Task } from "@/types/schedule";

interface AddTaskDialogProps {
  onAddTask: (task: Omit<Task, 'id'>) => void;
  trigger?: React.ReactNode;
  children?: React.ReactNode;
}

export const AddTaskDialog = ({ onAddTask, trigger, children }: AddTaskDialogProps) => {
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState('');
  const [activity, setActivity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (time && activity.trim()) {
      onAddTask({
        time,
        activity: activity.trim(),
        completed: false
      });
      setTime('');
      setActivity('');
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || trigger || (
          <Button className="bg-gradient-primary shadow-soft">
            <Plus size={16} />
            Add Task
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="bg-gradient-primary bg-clip-text text-transparent">
            Add New Task
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="time">Time</Label>
            <Input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              className="focus:ring-primary"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="activity">Activity</Label>
            <Input
              id="activity"
              placeholder="Enter your activity..."
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              required
              className="focus:ring-primary"
            />
          </div>
          <div className="flex gap-2 pt-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="flex-1 bg-gradient-primary shadow-soft"
            >
              Add Task
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};