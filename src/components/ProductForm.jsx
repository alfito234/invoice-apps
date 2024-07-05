import { Button, Input } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct, updateProduct } from "../redux/productSlice";
import PropTypes from "prop-types";

const ProductForm = ({ product, onClose }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    picture: "",
    stock: 0,
    price: 0,
  });

  useEffect(() => {
    if (product) {
      setFormData({ ...product });
    }
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (product) {
      dispatch(updateProduct(formData)).then(() => {
        onClose();
      });
    } else {
      dispatch(addProduct(formData)).then(() => {
        onClose();
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 px-4">
      {formData.picture && (
        <div className="flex justify-center">
          <div className="w-44 h-44">
            <img
              src={formData.picture}
              className="object-cover aspect-square"
              alt="Product"
            />
          </div>
        </div>
      )}
      <Input
        type="text"
        name="name"
        label="Product Name"
        value={formData.name}
        onChange={handleInputChange}
        required
      />

      <Input
        type="text"
        name="picture"
        label="Product Image URL"
        value={formData.picture}
        onChange={handleInputChange}
        required
      />

      <Input
        type="number"
        name="stock"
        label="Stock"
        value={formData.stock}
        onChange={handleInputChange}
        min="0"
        required
      />

      <Input
        type="number"
        name="price"
        label="Product Price"
        value={formData.price}
        onChange={handleInputChange}
        min="0"
        required
      />

      <Button type="submit">{product ? "Update" : "Add"} Product</Button>
    </form>
  );
};

ProductForm.propTypes = {
  product: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

export default ProductForm;
