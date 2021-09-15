import { calculateBalanceForCurrency, formatAsDollars } from "./utils";

test("formatAsDollars success case", () => {
  const result = formatAsDollars(1000);
  expect(result).toEqual("$1,000.00");
});

test("formatAsDollars fail case", () => {
  const result = formatAsDollars();
  expect(result).toEqual(null);
});

test("formatAsDollars fail case - object", () => {
  const result = formatAsDollars({});
  expect(result).toEqual(null);
});

test("formatAsDollars fail case - array", () => {
  const result = formatAsDollars([]);
  expect(result).toEqual(null);
});

test("calculateBalanceForCurrency success case", () => {
  const transactions = [
    { direction: "credit", amount: 100 },
    { direction: "credit", amount: 50 },
    { direction: "debit", amount: 25 },
    { direction: "debit", amount: 25 },
  ];

  const result = calculateBalanceForCurrency(transactions);
  expect(result).toEqual("$100.00");
});

test("calculateBalanceForCurrency fail case", () => {
  const transactions = {};
  const result = calculateBalanceForCurrency(transactions);
  expect(result).toEqual(null);
});
