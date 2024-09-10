export const formatNumber = (num: number | string) => {
  const formattedValue = num
    .toString()
    .replace(/\D/g, "")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  const rawValue = parseInt(formattedValue.replace(/\./g, ""));

  return { rawValue, formattedValue };
};
