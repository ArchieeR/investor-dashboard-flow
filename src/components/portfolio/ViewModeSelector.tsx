
import { Button } from '@/components/ui/button';
import { ViewMode } from '@/types/portfolio';

interface ViewModeSelectorProps {
  currentMode: ViewMode;
  onModeChange: (mode: ViewMode) => void;
}

export const ViewModeSelector = ({ currentMode, onModeChange }: ViewModeSelectorProps) => {
  const modes: { key: ViewMode; label: string }[] = [
    { key: 'general', label: 'General' },
    { key: 'strategy', label: 'Strategy' },
    { key: 'account', label: 'Account' }
  ];

  return (
    <div className="flex gap-1 p-1 bg-muted rounded-lg">
      {modes.map((mode) => (
        <Button
          key={mode.key}
          variant={currentMode === mode.key ? "default" : "ghost"}
          size="sm"
          onClick={() => onModeChange(mode.key)}
          className="text-xs"
        >
          {mode.label}
        </Button>
      ))}
    </div>
  );
};
