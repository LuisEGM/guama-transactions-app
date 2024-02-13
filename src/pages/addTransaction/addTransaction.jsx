import FormTransaction from "../../components/formTransaction";
import Header from "../../components/header";

const AddTransaction = () => {
  return (
    <>
      <Header backButton={true} />
      <div className="row text-center w-100 mt-8 mb-0">
        <h1 className="text-2xl font-semibold text-gray-700">Add transaction</h1>
        <p className="text-default">
          Complete the form to add a new transaction
        </p>
      </div>
      <div className="flex flex-row w-full justify-around mt-10">
          <FormTransaction showSaveButton={true} />
      </div>
    </>
  );
};

export default AddTransaction;
