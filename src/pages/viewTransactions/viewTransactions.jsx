import TransactionsTable from "../../components/transactionTable";
import Header from "../../components/header";
import Loader from "../../components/loader";
import { useViewTransactions } from "./useViewTransactions";

const ViewTransactions = () => {
  const { loader, reloadTrigger, setReloadTrigger } = useViewTransactions();

  return (
    <>
      <Header backButton={false} />
      {!loader ? (
        <div className="max-w-[1024px] mt-4 mx-auto px-6">
          <TransactionsTable
            reloadTriggerFunction={setReloadTrigger}
            reloadTriggerValue={reloadTrigger}
          />
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ViewTransactions;
