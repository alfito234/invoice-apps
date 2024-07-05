import { Typography } from "@material-tailwind/react";
import ProductTable from "../components/ProductTable";

const Products = () => {
  return (
    <div className="w-full p-6 mx-12 my-8 overflow-y-scroll bg-gray-100 shadow-2xl rounded-3xl">
      <Typography variant="h3" className="mb-4">
        Products
      </Typography>
      <div className="mx-4">
        <ProductTable />
      </div>
    </div>
  );
};

export default Products;
