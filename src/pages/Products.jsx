import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setProducts,
  setSearchString,
  setPerPageLimit,
  nextPage,
  prevPage,
} from "@/store/slice/productsSlice";
import { openModal } from "@/store/slice/modalsSlice";
import Table from "@/components/Table/Index";
import Search from "@/components/Search";
import PerPageLimit from "@/components/PerPageLimit";
import Pagination from "@/components/Pagination";
import getApiURL from "@/helpers/getApiURL";
import fetchData from "@/helpers/fetchData";
import Filters from "@/components/Filters/Index";
import { toast } from "sonner";

function Products() {
  const { data, perPageLimit, currentPage, searchString, filters } =
    useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    const queryString = {
      offset: currentPage === 1 ? 0 : (currentPage - 1) * perPageLimit,
      limit: perPageLimit,
      title: searchString,
      ...filters,
    };

    const url = getApiURL("products", queryString);

    fetchData(
      url,
      (json) => {
        dispatch(setProducts(json));
      },
      () => toast.error("Products could not be loaded. Please try again later.")
    );
  }, [currentPage, perPageLimit, searchString, filters]);

  return (
    <div className="-m-1.5 overflow-x-auto">
      <div className="p-1.5 min-w-full inline-block align-middle">
        <div className="border bg-gray-800 rounded-lg divide-y divide-gray-700 border-gray-700">
          <div className="flex items-center justify-between py-3 px-4">
            <Search
              value={searchString}
              handleChange={(e) => dispatch(setSearchString(e.target.value))}
            />
            <button
              className="bg-blue-600 h-[40px] px-3 flex items-center space-x-1 text-md text-white rounded hover:bg-blue-700"
              onClick={() => dispatch(openModal(<Filters />))}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 4.6C3 4.03995 3 3.75992 3.10899 3.54601C3.20487 3.35785 3.35785 3.20487 3.54601 3.10899C3.75992 3 4.03995 3 4.6 3H19.4C19.9601 3 20.2401 3 20.454 3.10899C20.6422 3.20487 20.7951 3.35785 20.891 3.54601C21 3.75992 21 4.03995 21 4.6V6.33726C21 6.58185 21 6.70414 20.9724 6.81923C20.9479 6.92127 20.9075 7.01881 20.8526 7.10828C20.7908 7.2092 20.7043 7.29568 20.5314 7.46863L14.4686 13.5314C14.2957 13.7043 14.2092 13.7908 14.1474 13.8917C14.0925 13.9812 14.0521 14.0787 14.0276 14.1808C14 14.2959 14 14.4182 14 14.6627V17L10 21V14.6627C10 14.4182 10 14.2959 9.97237 14.1808C9.94787 14.0787 9.90747 13.9812 9.85264 13.8917C9.7908 13.7908 9.70432 13.7043 9.53137 13.5314L3.46863 7.46863C3.29568 7.29568 3.2092 7.2092 3.14736 7.10828C3.09253 7.01881 3.05213 6.92127 3.02763 6.81923C3 6.70414 3 6.58185 3 6.33726V4.6Z"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Filter</span>
            </button>
          </div>
          <div className="overflow-hidden">
            <Table
              thead={["#", "Image", "Title", "Price", "Category", "Actions"]}
            >
              {data.map((product) => (
                <Table.Row key={product.id}>
                  <Table.Cell>{product.id}</Table.Cell>
                  <Table.Cell>
                    <div className="w-[60px] h-[60px] relative overflow-hidden rounded">
                      <img
                        src={product.images[0]}
                        className="absolute inset-0 max-w-full max-h-full"
                      />
                    </div>
                  </Table.Cell>
                  <Table.Cell>{product.title}</Table.Cell>
                  <Table.Cell>
                    {new Intl.NumberFormat("tr-TR", {
                      style: "currency",
                      currency: "TRY",
                    }).format(product.price.toFixed(2))}
                  </Table.Cell>
                  <Table.Cell>{product.category.name}</Table.Cell>
                  <Table.Cell>Delete</Table.Cell>
                </Table.Row>
              ))}
            </Table>
          </div>
          <div className="py-1 px-4 flex justify-between">
            <PerPageLimit
              value={perPageLimit}
              handleChange={(e) => dispatch(setPerPageLimit(e.target.value))}
            />
            <Pagination
              currentPage={currentPage}
              handleClick={(type) =>
                type === "next" ? dispatch(nextPage()) : dispatch(prevPage())
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
