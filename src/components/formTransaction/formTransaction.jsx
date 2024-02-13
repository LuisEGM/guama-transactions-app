import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useFormTrasaction } from "./useFormTransaction";

const TRANSACTION_STATUS = [
  {
    label: "Paid",
    value: "PAID",
  },
  {
    label: "Pending",
    value: "PENDING",
  },
  {
    label: "Declined",
    value: "DECLINED",
  },
];

const FormTransaction = (props) => {
  const { showSaveButton } = props;

  const {
    handleCreate,
    handleChange,
    transactionName,
    transactionAmount,
    transactionStatus,
    transactionDate,
  } = useFormTrasaction();

  return (
    <Card className="max-w-[500px] w-full">
      <CardBody>
        <div className="w-full flex flex-col gap-4 mb-6">
          <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Input
              type="text"
              variant="flat"
              label="Name"
              name="transactionName"
              labelPlacement="inside"
              onChange={handleChange}
              value={transactionName}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Input
              type="number"
              label="Price"
              placeholder="0.00"
              variant="flat"
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">$</span>
                </div>
              }
              name="transactionAmount"
              onChange={handleChange}
              value={transactionAmount}
            />
          </div>
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mb-6">
          <Select
            items={TRANSACTION_STATUS}
            label="Status"
            onChange={handleChange}
            name="transactionStatus"
            value={transactionStatus}
            defaultSelectedKeys={[transactionStatus]}
            aria-label="Select transaction status"
          >
            {(ts) => (
              <SelectItem key={ts.value}>{ts.label}</SelectItem>
            )}
          </Select>
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mb-6">
          <Input
            type="text"
            variant="flat"
            label="Date"
            labelPlacement="inside"
            placeholder="YYYY-MM-DD HH:MM:SS"
            name="transactionDate"
            onChange={handleChange}
            value={transactionDate}
          />
        </div>
      </CardBody>
      <CardFooter>
        {showSaveButton && (
          <Button
            color="secondary"
            size="lg"
            className="w-full"
            onClick={handleCreate}
          >
            Send transaction
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default FormTransaction;
