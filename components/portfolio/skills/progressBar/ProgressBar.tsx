type ProgressBarProps = {
  name: string;
  level: number;
  delay?: number;
};

export const ProgressBar = ({ name, level, delay = 0 }: ProgressBarProps) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-foreground">{name}</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full rounded-full progress-bar progress-track"
          style={{
            width: `${level}%`,
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
    </div>
  );
};
