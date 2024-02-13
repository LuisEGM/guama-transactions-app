import { createContext, useReducer, useMemo, useCallback } from "react";
import { appReducer } from "./appReducer";
import { FORM_DEFAULT_VALUES } from "../utils/commonUtils";

const initialState = {
  transactions: [],
  transactionsFilter: [],

  transactionName: FORM_DEFAULT_VALUES.name,
  transactionAmount: FORM_DEFAULT_VALUES.amount,
  transactionStatus: FORM_DEFAULT_VALUES.status,
  transactionDate: FORM_DEFAULT_VALUES.date,

  transactionEdit: null,
  toastInfo: "",
};

export const GlobalContext = createContext(initialState);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const loadTransactions = useCallback((transactionList) => {
    dispatch({ type: "LOAD_TRANSACTIONS", payload: { transactionList } });
  }, [dispatch]);

  const changeTransactionName = useCallback((name) => {
    dispatch({ type: "CHANGE_TRANSACTION_NAME", payload: { name } });
  }, [dispatch]);

  const changeTransactionAmount = useCallback((amount) => {
    dispatch({ type: "CHANGE_TRANSACTION_AMOUNT", payload: { amount } });
  }, [dispatch]);

  const changeTransactionStatus = useCallback((status) => {
    dispatch({ type: "CHANGE_CHANGE_STATUS", payload: { status } });
  }, [dispatch]);

  const changeTransactionDate = useCallback((date) => {
    dispatch({ type: "CHANGE_TRANSACTION_DATE", payload: { date } });
  }, [dispatch]);

  const setTransactionEdit = useCallback((transaction) => {
    changeTransactionName(transaction.name);
    changeTransactionAmount(transaction.amount);
    changeTransactionStatus(transaction.status);
    changeTransactionDate(transaction.date);
    dispatch({ type: "SET_TRANSACTION_EDIT", payload: { transaction } });
  }, [changeTransactionName, changeTransactionAmount, changeTransactionStatus, changeTransactionDate, dispatch]);

  const resetForm = useCallback(() => {
    changeTransactionName(FORM_DEFAULT_VALUES.name);
    changeTransactionAmount(FORM_DEFAULT_VALUES.amount);
    changeTransactionStatus(FORM_DEFAULT_VALUES.status);
    changeTransactionDate(FORM_DEFAULT_VALUES.date);
  }, [changeTransactionName, changeTransactionAmount, changeTransactionStatus, changeTransactionDate]);

  const changeToastInfo = useCallback((message) => {
      dispatch({ type: "CHANGE_TOAST_INFO", payload: { message } });
    }, [dispatch]);

  return useMemo(() => (
    <GlobalContext.Provider
      value={{
        ...state,
        changeTransactionName,
        changeTransactionAmount,
        changeTransactionStatus,
        changeTransactionDate,
        setTransactionEdit,
        loadTransactions,
        resetForm,
        changeToastInfo,
      }}
    >
      {children}
    </GlobalContext.Provider>
  ), [state, changeTransactionName, changeTransactionAmount, changeTransactionStatus, changeTransactionDate, setTransactionEdit, loadTransactions, changeToastInfo, children, resetForm]);
};
