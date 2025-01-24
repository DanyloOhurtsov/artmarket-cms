import { QuantityRuleType } from "../new/quantity-rule.schema";
import { VariantDefaultValues } from "./variant.default-values";

export const QuantityRuleDefaultValues: QuantityRuleType = {
  id: "",
  minimum: 0,
  maximum: 0,
  variant: VariantDefaultValues,
};
