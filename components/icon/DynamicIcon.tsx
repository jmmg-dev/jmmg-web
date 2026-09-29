import { LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import dynamic from "next/dynamic";
import { ComponentType } from "react";

interface IconProps extends LucideProps {
  name: string;
}

const iconCache: Record<string, ComponentType<LucideProps>> = {};

const DynamicIcon = ({ name, ...props }: IconProps) => {
  if (!iconCache[name]) {
    iconCache[name] = dynamic(
      dynamicIconImports[name as keyof typeof dynamicIconImports],
    );
  }
  const IconComponent = iconCache[name];
  return <IconComponent {...props} />;
};

export default DynamicIcon;
