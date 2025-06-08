
import { Circle } from 'lucide-react';

export const SentimentLogo = () => {
  return (
    <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full border-2 border-primary/20">
      <div className="relative">
        <Circle className="h-8 w-8 text-primary" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
        </div>
      </div>
    </div>
  );
};
