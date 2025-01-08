import { transliterationMap } from "../constants/transliteration";

export const generateRandomSlug = ({
  stringToGenerate,
  isRandowSuffix = false,
}: {
  stringToGenerate: string;
  isRandowSuffix?: boolean;
}) => {
  const transliterate = (text: string) => {
    return text
      .split("")
      .map((char) => transliterationMap[char] || char)
      .join("");
  };

  let slug = transliterate(stringToGenerate)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  // Add random suffix to slug
  if (isRandowSuffix) {
    const randomSuffix = Math.random().toString(36).substring(2, 6);
    slug = `${slug}-${randomSuffix}`;

    return slug;
  } else {
    return slug;
  }
};
