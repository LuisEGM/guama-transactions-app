export const FORM_DEFAULT_VALUES = {
  name: "Name",
  amount: 0,
  status: "PENDING",
  date: "2024-01-01 01:59:59",
};

export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const amountWithCurrency = (amount) => {
  return amount.toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
  });
};

export const getTransactionsUntilAmountConfirm = (
  transactions,
  amountConfirm
) => {
  let totalAmount = 0;
  const selectedTransactions = [];

  for (const transaction of transactions) {
    totalAmount += transaction.amount;

    if (totalAmount > amountConfirm) {
      break;
    }

    selectedTransactions.push(transaction);
  }

  return selectedTransactions;
};
