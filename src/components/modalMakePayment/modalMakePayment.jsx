import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Input,
  Tabs,
  Tab,
  Card,
  CardBody,
  CardFooter,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Table,
  Chip,
} from "@nextui-org/react";
import { useModalMakePayment } from "./useModalMakePayment";
import { amountWithCurrency } from "../../utils/commonUtils";

const statusColorMap = {
  PAID: "success",
  PENDING: "warning",
  DECLINED: "danger",
};

const ModalMakePayment = (props) => {
  const { isOpen, onOpenChange } = props;

  const {
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
  } = useModalMakePayment({ isOpen });

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      backdrop="blur"
      size="2xl"
    >
      <ModalContent>
        {/* eslint-disable-next-line no-unused-vars */}
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1"></ModalHeader>
            <ModalBody>
              <div className="row text-center w-100 mt-1 mb-0">
                <h1 className="text-2xl font-semibold text-gray-700">
                  Make a payment
                </h1>
                {stepSelected === "CONFIRM_PAYMENT" && (
                  <p className="text-gray-500">
                    With {amountWithCurrency(paymentAmount)} COP you can pay the
                    following transactions
                  </p>
                )}
              </div>
              <Tabs
                aria-label="Options"
                color="secondary"
                fullWidth
                size="md"
                selectedKey={stepSelected}
                onSelectionChange={setstepSelected}
                disabledKeys={disabledKeys}
              >
                <Tab key="SET_AMOUNT" title="Set amount">
                  <Card>
                    <CardBody>
                      <div className="flex flex-col gap-4 mb-6">
                        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                          <Input
                            type="number"
                            label="Amount"
                            placeholder="0.00"
                            variant="flat"
                            startContent={
                              <div className="pointer-events-none flex items-center">
                                <span className="text-default-400 text-small">
                                  $
                                </span>
                              </div>
                            }
                            name="paymentAmount"
                            value={paymentAmount}
                            onChange={handlePaymentAmount}
                          />
                        </div>
                      </div>
                    </CardBody>
                    <CardFooter>
                      <Button
                        color="secondary"
                        variant="ghost"
                        size="lg"
                        className="w-full"
                        onClick={handleConfirmAmount}
                      >
                        Confirm amount
                      </Button>
                    </CardFooter>
                  </Card>
                </Tab>
                <Tab key="CONFIRM_PAYMENT" title="Transactions to paid">
                  <Table
                    aria-label="Transactions to paid table"
                    classNames={{
                      wrapper: "max-h-[400px]",
                    }}
                  >
                    <TableHeader>
                      <TableColumn>ID</TableColumn>
                      <TableColumn>NAME</TableColumn>
                      <TableColumn>STATUS</TableColumn>
                      <TableColumn>DATE</TableColumn>
                      <TableColumn>AMOUNT</TableColumn>
                    </TableHeader>
                    <TableBody emptyContent={"No rows to display."}>
                      {transactionsToPaid.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>{transaction.id}</TableCell>
                          <TableCell>{transaction.name}</TableCell>
                          <TableCell>
                            <Chip
                              className="capitalize"
                              color={statusColorMap[transaction.status]}
                              size="sm"
                              variant="dot"
                            >
                              {transaction.status}
                            </Chip>
                          </TableCell>
                          <TableCell>{transaction.date}</TableCell>
                          <TableCell>
                            {amountWithCurrency(transaction.amount)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  {!showCloseButton ? (
                    <Button
                      color="secondary"
                      variant="ghost"
                      size="lg"
                      className="w-full mt-4"
                      onClick={() => handlePaidTransactions()}
                      isLoading={updatingTransactions}
                    >
                      Make payment
                    </Button>
                  ) : (
                    <Button
                      color="secondary"
                      variant="ghost"
                      size="lg"
                      className="w-full mt-4"
                      onClick={onClose}
                    >
                      Close
                    </Button>
                  )}
                </Tab>
              </Tabs>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalMakePayment;
