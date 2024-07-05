import express from "express";
import {
  createInvoice,
  deleteInvoice,
  getInvoiceById,
  getInvoices,
  getRevenue,
  updateInvoice,
} from "../controllers/invoiceController.js";

const router = express.Router();

router.post("/invoices", createInvoice);
router.get("/invoices", getInvoices);
router.get("/invoices/:id", getInvoiceById);
router.put("/invoices/:id", updateInvoice);
router.delete("/invoices/:id", deleteInvoice);
router.get("/revenue", getRevenue);

export default router;
