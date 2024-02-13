import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/globalContext";
import transactionService from "../../services/transactionService";
import { toast } from "sonner";

export const useFormTrasaction = () => {
  const navigate = useNavigate();

  const {
    transactionName,
    changeTransactionName,
    transactionAmount,
    changeTransactionAmount,
    transactionStatus,
    changeTransactionStatus,
    transactionDate,
    changeTransactionDate,
    resetForm,
    changeToastInfo,
  } = useContext(GlobalContext);

  const handleChange = (e) => {
    if (e.target.name === "transactionName") {
      changeTransactionName(e.target.value);
    }
    if (e.target.name === "transactionAmount") {
      changeTransactionAmount(parseFloat(e.target.value));
    }
    if (e.target.name === "transactionStatus") {
      changeTransactionStatus(e.target.value);
    }
    if (e.target.name === "transactionDate") {
      changeTransactionDate(e.target.value);
    }
  };

  const handleCreate = async (e) => {
    try {
      e.preventDefault();
      if (
        transactionName === "" ||
        transactionAmount === 0 ||
        transactionAmount == null ||
        isNaN(transactionAmount) ||
        transactionStatus === "" ||
        transactionDate === ""
      ) {
        toast.warning(
          "Errors in the form...!",
          {
            description: `
              Please complete all the fields correctly:
              Name no empty, Amount greater than 0, Date: Format YYYY-MM-DD HH:MM:SS
            `,
            duration: 5000,
            position: "bottom-right",
            closeButton: true,
          }
        );
        return;
      }

      const result = await transactionService.create({
        name: transactionName,
        amount: transactionAmount,
        status: transactionStatus,
        date: transactionDate,
      });

      console.log("TRANSACTION CREATED => ", result.data);

      resetForm();
      changeToastInfo("info-The transaction has been successfully created.");
      navigate("/transactions");
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.description, {
        duration: 5000,
        position: "bottom-right",
        closeButton: true,
      });
    }
  };

  return {
    handleCreate,
    handleChange,
    transactionName,
    transactionAmount,
    transactionStatus,
    transactionDate,
  };
};
