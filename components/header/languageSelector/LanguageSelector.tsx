import { Lang } from "@/models/enums";

type LanguageSelectorProps = {
  selectedLang: Lang;
  onSelect: (lang: Lang) => void;
};

export const LanguageSelector = ({
  selectedLang,
  onSelect,
}: LanguageSelectorProps) => {
  return (
    <div className="flex items-center rounded-lg border border-border bg-secondary/50 p-0.5">
      {[Lang.en, Lang.es].map((lang) => (
        <button
          key={lang.toUpperCase()}
          onClick={() => onSelect(lang)}
          className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all duration-200 ${
            selectedLang === lang
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
};
