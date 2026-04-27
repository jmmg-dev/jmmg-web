import { Lang } from "@/models/enums";
import { Information } from "@/models/interfaces";
import { promises as fs } from "fs";
import path from "path";

export const getInformationService = async (
  lang: Lang,
): Promise<Information> => {
  const filePath = path.join(
    process.cwd(),
    "public/information",
    `${lang}.json`,
  );

  const fileContent = await fs.readFile(filePath, "utf8");
  return JSON.parse(fileContent);
};
