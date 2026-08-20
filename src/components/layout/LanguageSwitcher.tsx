import { useI18n, type Locale } from "@/lib/i18n";

const options: Locale[] = ["nl", "en"];

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();

  return (
    <div
      className="flex items-center rounded-sm border border-border"
      role="group"
      aria-label="Language"
    >
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => setLocale(option)}
          aria-pressed={locale === option}
          className={`label-caps px-2 py-1 transition-colors ${
            locale === option
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
