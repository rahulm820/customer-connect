import { Plus } from "lucide-react";

interface FloatingAddButtonProps {
  onClick: () => void;
}

const FloatingAddButton = ({ onClick }: FloatingAddButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary text-primary-foreground fab-shadow hover:scale-105 active:scale-95 transition-transform duration-200 flex items-center justify-center z-50"
      aria-label="Add new customer"
    >
      <Plus className="w-7 h-7" />
    </button>
  );
};

export default FloatingAddButton;
