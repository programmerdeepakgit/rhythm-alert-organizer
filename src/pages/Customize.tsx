import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Save, Volume2, VolumeX } from "lucide-react";
import { Link } from "react-router-dom";
import { AppSettings, DEFAULT_SETTINGS } from "@/types/settings";
import { toast } from "@/hooks/use-toast";

export const Customize = () => {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    const saved = localStorage.getItem('babes-habit-settings');
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('babes-habit-settings', JSON.stringify(settings));
    toast({
      title: "Settings Saved! ✨",
      description: "Your notification preferences have been updated",
    });
  };

  const testNotification = () => {
    const text = settings.notificationText.replace('{activity}', 'meditation & wake');
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    } else {
      toast({
        title: "Preview",
        description: text,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-background">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 max-w-2xl">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/">
                <ArrowLeft size={20} />
              </Link>
            </Button>
            <div>
              <h1 className="text-xl font-semibold">Customize</h1>
              <p className="text-sm text-muted-foreground">
                Personalize your notification preferences
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-2xl">
        <div className="space-y-6">
          {/* Voice Notifications */}
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {settings.voiceEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
                  <div>
                    <h3 className="font-medium">Voice Notifications</h3>
                    <p className="text-sm text-muted-foreground">
                      Enable spoken alerts for your activities
                    </p>
                  </div>
                </div>
                <Switch 
                  checked={settings.voiceEnabled}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, voiceEnabled: checked }))
                  }
                />
              </div>
            </div>
          </Card>

          {/* Notification Text */}
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-1">Notification Message</h3>
                <p className="text-sm text-muted-foreground">
                  Customize what Babes says when it's time for an activity
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notification-text">Message Template</Label>
                <Input
                  id="notification-text"
                  value={settings.notificationText}
                  onChange={(e) => 
                    setSettings(prev => ({ ...prev, notificationText: e.target.value }))
                  }
                  placeholder="Babes It's Time of {activity}"
                />
                <p className="text-xs text-muted-foreground">
                  Use <code className="bg-muted px-1 rounded">{'{activity}'}</code> to include the task name
                </p>
              </div>

              <Button 
                variant="outline" 
                onClick={testNotification}
                className="w-full"
              >
                <Volume2 size={16} className="mr-2" />
                Test Voice Notification
              </Button>
            </div>
          </Card>

          {/* Save Button */}
          <Button onClick={handleSave} className="w-full bg-gradient-primary shadow-soft">
            <Save size={16} className="mr-2" />
            Save Settings
          </Button>
        </div>
      </main>
    </div>
  );
};