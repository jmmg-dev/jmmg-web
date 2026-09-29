type CompanyLogoProps = {
  company: string;
};

export const CompanyLogo = ({ company }: CompanyLogoProps) => {
  const logoClasses = "text-xl font-bold";

  switch (company.toLowerCase()) {
    case "vintegris":
      return (
        <span className={`${logoClasses} text-primary neon-text italic`}>
          vintegris
        </span>
      );
    case "signicat":
      return (
        <span className="bg-emerald-600 text-white px-4 py-1.5 rounded-lg font-bold text-lg">
          Signicat
        </span>
      );
    case "accenture":
      return (
        <span className={`${logoClasses} text-foreground`}>
          accenture<span className="text-purple-500 ml-0.5">{">"}</span>
        </span>
      );
    case "goldenrace":
      return (
        <span
          className={`${logoClasses} uppercase tracking-wider text-foreground`}
        >
          <span className="font-black">Golden</span>
          <span className="font-light">Race</span>
        </span>
      );
    default:
      return (
        <span className={`${logoClasses} text-foreground`}>{company}</span>
      );
  }
};
