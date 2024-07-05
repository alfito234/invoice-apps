import db from "../config/database.js";
import Invoice from "../models/invoice.js";
import { parseISO, format } from "date-fns";

export const createInvoice = async (req, res) => {
  try {
    const { date, ...otherFields } = req.body;
    const formattedDate = format(parseISO(date), "yyyy-MM-dd");

    const invoice = await Invoice.create({
      ...otherFields,
      date: formattedDate,
    });
    res.status(201).json(invoice);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getInvoices = async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const offset = (page - 1) * limit;

  try {
    const { count, rows } = await Invoice.findAndCountAll({
      limit,
      offset,
    });
    res.json({
      total: count,
      invoices: rows,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findByPk(req.params.id);
    if (invoice) {
      res.json(invoice);
    } else {
      res.status(404).json({ error: "Invoice not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateInvoice = async (req, res) => {
  try {
    const { date, ...otherFields } = req.body;
    const formattedDate = format(parseISO(date), "yyyy-MM-dd"); // Parse and format date

    const [updated] = await Invoice.update(
      {
        ...otherFields,
        date: formattedDate,
      },
      {
        where: { id: req.params.id },
      }
    );
    if (updated) {
      const updatedInvoice = await Invoice.findByPk(req.params.id);
      res.json(updatedInvoice);
    } else {
      res.status(404).json({ error: "Invoice not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteInvoice = async (req, res) => {
  try {
    const deleted = await Invoice.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: "Invoice not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getRevenue = async (req, res) => {
  const { period } = req.query;

  let groupBy = "";
  if (period === "daily") {
    groupBy = "DATE(date)";
  } else if (period === "weekly") {
    groupBy = "YEARWEEK(date)";
  } else if (period === "monthly") {
    groupBy = "YEAR(date), MONTH(date)";
  } else {
    return res.status(400).json({ error: "Invalid period parameter" });
  }

  try {
    const revenueData = await db.query(
      `SELECT ${groupBy} as date, SUM(totalAmount) as amount FROM invoices GROUP BY ${groupBy} ORDER BY date ASC`,
      { type: db.QueryTypes.SELECT }
    );

    res.json(revenueData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
