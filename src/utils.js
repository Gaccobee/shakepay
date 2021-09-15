export const formatDate = (dateString) => {
  if (!dateString || typeof dateString !== "string") return "N/A";
  return new Date(dateString).toLocaleString("default", {
    month: "short",
    day: "2-digit",
  });
};

export const calculateBalanceForCurrency = (transactionList) => {
  const credits = transactionList
    .filter((item) => item.direction === "credit")
    .reduce((a, b) => {
      return a + b.amount;
    }, 0);
  const debits = transactionList
    .filter((item) => item.direction === "debit")
    .reduce((a, b) => {
      return a + b.amount;
    }, 0);

  const balance = credits - debits;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(balance);
};
