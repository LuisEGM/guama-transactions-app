import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import Header from "../../components/header";
import { amountWithCurrency } from "../../utils/commonUtils";

const Payments = () => {
  const payments = JSON.parse(localStorage.getItem("paymentsRegister")) || [];

  return (
    <>
      <Header backButton={true} />
      <div className="max-w-[1024px] mt-4 mx-auto px-6">
        <Table
          aria-label="Transactions to paid table"
          classNames={{
            wrapper: "max-h-[1000px]",
          }}
          isStriped
        >
          <TableHeader>
            <TableColumn>AMOUNT</TableColumn>
            <TableColumn>DATE</TableColumn>
            <TableColumn>TRASACTIONS</TableColumn>
          </TableHeader>
          <TableBody emptyContent={"No rows to display."}>
            {payments.map((payment, index) => (
              <TableRow key={index}>
                <TableCell>{amountWithCurrency(payment.amount)}</TableCell>
                <TableCell>{payment.date}</TableCell>
                <TableCell>{
                  <ul>
                    {payment.transactions.map((transaction, index) => (
                      <>
                        <li key={index}>
                          <p><strong>Id: </strong>{transaction.id}</p>
                          <p><strong>Name: </strong>{transaction.name}</p>
                          <p><strong>Amount: </strong>{amountWithCurrency(transaction.amount)}</p>
                          <p><strong>Status: </strong>{transaction.status}</p>
                          <p><strong>Date: </strong>{transaction.date}</p>
                        </li>
                        <br />
                      </>
                    ))}
                  </ul>
                }</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default Payments;
