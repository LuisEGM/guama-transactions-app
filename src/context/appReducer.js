export function appReducer(state, action) {
  switch (action.type) {
    case "LOAD_TRANSACTIONS":
      return {
        ...state,
        transactions: action.payload.transactionList,
        transactionsFilter: action.payload.transactionList,
      };

    case "CHANGE_TRANSACTION_NAME":
      return { ...state, transactionName: action.payload.name };

    case "CHANGE_TRANSACTION_AMOUNT":
      return { ...state, transactionAmount: action.payload.amount };

    case "CHANGE_CHANGE_STATUS":
      return { ...state, transactionStatus: action.payload.status };

    case "CHANGE_TRANSACTION_DATE":
      return { ...state, transactionDate: action.payload.date };

    case "SET_TRANSACTION_EDIT":
      return { ...state, transactionEdit: action.payload.transaction };

    case "CHANGE_TOAST_INFO":
      return { ...state, toastInfo: action.payload.message };

    default:
      return state;
  }
}
