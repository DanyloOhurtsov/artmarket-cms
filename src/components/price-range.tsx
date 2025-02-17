import { formatPrice } from "@/lib/functions/format-price";

interface PriceRangeProps {
  minPrice: number;
  maxPrice: number;
}

const PriceRange = ({ maxPrice, minPrice }: PriceRangeProps) => {
  return (
    <div>
      {minPrice === maxPrice ? (
        <p>{formatPrice(minPrice)}</p>
      ) : (
        <p>
          {formatPrice(minPrice)} - {formatPrice(maxPrice)}
        </p>
      )}
    </div>
  );
};

export default PriceRange;
