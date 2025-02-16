import { v4 as uuid } from "uuid";

import { SeoType } from "../new/seo.schema";

export const SeoDefaultValues: SeoType = {
  id: `seo-${uuid()}`,
  title: "",
  description: "",
  product: undefined,
  collection: undefined,
  variant: undefined,
};
