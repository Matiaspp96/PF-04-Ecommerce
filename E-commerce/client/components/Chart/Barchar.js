import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Box } from "@chakra-ui/react";
import { Bar } from "react-chartjs-2";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../redux/actions/admin.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const options = {
  fill: true,
  scales: {
    y: {
      min: 0,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "Orders by Payment Status",
    },
  },
};

const Barchar = () => {
  const dispatch = useDispatch();
  const totalOrders = useSelector((state) => state.adminReducer.totalOrders);
  const labels = ["payment not started", "rejected", "approved", "cancelled"];

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const ordersByStatus = (arr, status) => {
    let orders = 0;
    arr.map((ord) => {
      if (ord.statusPay === status) orders++;
    });
    return orders;
  };

  const data = useMemo(
    function () {
      return {
        datasets: [
          {
            tension: 0.3,
            data: [
              ordersByStatus(totalOrders, "payment not started"),
              ordersByStatus(totalOrders, "rejected"),
              ordersByStatus(totalOrders, "approved"),
              ordersByStatus(totalOrders, "cancelled"),
            ],
            backgroundColor: [
              "rgb(255, 205, 86)",
              "rgb(75, 192, 192)",
              "rgb(54, 162, 235)",
              "rgb(255, 99, 132)",
            ],
          },
        ],
        labels,
      };
    },
    [totalOrders]
  );

  return (
    <>
      {totalOrders && (
        <Box
          bgColor={"white"}
          boxShadow="xl"
          m={".5rem"}
          p={"1rem"}
          borderRadius={5}
        >
          <Bar data={data} options={options} />
        </Box>
      )}
    </>
  );
};

export default Barchar;
