import { Customer } from "@/types/customer";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Phone, MapPin, FileText, User, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CustomerDetailsProps {
  customer: Customer | null;
  open: boolean;
  onClose: () => void;
  onDelete: (id: string) => void;
}

const CustomerDetails = ({ customer, open, onClose, onDelete }: CustomerDetailsProps) => {
  if (!customer) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
              {customer.name.charAt(0).toUpperCase()}
            </div>
            <span>{customer.name}</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
            <Phone className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground">Phone Number</p>
              <p className="font-medium">{customer.phoneNumber}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
            <MapPin className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground">Address</p>
              <p className="font-medium">{customer.address}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
            <FileText className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground">Page Number</p>
              <p className="font-medium">{customer.pageNumber}</p>
            </div>
          </div>

          <Button
            variant="destructive"
            className="w-full mt-4"
            onClick={() => {
              onDelete(customer.id);
              onClose();
            }}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Customer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerDetails;
