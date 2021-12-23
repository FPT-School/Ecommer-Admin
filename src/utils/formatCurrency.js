// export const formatCurrency = (value, currency) => {
//   const formatter = new Intl.NumberFormat('vi', {
//     style: 'currency',
//     currency,
//     minimumFractionDigits: 2,
//   });
//   return formatter.format(value);
// };

// x.toLocaleString('vi', {style : 'currency', currency : 'VND'});

export const formatCurrency = (money) =>
  money.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})