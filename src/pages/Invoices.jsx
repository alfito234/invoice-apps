import { Typography } from "@material-tailwind/react";
import InvoiceTable from "../components/InvoiceTable";
// import InvoiceForm from "../components/InvoiceForm";

const Invoices = () => {
  // const [open, setOpen] = useState(false);

  // const handleOpen = () => setOpen(!open);
  return (
    <div className="w-full p-6 mx-12 my-8 overflow-y-scroll bg-gray-100 shadow-2xl rounded-3xl">
      <Typography variant="h3" className="mb-4">
        Invoices
      </Typography>
      <div className="mx-4">
        {/* <div className="flex justify-end mb-4">
          <Button onClick={handleOpen} variant="gradient">
            Add Invoice
          </Button>
        </div>
        <Dialog size="xl" open={open} handler={handleOpen}>
          <DialogHeader>Add New Invoice</DialogHeader>
          <DialogBody>
            <InvoiceForm />
          </DialogBody>
          <DialogFooter>
            <Button variant="gradient" color="red" onClick={handleOpen}>
              <span>Close</span>
            </Button>
          </DialogFooter>
        </Dialog> */}
        <InvoiceTable />
      </div>
    </div>
  );
};

export default Invoices;
