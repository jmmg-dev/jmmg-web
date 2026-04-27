import { Lang } from "@/models/enums";
import { Information } from "@/models/interfaces";
import { getInformationService } from "@/services/information";

export const getInformationAction = async (
  lang: Lang,
): Promise<Information> => {
  try {
    const data = await getInformationService(lang);
    return data;
  } catch (error) {
    throw new Error("Error getting information");
  }
};
