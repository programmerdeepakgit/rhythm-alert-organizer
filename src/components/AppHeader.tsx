import { Calendar, Menu, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface AppHeaderProps {
  selectedDate: Date;
  onDateSelect: (date: Date | undefined) => void;
  onMenuClick: () => void;
  onAddTask: () => void;
}

export const AppHeader = ({ selectedDate, onDateSelect, onMenuClick, onAddTask }: AppHeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        {/* Left Menu Button */}
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onMenuClick}
          className="hover:bg-accent"
        >
          <Menu size={20} />
        </Button>

        {/* Center Title */}
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold bg-gradient-primary bg-clip-text text-transparent">
            Rhythm Alert
          </h1>
        </div>

        {/* Right Calendar & Add Button */}
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                size="sm"
                className="gap-2 hover:bg-accent"
              >
                <Calendar size={16} />
                <span className="hidden sm:inline">
                  {format(selectedDate, "MMM dd")}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={onDateSelect}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>

          <Button 
            size="sm" 
            onClick={onAddTask}
            className="bg-gradient-primary hover:opacity-90 shadow-soft"
          >
            <Plus size={16} />
            <span className="hidden sm:inline ml-1">Add</span>
          </Button>
        </div>
      </div>
    </header>
  );
};