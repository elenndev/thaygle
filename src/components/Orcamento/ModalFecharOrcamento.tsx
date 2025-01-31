interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[--devScheme-white] text-[1.5rem] rounded-lg shadow-lg w-full max-w-sm p-6">
        <p className="font-semibold text-[--devScheme-gray]">
          Tem certeza que deseja sair sem salvar o orçamento?
        </p>
        <div className="mt-6 flex justify-end gap-4">
          <button
            className="px-4 py-2 text-white bg-[--devScheme-orange] rounded-md hover:bg[--devScheme-vermelho]"
            onClick={onConfirm}
          >
            Finalizar orçamento
          </button>
          <button
            className="px-4 py-2 text-white bg-[--devScheme-gray] rounded-md hover:bg-gray-950"
            onClick={onClose}
          >
            Sair mesmo assim
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
