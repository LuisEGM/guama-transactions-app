import { useContext } from "react";
import { GlobalContext } from "../../context/globalContext";
import transactionService from "../../services/transactionService";
import { toast } from "sonner";

export const useModalTransactionEdit = (props) => {
  const { reloadTriggerValue, reloadTriggerFunction, onOpenChange } = props;

  const {
    transactionName,
    transactionAmount,
    transactionStatus,
    transactionDate,
    resetForm,
    transactionEdit,
    changeToastInfo,
  } = useContext(GlobalContext);

  const handleEdit = async (e) => {
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
        toast.warning("Errors in the form...!", {
          description: `
            Please complete all the fields correctly:
            Name no empty, Amount greater than 0, Date: Format YYYY-MM-DD HH:MM:SS
          `,
          duration: 5000,
          position: "bottom-center",
          closeButton: true,
        });
        return;
      }

      const result = await transactionService.update(transactionEdit.id, {
        name: transactionName,
        amount: transactionAmount,
        status: transactionStatus,
        date: transactionDate,
      });

      console.log("TRANSACTION UPDATED => ", result.data);

      onOpenChange(false);
      resetForm();
      changeToastInfo(
        `info-The transaction with id ${transactionEdit.id} has been updated.`
      );
      reloadTriggerFunction(!reloadTriggerValue);
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.description, {
        duration: 5000,
        position: "bottom-right",
        closeButton: true,
      });
    }
  };

  return { handleEdit };
};
