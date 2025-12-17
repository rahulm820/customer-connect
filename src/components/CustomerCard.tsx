import { Customer } from "@/types/customer";
import { ChevronRight, Phone, MapPin, FileText } from "lucide-react";

interface CustomerCardProps {
  customer: Customer;
  onClick: () => void;
}

const CustomerCard = ({ customer, onClick }: CustomerCardProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between p-4 bg-card rounded-lg border border-border hover:border-primary/30 hover:shadow-md transition-all duration-200 group text-left"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-lg">
          {customer.name.charAt(0).toUpperCase()}
        </div>
        <span className="font-medium text-foreground">{customer.name}</span>
      </div>
      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
    </button>
  );
};

export default CustomerCard;
