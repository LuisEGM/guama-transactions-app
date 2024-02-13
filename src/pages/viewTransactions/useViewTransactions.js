import { useEffect, useContext, useState } from "react";
import { GlobalContext } from "../../context/globalContext";
import transactionService from "../../services/transactionService";
import { toast } from "sonner";

export const useViewTransactions = () => {

  const { loadTransactions, toastInfo, changeToastInfo } =
    useContext(GlobalContext);
  const [loader, setLoader] = useState(true);
  const [reloadTrigger, setReloadTrigger] = useState(true);

  useEffect(() => {
    if (toastInfo !== "") {
      let info = toastInfo.split("-");
      switch (info[0]) {
        case "info":
          toast.info(info[1], {
            duration: 2500,
            position: "bottom-center",
            closeButton: true,
          });
          break;
        case "warn":
          toast.warn(info[1], {
            duration: 2500,
            position: "bottom-center",
            closeButton: true,
          });
          break;
      }
      changeToastInfo("");
    }
  }, [toastInfo, changeToastInfo]);

  useEffect(() => {
    (async () => {
      try {
        const result = await transactionService.getAll();
        setLoader(false);
        loadTransactions(result.data.transactions);
        console.log("Data fetch admin", result.data);
      } catch (error) {
        console.log(error);
        toast.warn("An error occurred while trying to load the transactions.", {
          duration: 5000,
          position: "top-right",
          closeButton: true,
        });
      }
    })();
  }, [reloadTrigger, loadTransactions]);

  return {
    loader,
    reloadTrigger,
    setReloadTrigger,
  };
};
