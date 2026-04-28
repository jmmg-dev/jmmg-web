import { LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import dynamic from "next/dynamic";

interface IconProps extends LucideProps {
  name: string;
}

const DynamicIcon = ({ name, ...props }: IconProps) => {
  const IconComponent = dynamic(
    dynamicIconImports[name as keyof typeof dynamicIconImports],
  );

  return <IconComponent {...props} />;
};

export default DynamicIcon;
