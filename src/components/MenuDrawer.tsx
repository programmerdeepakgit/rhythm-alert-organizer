import { Link } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Settings, Home, Calendar } from "lucide-react";

interface MenuDrawerProps {
  open: boolean;
  onClose: () => void;
}

export const MenuDrawer = ({ open, onClose }: MenuDrawerProps) => {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="left" className="w-64">
        <SheetHeader>
          <SheetTitle className="text-left">Menu</SheetTitle>
        </SheetHeader>
        
        <div className="space-y-2 mt-6">
          <Button
            variant="ghost"
            className="w-full justify-start"
            asChild
            onClick={onClose}
          >
            <Link to="/">
              <Home size={16} className="mr-2" />
              Home
            </Link>
          </Button>
          
          <Button
            variant="ghost"
            className="w-full justify-start"
            asChild
            onClick={onClose}
          >
            <Link to="/customize">
              <Settings size={16} className="mr-2" />
              Customize
            </Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};