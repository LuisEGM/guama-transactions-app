import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import FormTransaction from "../formTransaction";
import { useModalTransactionEdit } from "./useModalTransactionEdit";

const ModalTransactionEdit = (props) => {

  const { reloadTriggerFunction, reloadTriggerValue, isOpen, onOpenChange } = props;

  const { handleEdit } = useModalTransactionEdit({
    reloadTriggerFunction,
    reloadTriggerValue,
    onOpenChange,
  });

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
      <ModalContent>
          {/* eslint-disable-next-line no-unused-vars */}
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1"></ModalHeader>
              <ModalBody>
                <div className="row text-center w-100 mt-1 mb-0">
                  <h1 className="text-2xl font-semibold text-gray-700">Update transaction</h1>
                  <p className="text-default">
                    Complete the form to add a update transaction
                  </p>
                </div>
                <FormTransaction showSaveButton={false} />
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" size="lg" className="w-full" onClick={handleEdit}>
                  Update transaction
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
    </Modal>
  );
};

export default ModalTransactionEdit;
