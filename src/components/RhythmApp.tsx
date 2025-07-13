import { useState, useEffect } from "react";
import { format, isToday, startOfDay } from "date-fns";
import { AppHeader } from "./AppHeader";
import { TaskCard } from "./TaskCard";
import { AddTaskDialog } from "./AddTaskDialog";
import { ScheduleTypeSelector } from "./ScheduleTypeSelector";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Sparkles } from "lucide-react";
import { Task, DaySchedule, ONDAY_TEMPLATE, OFFDAY_TEMPLATE } from "@/types/schedule";
import { toast } from "@/hooks/use-toast";

export const RhythmApp = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [schedules, setSchedules] = useState<Record<string, DaySchedule>>({});
  const [showMenu, setShowMenu] = useState(false);
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);

  // Get current day's schedule
  const dateKey = format(selectedDate, 'yyyy-MM-dd');
  const currentSchedule = schedules[dateKey];

  // Check if we need to show template selector for new day
  useEffect(() => {
    if (!currentSchedule && isToday(selectedDate)) {
      setShowTemplateSelector(true);
    }
  }, [selectedDate, currentSchedule]);

  const handleSelectTemplate = (type: 'onday' | 'offday') => {
    const template = type === 'onday' ? ONDAY_TEMPLATE : OFFDAY_TEMPLATE;
    const newSchedule: DaySchedule = {
      date: dateKey,
      type,
      tasks: template.map(task => ({ ...task, completed: false }))
    };
    
    setSchedules(prev => ({
      ...prev,
      [dateKey]: newSchedule
    }));
    
    setShowTemplateSelector(false);
    toast({
      title: "Schedule Created! 🎯",
      description: `${type === 'onday' ? 'Onday' : 'Offday'} schedule set for ${format(selectedDate, 'PPP')}`,
    });
  };

  const handleAddTask = (newTask: Omit<Task, 'id'>) => {
    const taskId = Date.now().toString();
    const task: Task = { ...newTask, id: taskId };
    
    if (currentSchedule) {
      const updatedSchedule = {
        ...currentSchedule,
        tasks: [...currentSchedule.tasks, task].sort((a, b) => a.time.localeCompare(b.time))
      };
      setSchedules(prev => ({
        ...prev,
        [dateKey]: updatedSchedule
      }));
    } else {
      const newSchedule: DaySchedule = {
        date: dateKey,
        type: 'custom',
        tasks: [task]
      };
      setSchedules(prev => ({
        ...prev,
        [dateKey]: newSchedule
      }));
    }
    
    toast({
      title: "Task Added! ✨",
      description: `${newTask.activity} scheduled for ${newTask.time}`,
    });
  };

  const handleToggleComplete = (taskId: string) => {
    if (!currentSchedule) return;
    
    const updatedTasks = currentSchedule.tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    
    const updatedSchedule = {
      ...currentSchedule,
      tasks: updatedTasks
    };
    
    setSchedules(prev => ({
      ...prev,
      [dateKey]: updatedSchedule
    }));

    const task = currentSchedule.tasks.find(t => t.id === taskId);
    if (task) {
      toast({
        title: task.completed ? "Task Reopened" : "Task Completed! 🎉",
        description: `${task.activity} marked as ${task.completed ? 'incomplete' : 'complete'}`,
      });
    }
  };

  const completedTasks = currentSchedule?.tasks.filter(task => task.completed).length || 0;
  const totalTasks = currentSchedule?.tasks.length || 0;

  return (
    <div className="min-h-screen bg-gradient-background">
      <AppHeader 
        selectedDate={selectedDate}
        onDateSelect={(date) => date && setSelectedDate(date)}
        onMenuClick={() => setShowMenu(true)}
        onAddTask={() => {
          if (!currentSchedule) {
            setShowTemplateSelector(true);
          }
        }}
      />

      <main className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Date Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            {isToday(selectedDate) ? "Today's Schedule" : format(selectedDate, 'EEEE, MMMM d')}
          </h1>
          {currentSchedule && (
            <div className="flex items-center justify-center gap-4">
              <Badge variant="outline" className="capitalize">
                {currentSchedule.type} schedule
              </Badge>
              <Badge variant="secondary">
                {completedTasks}/{totalTasks} completed
              </Badge>
            </div>
          )}
        </div>

        {/* Tasks List */}
        {currentSchedule ? (
          <div className="space-y-4">
            {currentSchedule.tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggleComplete={handleToggleComplete}
                className="animate-slide-up"
              />
            ))}
            
            {/* Add Task Card */}
            <AddTaskDialog onAddTask={handleAddTask}>
              <Card className="p-4 border-dashed border-2 border-muted-foreground/30 hover:border-primary/50 transition-colors cursor-pointer group">
                <div className="flex items-center justify-center gap-2 text-muted-foreground group-hover:text-primary transition-colors">
                  <PlusCircle size={20} />
                  <span>Add another task</span>
                </div>
              </Card>
            </AddTaskDialog>
          </div>
        ) : (
          /* Empty State */
          <Card className="p-8 text-center">
            <div className="space-y-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center">
                <Sparkles size={24} className="text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">No schedule for this day</h3>
                <p className="text-muted-foreground mb-4">
                  Choose a template or add your first task to get started
                </p>
              </div>
              <div className="flex gap-2 justify-center">
                <Button 
                  onClick={() => setShowTemplateSelector(true)}
                  className="bg-gradient-primary shadow-soft"
                >
                  <Sparkles size={16} className="mr-1" />
                  Use Template
                </Button>
                <AddTaskDialog onAddTask={handleAddTask}>
                  <Button variant="outline">
                    <PlusCircle size={16} className="mr-1" />
                    Add Task
                  </Button>
                </AddTaskDialog>
              </div>
            </div>
          </Card>
        )}
      </main>

      {/* Template Selector Dialog */}
      <Dialog open={showTemplateSelector} onOpenChange={setShowTemplateSelector}>
        <DialogContent className="sm:max-w-4xl">
          <ScheduleTypeSelector 
            onSelectTemplate={handleSelectTemplate}
            onClose={() => setShowTemplateSelector(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};