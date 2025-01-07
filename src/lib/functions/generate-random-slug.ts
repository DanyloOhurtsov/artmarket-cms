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

  let slug = transliterate(stringToGenerate) // Тут передаємо тільки строку
    .toLowerCase() // Зменшуємо регістр
    .replace(/[^a-z0-9\s-]/g, "") // Видаляємо неалфавітні символи
    .replace(/\s+/g, "-") // Замінюємо пробіли на дефіси
    .replace(/-+/g, "-"); // Забираємо повтори дефісів

  // Додаємо випадковий суфікс для унікальності (якщо потрібно)
  if (isRandowSuffix) {
    const randomSuffix = Math.random().toString(36).substring(2, 6); // Генеруємо випадкові 4 символи
    slug = `${slug}-${randomSuffix}`;

    return slug;
  } else {
    return slug;
  }
};
