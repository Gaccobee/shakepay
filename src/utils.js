export const formatDate = (dateString) => {
  if (!dateString || typeof dateString !== "string") return "N/A";
  return new Date(dateString).toLocaleString("default", {
    month: "short",
    day: "2-digit",
  });
};

export const formatAsDollars = (value) => {
  if (!value || typeof value === 'object') return null;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}
  

export const calculateBalanceForCurrency = (transactionList) => {
  if (!transactionList || !Array.isArray(transactionList)) return formatAsDollars(0)

  const credits = transactionList
    .filter((item) => item.direction === "credit")
    .reduce((a, b) => {
      if (b.hasOwnProperty('amount')) {
        return a + b.amount;
      }
      return a + 0;
    }, 0);
  const debits = transactionList
    .filter((item) => item.direction === "debit")
    .reduce((a, b) => {
      if (b.hasOwnProperty('amount')) {
        return a + b.amount;
      }
      return a + b;
    }, 0);

  const balance = credits - debits;

  return formatAsDollars(balance);
};
