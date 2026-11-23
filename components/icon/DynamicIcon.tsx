import { icons, type LucideProps } from "lucide-react";

interface IconProps extends LucideProps {
  /** Lucide icon name in kebab case, as in the translation files ("fishing-hook") */
  name: string;
}

/** "fishing-hook" -> "FishingHook", the key of the icon in lucide's catalogue */
const toPascalCase = (name: string) =>
  name.replace(/(^|-)([a-z0-9])/g, (_, __, char: string) => char.toUpperCase());

/**
 * Lucide icon chosen by name. It is a server component, so looking it up in the full
 * catalogue adds nothing to the browser bundle and the icon comes in the initial HTML.
 */
const DynamicIcon = ({ name, ...props }: IconProps) => {
  const Icon = icons[toPascalCase(name) as keyof typeof icons];
  return Icon ? <Icon {...props} /> : null;
};

export default DynamicIcon;
