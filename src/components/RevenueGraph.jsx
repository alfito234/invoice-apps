import {
  Typography,
  Card,
  CardBody,
  CardHeader,
  Select,
  Option,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { fetchRevenue } from "../redux/revenueSlice";

const RevenueGraph = () => {
  const dispatch = useDispatch();
  const { revenue } = useSelector((state) => state.revenue);
  const [timePeriod, setTimePeriod] = useState("daily");

  useEffect(() => {
    dispatch(fetchRevenue(timePeriod));
  }, [dispatch, timePeriod]);

  const processData = () => {
    const categories = revenue.map((item) => item.date);
    const data = revenue.map((item) => item.amount);

    return { categories, data };
  };

  const handleTimePeriod = (val) => {
    setTimePeriod(val);
    dispatch(fetchRevenue(timePeriod));
  };

  const chartData = processData();

  const chartConfig = {
    series: [
      {
        name: "Revenue",
        data: chartData.data,
      },
    ],
    options: {
      chart: {
        type: "line",
        height: 400,
        toolbar: {
          show: false,
        },
      },
      title: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#020617"],
      stroke: {
        lineCap: "round",
        curve: "smooth",
      },
      markers: {
        size: 0,
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: chartData.categories,
      },
      yaxis: {
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#dddddd",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: "dark",
      },
    },
  };

  return (
    <>
      <Card className="mb-5">
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
        >
          <Typography variant="h4" color="blue-gray">
            Line Chart
          </Typography>
        </CardHeader>
        <CardBody className="flex justify-center px-4">
          <div className="w-[700px]">
            <Chart {...chartConfig} />
          </div>
          <div className="w-min">
            <Select
              value={timePeriod}
              onChange={(val) => {
                handleTimePeriod(val);
              }}
            >
              <Option value="daily">Daily</Option>
              <Option value="weekly">Weekly</Option>
              <Option value="monthly">Monthly</Option>
            </Select>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default RevenueGraph;
