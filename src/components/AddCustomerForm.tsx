import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Customer } from "@/types/customer";

interface AddCustomerFormProps {
  open: boolean;
  onClose: () => void;
  onAdd: (customer: Omit<Customer, "id" | "createdAt">) => void;
}

const AddCustomerForm = ({ open, onClose, onAdd }: AddCustomerFormProps) => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [pageNumber, setPageNumber] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAdd({
      name: name.trim(),
      phoneNumber: phoneNumber.trim(),
      address: address.trim(),
      pageNumber: pageNumber.trim(),
    });

    setName("");
    setPhoneNumber("");
    setAddress("");
    setPageNumber("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Customer</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter customer name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter phone number"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter address"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pageNumber">Page Number</Label>
            <Input
              id="pageNumber"
              value={pageNumber}
              onChange={(e) => setPageNumber(e.target.value)}
              placeholder="Enter page number"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" className="flex-1" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Add Customer
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCustomerForm;
