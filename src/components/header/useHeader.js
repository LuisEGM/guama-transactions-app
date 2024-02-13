import { useDisclosure } from "@nextui-org/react";

export const useHeader = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleMakePayment = () => {
    onOpen();
  };

  return {
    isOpen,
    onOpenChange,
    handleMakePayment,
  };
};
