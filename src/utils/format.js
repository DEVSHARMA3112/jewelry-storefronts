// Formats a number as US dollars, e.g. 1890 -> "$1,890".
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});
export const money = amount => formatter.format(amount);
