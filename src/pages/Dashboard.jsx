import { Typography } from "@material-tailwind/react";
import RevenueGraph from "../components/RevenueGraph";

const Dashboard = () => {
  return (
    <div className="w-full p-6 mx-12 my-8 overflow-y-scroll bg-gray-100 shadow-2xl rounded-3xl">
      <Typography variant="h3" className="mb-4">
        Dashboard
      </Typography>
      <div className="mx-4">
        <RevenueGraph />
      </div>
    </div>
  );
};

export default Dashboard;
