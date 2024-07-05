import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, deleteProduct } from "../redux/productSlice";
import {
  Button,
  Card,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import ProductForm from "./ProductForm";

const ProductTable = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAdd = () => {
    setShowForm(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id)).then(() => {
      dispatch(fetchProducts());
    });
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setSelectedProduct(null);
    setShowForm(false);
    dispatch(fetchProducts());
  };

  const table_head = ["Product Name", "Stock", "Price", "Image", "Action"];

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button onClick={handleAdd} variant="gradient">
          Add Product
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
            {products.map((product) => (
              <tr key={product.id} className="w-full h-48 border-blue-gray-100">
                <td className="p-4 capitalize border-b">{product.name}</td>
                <td className="p-4 border-b">{product.stock}</td>
                <td className="p-4 border-b">Rp. {product.price}</td>
                <td className="w-48 h-full p-4 border-b ">
                  <img
                    src={product.picture}
                    alt={product.name}
                    className="object-cover aspect-square"
                  />
                </td>
                <td className="grid h-48 grid-flow-col gap-4 p-4 place-content-center">
                  <IconButton color="blue" onClick={() => handleEdit(product)}>
                    <PencilIcon className="w-5 h-5" />
                  </IconButton>
                  <IconButton
                    color="red"
                    onClick={() => handleDelete(product.id)}
                  >
                    <TrashIcon className="w-5 h-5" />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <Dialog open={showForm} handler={setShowForm}>
        <DialogHeader>{selectedProduct ? "Edit" : "Add"} Product</DialogHeader>
        <DialogBody>
          <ProductForm product={selectedProduct} onClose={handleFormClose} />
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

export default ProductTable;
