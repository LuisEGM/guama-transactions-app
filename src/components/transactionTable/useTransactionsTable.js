import { useContext } from "react";
import { GlobalContext } from "../../context/globalContext";
import transactionService from "../../services/transactionService";
import { toast } from "sonner";
import { useDisclosure } from "@nextui-org/react";

export const useTransactionsTable = (props) => {

  const { reloadTriggerFunction, reloadTriggerValue } = props;
  const {
    transactions,
    setTransactionEdit,
  } = useContext(GlobalContext);

  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const handleDelete = async (id) => {
    try {
      const result = await transactionService.remove(id);

      console.log("TRANSACTION DELETED => ", result.data);

      toast.success(`The transaction with id <${id}> was removed.`, {
        duration: 2500,
        position: "bottom-right",
        closeButton: true,
      });

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

  const handleEdit = (transaction) => {
    setTransactionEdit(transaction);
    onOpen();
  };

  return {
    transactions,
    handleDelete,
    handleEdit,
    isOpen,
    onOpen,
    onOpenChange
  };
};
