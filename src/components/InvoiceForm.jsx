import { useState, useEffect, cloneElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addInvoice,
  updateInvoice,
  fetchInvoiceById,
} from "../redux/invoiceSlice";
import PropTypes from "prop-types";
import {
  Typography,
  Input,
  Button,
  Textarea,
  Select,
  Option,
  IconButton,
} from "@material-tailwind/react";
import { PlusIcon, MinusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { fetchProducts, updateProduct } from "../redux/productSlice";
import { format, parseISO } from "date-fns";

const InvoiceForm = ({ invoiceId, onClose }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const invoice = useSelector((state) =>
    state.invoices.invoices.find((inv) => inv.id === invoiceId)
  );

  const [formData, setFormData] = useState({
    date: "",
    customerName: "",
    salespersonName: "",
    notes: "",
    products: [],
    totalAmount: 0,
  });

  const [currentProduct, setCurrentProduct] = useState({
    name: "",
    price: 0,
    quantity: 1,
    amount: 0,
  });

  const [productList, setProductList] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts());
    if (invoiceId) {
      dispatch(fetchInvoiceById(invoiceId));
    }
  }, [dispatch, invoiceId]);

  useEffect(() => {
    if (invoice) {
      const parsedProducts = JSON.parse(invoice.products);
      setFormData({
        ...invoice,
        date: format(parseISO(invoice.date), "yyyy-MM-dd"),
        products: parsedProducts,
        totalAmount: parsedProducts.reduce((sum, prod) => sum + prod.amount, 0),
      });
      setProductList(parsedProducts);
    }
  }, [invoice]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddProduct = () => {
    const product = products.find((p) => p.name === currentProduct.name);
    if (product) {
      const quantityToAdd = parseInt(currentProduct.quantity);
      if (quantityToAdd > product.stock) {
        alert(
          `Stock of ${product.name} is insufficient! Available: ${product.stock}`
        );
        return;
      }

      const updatedProduct = {
        ...product,
        quantity: quantityToAdd,
        amount: product.price * quantityToAdd,
      };

      const existingProductIndex = productList.findIndex(
        (p) => p.name === currentProduct.name
      );

      let updatedProductList;
      if (existingProductIndex > -1) {
        updatedProductList = [...productList];
        updatedProductList[existingProductIndex].quantity += quantityToAdd;
        updatedProductList[existingProductIndex].amount +=
          product.price * quantityToAdd;
      } else {
        updatedProductList = [...productList, updatedProduct];
      }

      setProductList(updatedProductList);
      setFormData((prevState) => ({
        ...prevState,
        totalAmount: updatedProductList.reduce(
          (sum, prod) => sum + prod.amount,
          0
        ),
      }));
    }
  };

  const handleRemoveProduct = (name) => {
    const updatedProductList = productList.filter((p) => p.name !== name);
    setProductList(updatedProductList);
    setFormData((prevState) => ({
      ...prevState,
      totalAmount: updatedProductList.reduce(
        (sum, prod) => sum + prod.amount,
        0
      ),
    }));
  };

  const handleReduceProductQuantity = (productName) => {
    const productIndex = productList.findIndex((p) => p.name === productName);
    if (productIndex > -1) {
      const updatedProductList = [...productList];
      if (updatedProductList[productIndex].quantity > 1) {
        updatedProductList[productIndex].quantity -= 1;
        updatedProductList[productIndex].amount -=
          updatedProductList[productIndex].price;
      } else {
        updatedProductList.splice(productIndex, 1);
      }
      setProductList(updatedProductList);
      setFormData((prevState) => ({
        ...prevState,
        totalAmount: updatedProductList.reduce(
          (sum, prod) => sum + prod.amount,
          0
        ),
      }));
    }
  };

  const updateProductStock = (products) => {
    products.forEach((product) => {
      const updatedStock = product.stock - product.quantity;
      dispatch(updateProduct({ ...product, stock: updatedStock }));
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      products: productList,
    };

    if (invoiceId) {
      dispatch(updateInvoice(updatedFormData)).then(() => {
        updateProductStock(productList);
        onClose();
      });
    } else {
      dispatch(addInvoice(updatedFormData)).then(() => {
        updateProductStock(productList);
        onClose();
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid px-4 gap-y-4">
      <Input
        type="date"
        name="date"
        label="Date"
        value={formData.date}
        onChange={handleInputChange}
        required
      />
      <Input
        type="text"
        name="customerName"
        label="Customer Name"
        value={formData.customerName}
        onChange={handleInputChange}
        required
      />
      <Input
        type="text"
        name="salespersonName"
        label="Salesperson Name"
        value={formData.salespersonName}
        onChange={handleInputChange}
        required
      />
      <Textarea
        name="notes"
        label="Notes"
        value={formData.notes}
        onChange={handleInputChange}
      />
      <div className="flex gap-2">
        <Select
          label="Products"
          name="name"
          onChange={(e) =>
            handleProductChange({ target: { name: "name", value: e } })
          }
          selected={(element) =>
            element &&
            cloneElement(element, {
              disabled: true,
              className:
                "flex items-center opacity-100 px-0 gap-2 pointer-events-none",
            })
          }
        >
          {products.map((product) => (
            <Option
              key={product.id}
              value={product.name}
              className="flex items-center gap-2"
            >
              <img
                src={product.picture}
                alt={product.name}
                className="object-cover w-6 h-6 rounded-lg"
              />
              <div>
                <Typography>
                  {product.name} - Rp. {product.price}
                </Typography>
              </div>
            </Option>
          ))}
        </Select>
        <Input
          type="number"
          name="quantity"
          label="Quantity"
          value={currentProduct.quantity}
          onChange={handleProductChange}
          min="1"
        />

        <div>
          <IconButton onClick={handleAddProduct}>
            <PlusIcon className="text-white size-4" />
          </IconButton>
        </div>
      </div>
      <div className="grid gap-2 p-2 overflow-y-scroll">
        {Array.isArray(productList) &&
          productList.map((product, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-x-3">
                <img
                  src={product.picture}
                  alt={product.name}
                  className="object-cover w-20 h-20 rounded-md"
                />
                <div>
                  <Typography variant="h6" className="capitalize">
                    {product.name}
                  </Typography>
                  <Typography className="capitalize">
                    Rp. {product.price}
                  </Typography>
                </div>
                <Typography variant="h6">x {product.quantity}</Typography>
              </div>
              <Typography className="py-4">Rp. {product.amount}</Typography>
              <div className="flex gap-2">
                <Button
                  onClick={() => handleReduceProductQuantity(product.name)}
                >
                  <MinusIcon className="text-white size-4" />
                </Button>
                <Button onClick={() => handleRemoveProduct(product.name)}>
                  <TrashIcon className="text-white size-4" />
                </Button>
              </div>
            </div>
          ))}
      </div>
      <Typography className="mt-4 border-t border-gray-500 text-end">
        Total Price: Rp. {formData.totalAmount}
      </Typography>
      <Button type="submit">{invoiceId ? "Update" : "Add"} Invoice</Button>
    </form>
  );
};

InvoiceForm.propTypes = {
  invoiceId: PropTypes.number,
  onClose: PropTypes.func.isRequired,
};

export default InvoiceForm;
