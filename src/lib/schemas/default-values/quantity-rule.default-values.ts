import { v4 as uuid } from "uuid";

import { QuantityRuleType } from "../new/quantity-rule.schema";
import { VariantDefaultValues } from "./variant.default-values";

export const QuantityRuleDefaultValues: QuantityRuleType = {
  id: `quantity-rule-${uuid()}`,
  minimum: 0,
  maximum: 0,
  variant: VariantDefaultValues,
};
