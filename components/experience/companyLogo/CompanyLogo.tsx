type CompanyLogoProps = {
  company: string;
};

export const CompanyLogo = ({ company }: CompanyLogoProps) => {
  return (
    <span className="text-xl font-bold text-foreground">{company}</span>
  );
};
