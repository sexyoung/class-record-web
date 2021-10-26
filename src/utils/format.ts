export  const formatMoney = (money: number) => {
  return new Intl.NumberFormat().format(money);
};