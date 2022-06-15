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

import { Bar } from "react-chartjs-2";
import { BASEURL } from "../../redux/actions/products";
import { configAxios } from "../../utils/axiosConfig";
import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../redux/actions/admin.js";
import { Text } from "@chakra-ui/react";

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
//   animations: false,
  scales: {
    y: {
      min: 0,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      display: true,
    },
  },
};

const Barchar = () => {
  const dispatch = useDispatch();
  const totalOrders = useSelector((state) => state.adminReducer.totalOrders);
  const labels = ["payment not started", "rejected", "approved", "cancelled"]

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

  const data = useMemo(function () {
    return {
      datasets: [
        {
          label: "Orders",
          tension: 0.3,
          data: [
            ordersByStatus(totalOrders, "payment not started"),
            ordersByStatus(totalOrders, "rejected"),
            ordersByStatus(totalOrders, "approved"),
            ordersByStatus(totalOrders, "cancelled")
          ],
          borderColor: ['rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)','rgb(255, 99, 132)',],
          borderWidth: 1,
          backgroundColor: ['rgba(255, 205, 86, 0.2)','rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)','rgba(255, 99, 132, 0.2)',],
        },
      ],
      labels,
    };
  }, [totalOrders]);

  return (
    <>{totalOrders &&
        <div>
<Bar data={data} options={options} />
{console.log(totalOrders)}

        </div>
          
         }</>
  );
};

export default Barchar;
