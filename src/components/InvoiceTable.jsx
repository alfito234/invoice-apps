import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteInvoice, fetchInvoices } from "../redux/invoiceSlice";
import {
  Card,
  Typography,
  IconButton,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import InvoiceForm from "./InvoiceForm";

const InvoiceTable = () => {
  const dispatch = useDispatch();
  const { invoices, currentPage, pageSize, total } = useSelector(
    (state) => state.invoices
  );
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(fetchInvoices({ page: currentPage, limit: pageSize }));
  }, [dispatch, currentPage, pageSize]);

  const handleDelete = (id) => {
    dispatch(deleteInvoice(id)).then(() => {
      dispatch(fetchInvoices({ page: currentPage, limit: pageSize }));
    });
  };

  const handleEdit = (id) => {
    setSelectedInvoiceId(id);
    setShowForm(true);
  };

  const handleAdd = () => {
    setSelectedInvoiceId(null);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setSelectedInvoiceId(null);
    setShowForm(false);
    dispatch(fetchInvoices({ page: currentPage, limit: pageSize }));
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(total / pageSize)) {
      dispatch({ type: "invoices/setPage", payload: currentPage + 1 });
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      dispatch({ type: "invoices/setPage", payload: currentPage - 1 });
    }
  };

  const table_head = [
    "Customer Name",
    "Salesperson Name",
    "Total Amount Paid",
    "Notes",
    "Action",
  ];

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button onClick={handleAdd} variant="gradient">
          Add Invoice
        </Button>
      </div>
      <Card className="w-full h-full">
        <table className="w-full text-center table-auto min-w-max">
          <thead>
            <tr>
              {table_head.map((head) => (
                <th key={head} className="p-4 border-b border-blue-gray-100">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr
                key={invoice.id}
                className="w-full h-full border-blue-gray-100"
              >
                <td className="p-4 capitalize border-b">
                  {invoice.customerName}
                </td>
                <td className="p-4 border-b">{invoice.salespersonName}</td>
                <td className="p-4 border-b">Rp. {invoice.totalAmount}</td>
                <td className="p-4 border-b">{invoice.notes}</td>
                <td className="grid grid-flow-col gap-4 p-4 place-content-center">
                  <IconButton
                    color="blue"
                    onClick={() => handleEdit(invoice.id)}
                  >
                    <PencilIcon className="w-5 h-5" />
                  </IconButton>
                  <IconButton
                    color="red"
                    onClick={() => handleDelete(invoice.id)}
                  >
                    <TrashIcon className="w-5 h-5" />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-center gap-8 my-4">
          <IconButton
            size="sm"
            variant="outlined"
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            <ArrowLeftIcon strokeWidth={2} className="w-4 h-4" />
          </IconButton>
          <Typography color="gray" className="font-normal">
            Page <strong className="text-gray-900">{currentPage}</strong> of{" "}
            <strong className="text-gray-900">
              {Math.ceil(total / pageSize)}
            </strong>
          </Typography>
          <IconButton
            size="sm"
            variant="outlined"
            onClick={nextPage}
            disabled={currentPage === Math.ceil(total / pageSize)}
          >
            <ArrowRightIcon strokeWidth={2} className="w-4 h-4" />
          </IconButton>
        </div>
      </Card>
      <Dialog open={showForm} handler={setShowForm}>
        <DialogHeader>
          {selectedInvoiceId ? "Edit" : "Add"} Invoice
        </DialogHeader>
        <DialogBody>
          <InvoiceForm
            invoiceId={selectedInvoiceId}
            onClose={handleFormClose}
          />
        </DialogBody>
        <DialogFooter>
          <Button color="red" onClick={handleFormClose} className="mr-1">
            <span>Close</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default InvoiceTable;
