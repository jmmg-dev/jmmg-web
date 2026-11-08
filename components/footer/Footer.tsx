export const Footer = ({ text }: { text: string }) => {
  return (
    <footer className="py-8 border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} JMMG.dev
            <span className="ms-2"> {text} </span>
          </p>
        </div>
      </div>
    </footer>
  );
};
