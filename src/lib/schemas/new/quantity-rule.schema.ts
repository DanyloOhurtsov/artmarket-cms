import z from "zod";
import { v4 as uuid } from "uuid";
import { variantSchema, VariantType } from "./variant.schema";

export type QuantityRuleType = {
  id: string;
  minimum: number;
  maximum: number;
  variant: VariantType;
};

export const quantityRuleSchema: z.ZodType<QuantityRuleType> = z.object({
  id: z.string() || `quantityRule-${uuid()}`,
  minimum: z.number(),
  maximum: z.number(),
  variant: z.lazy(() => variantSchema),
});
