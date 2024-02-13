import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/globalContext";
import { toast } from "sonner";
import { getTransactionsUntilAmountConfirm } from "../../utils/commonUtils";
import transactionService from "../../services/transactionService";

export const useModalMakePayment = (props) => {
  const { isOpen } = props;
  const { transactions, loadTransactions } = useContext(GlobalContext);

  const [paymentAmount, setPaymentAmount] = useState("");
  const [stepSelected, setstepSelected] = useState("SET_AMOUNT");
  const [disabledKeys, setDisabledKeys] = useState(["CONFIRM_PAYMENT"]);
  const [transactionsToPaid, setTransactionsToPaid] = useState([]);
  const [updatingTransactions, setUpdatingTransactions] = useState(false);
  const [showCloseButton, setShowCloseButton] = useState(false);

  const handlePaymentAmount = (e) => {
    setPaymentAmount(Number(e.target.value));
  };

  const calculateTransactionToShow = () => {
    const transactionsPending = transactions.filter(t => t.status === "PENDING");
    const selectedTransactions = getTransactionsUntilAmountConfirm(transactionsPending, paymentAmount);

    if (selectedTransactions.length === 0) {
      toast.warning("There are no transactions to pay with the amount entered", {
        duration: 2500,
        closeButton: true,
        position: "bottom-right",
      });
      setstepSelected("SET_AMOUNT");
      setDisabledKeys(["CONFIRM_PAYMENT"]);
      return;
    }
    setTransactionsToPaid(selectedTransactions);
  }

  const handleConfirmAmount = () => {
    if (paymentAmount <= 0) {
      toast.warning("Please enter a amount to pay greater than 0", {
        duration: 2500,
        closeButton: true,
        position: "bottom-right",
      });
      return;
    }

    setDisabledKeys(["SET_AMOUNT"]);
    setstepSelected("CONFIRM_PAYMENT");

    calculateTransactionToShow();
  }

  useEffect(() => {
    if (isOpen) {
      setstepSelected("SET_AMOUNT");
      setDisabledKeys(["CONFIRM_PAYMENT"]);
      setPaymentAmount("");
      setShowCloseButton(false);
    }
  }, [isOpen]);

  const reloadTransactions = async () => {
    try {
      const result = await transactionService.getAll();
      loadTransactions(result.data.transactions);
      console.log("Data fetch admin", result.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handlePaidTransactions = async () => {
    try {
      setUpdatingTransactions(true);
      const transactionsPending = JSON.parse(JSON.stringify(transactionsToPaid));
      setTransactionsToPaid([]);

      const updatePromises = transactionsPending.map(transaction => transactionService.update(transaction.id, {
        name: transaction.name,
        amount: transaction.amount,
        status: "PAID",
        date: transaction.date,
      }));

      await Promise.all(updatePromises);

      setTransactionsToPaid(transactionsPending.map((transaction) => ({
        ...transaction,
        status: "PAID"
      })));

      const paymentRegister = {
        amount: paymentAmount,
        date: new Date().toISOString(),
        transactions: transactionsPending,
      }
      const paymentsRegister = JSON.parse(localStorage.getItem("paymentsRegister")) || [];
      localStorage.setItem("paymentsRegister", JSON.stringify([...paymentsRegister, paymentRegister]));

      toast.success("Transactions updated successfully", {
        duration: 2500,
        position: "bottom-right",
        closeButton: true,
      });

      await reloadTransactions();
      setUpdatingTransactions(false);
      setShowCloseButton(true);
    }
    catch (error) {
      console.error(error);
      toast.error("Error updating transactions", {
        duration: 5000,
        position: "bottom-right",
        closeButton: true,
      });
    }
  }

  return {
    paymentAmount,
    handlePaymentAmount,
    stepSelected,
    setstepSelected,
    disabledKeys,
    handleConfirmAmount,
    transactionsToPaid,
    handlePaidTransactions,
    updatingTransactions,
    showCloseButton,
  };
};
