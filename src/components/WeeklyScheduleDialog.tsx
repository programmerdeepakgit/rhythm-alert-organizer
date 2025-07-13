import { useState } from "react";
import { format, startOfWeek, addDays } from "date-fns";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Check } from "lucide-react";
import { WeeklySchedule } from "@/types/settings";

interface WeeklyScheduleDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (schedule: WeeklySchedule) => void;
}

export const WeeklyScheduleDialog = ({ open, onClose, onSave }: WeeklyScheduleDialogProps) => {
  const [selectedType, setSelectedType] = useState<'onday' | 'offday'>('onday');
  const [selectedDates, setSelectedDates] = useState<string[]>([]);

  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 1 }); // Monday
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const toggleDate = (dateStr: string) => {
    setSelectedDates(prev => 
      prev.includes(dateStr) 
        ? prev.filter(d => d !== dateStr)
        : [...prev, dateStr]
    );
  };

  const handleSave = () => {
    const weeklySchedule: WeeklySchedule = {
      weekStartDate: format(weekStart, 'yyyy-MM-dd'),
      ondayDates: selectedType === 'onday' ? selectedDates : weekDays.map(d => format(d, 'yyyy-MM-dd')).filter(d => !selectedDates.includes(d)),
      offdayDates: selectedType === 'offday' ? selectedDates : weekDays.map(d => format(d, 'yyyy-MM-dd')).filter(d => !selectedDates.includes(d))
    };
    onSave(weeklySchedule);
    setSelectedDates([]);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar size={20} />
            Plan Your Week
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-3">
              Select which type of days to mark, then choose the dates:
            </p>
            
            <div className="flex gap-2 mb-4">
              <Button 
                variant={selectedType === 'onday' ? 'default' : 'outline'}
                onClick={() => setSelectedType('onday')}
                size="sm"
              >
                Mark Ondays
              </Button>
              <Button 
                variant={selectedType === 'offday' ? 'default' : 'outline'}
                onClick={() => setSelectedType('offday')}
                size="sm"
              >
                Mark Offdays
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {weekDays.map((day) => {
              const dateStr = format(day, 'yyyy-MM-dd');
              const isSelected = selectedDates.includes(dateStr);
              
              return (
                <Card 
                  key={dateStr}
                  className={`p-3 cursor-pointer transition-all hover:shadow-sm ${
                    isSelected ? 'bg-primary/10 border-primary' : 'hover:bg-muted/50'
                  }`}
                  onClick={() => toggleDate(dateStr)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm">
                        {format(day, 'EEE')}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {format(day, 'MMM d')}
                      </div>
                    </div>
                    {isSelected && (
                      <Check size={16} className="text-primary" />
                    )}
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="text-xs text-muted-foreground">
            Selected dates will be <Badge variant="outline" className="text-xs">
              {selectedType}
            </Badge> days. Other days will automatically be the opposite type.
          </div>

          <div className="flex gap-2 pt-2">
            <Button onClick={handleSave} className="flex-1">
              Save Week Plan
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};