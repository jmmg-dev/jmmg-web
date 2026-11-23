type ProgressBarProps = {
  name: string;
  level: number;
  delay?: number;
};

export const ProgressBar = ({ name, level, delay = 0 }: ProgressBarProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">{name}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <div
          className="progress-bar progress-track h-full rounded-full"
          style={{
            width: `${level}%`,
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
    </div>
  );
};
