import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Box } from "@chakra-ui/react";

ChartJS.register(ArcElement, Tooltip, Legend);
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/actions/products.js";
import { getAllCategories } from "../../redux/actions/categories.js";

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: "Products by  category",
    },
  },
};

const Piechart = () => {
  const dispatch = useDispatch();
  const labels = useSelector((state) => state.categoriesReducer.categories).map(
    (cs) => {
      return cs.name;
    }
  );
  const id = useSelector((state) => state.categoriesReducer.categories).map(
    (cs) => {
      return cs._id;
    }
  );
  const products = useSelector((state) => state.productReducer.products);

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllProducts());
  }, [dispatch]);

  const getPsByCategory = (arr, id) => {
    const ps = arr.filter((el) => {
      if (el.category.includes(id)) {
        return el;
      }
    });
    return ps.length;
  };

  function ColorCode() {
    var makingColorCode = "0123456789ABCDEF";
    var finalCode = "#";
    for (var counter = 0; counter < 6; counter++) {
      finalCode = finalCode + makingColorCode[Math.floor(Math.random() * 16)];
    }
    return finalCode;
  }

  const data = useMemo(
    function () {
      return {
        datasets: [
          {
            data: id.map((cs) => {
              return getPsByCategory(products, cs);
            }),
            backgroundColor: labels.map((cs) => {
              return ColorCode();
            }),
          },
        ],
        labels,
      };
    },
    [products]
  );

  return (
    <>
      {products.length && (
        <Box
          bgColor={"white"}
          boxShadow="xl"
          m={".5rem"}
          p={"1rem"}
          borderRadius={5}
        >
          <Pie data={data} options={options} />
        </Box>
      )}
    </>
  );
};

export default Piechart;
