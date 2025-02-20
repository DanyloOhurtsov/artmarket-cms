export const formatPrice = (price: number) => {
  return price.toLocaleString("uk-UA", {
    style: "currency",
    currency: "UAH",
    currencyDisplay: "symbol",
  });
};
