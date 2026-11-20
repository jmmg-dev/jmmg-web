import { Coffee, type LucideIcon } from "lucide-react";

export const SITE_URL = "https://jmmg.dev";
export const GITHUB_ORG = "https://github.com/jmmg-dev";

/** Anchor of the donations section on the home page */
export const SUPPORT_ID = "support";

/**
 * Ways to support my projects, shown as buttons in the donations section (the first one is the
 * main button). To add one, add an entry here and its button text under support.methods in
 * public/information/{en,es}.json.
 */
export const SUPPORT_METHODS: { id: string; url: string; icon: LucideIcon }[] = [
  { id: "kofi", url: "https://ko-fi.com/jmmgdev", icon: Coffee },
];
