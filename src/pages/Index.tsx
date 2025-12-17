import { useState, useMemo } from "react";
import { Customer } from "@/types/customer";
import CustomerCard from "@/components/CustomerCard";
import CustomerDetails from "@/components/CustomerDetails";
import AddCustomerForm from "@/components/AddCustomerForm";
import FloatingAddButton from "@/components/FloatingAddButton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ArrowUpAZ, ArrowDownAZ, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const { toast } = useToast();

  const handleAddCustomer = (customerData: Omit<Customer, "id" | "createdAt">) => {
    const newCustomer: Customer = {
      ...customerData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    setCustomers((prev) => [...prev, newCustomer]);
    toast({
      title: "Customer added",
      description: `${customerData.name} has been added successfully.`,
    });
  };

  const handleDeleteCustomer = (id: string) => {
    setCustomers((prev) => prev.filter((c) => c.id !== id));
    toast({
      title: "Customer deleted",
      description: "The customer has been removed.",
    });
  };

  const filteredAndSortedCustomers = useMemo(() => {
    let result = [...customers];

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          c.phoneNumber.toLowerCase().includes(query) ||
          c.address.toLowerCase().includes(query) ||
          c.pageNumber.toLowerCase().includes(query)
      );
    }

    // Sort alphabetically
    result.sort((a, b) => {
      const comparison = a.name.localeCompare(b.name);
      return sortAsc ? comparison : -comparison;
    });

    return result;
  }, [customers, searchQuery, sortAsc]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Users className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold text-foreground">Customer Map</h1>
          </div>

          {/* Search and Sort */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, phone, address..."
                className="pl-9"
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setSortAsc(!sortAsc)}
              title={sortAsc ? "Sort Z-A" : "Sort A-Z"}
            >
              {sortAsc ? (
                <ArrowUpAZ className="w-4 h-4" />
              ) : (
                <ArrowDownAZ className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Customer List */}
      <main className="max-w-2xl mx-auto px-4 py-6 pb-24">
        {filteredAndSortedCustomers.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
              <Users className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="text-lg font-medium text-foreground mb-2">
              {customers.length === 0 ? "No customers yet" : "No results found"}
            </h2>
            <p className="text-muted-foreground">
              {customers.length === 0
                ? "Tap the green button to add your first customer"
                : "Try a different search term"}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredAndSortedCustomers.map((customer) => (
              <CustomerCard
                key={customer.id}
                customer={customer}
                onClick={() => {
                  setSelectedCustomer(customer);
                  setShowDetails(true);
                }}
              />
            ))}
          </div>
        )}
      </main>

      {/* Floating Add Button */}
      <FloatingAddButton onClick={() => setShowAddForm(true)} />

      {/* Add Customer Form */}
      <AddCustomerForm
        open={showAddForm}
        onClose={() => setShowAddForm(false)}
        onAdd={handleAddCustomer}
      />

      {/* Customer Details */}
      <CustomerDetails
        customer={selectedCustomer}
        open={showDetails}
        onClose={() => setShowDetails(false)}
        onDelete={handleDeleteCustomer}
      />
    </div>
  );
};

export default Index;
