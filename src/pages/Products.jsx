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
import actionData from "@/helpers/actionData";
import fetchData from "@/helpers/fetchData";
import Filters from "@/components/Filters/Index";
import { toast } from "sonner";
import ProductCreate from "@/components/Product/Create";
import ProductUpdate from "@/components/Product/Update";

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

  function handleDeleteProduct(id) {
    const url = getApiURL(`products/${id}`);
    actionData(
      url,
      "DELETE",
      undefined,
      () => {
        toast.success("Product deleted.");
      },
      () => {
        toast.error("The product could not be deleted.");
      }
    );
  }

  return (
    <div className="overflow-x-auto">
      <div className="p-1.5 min-w-full inline-block align-middle">
        <div className="border bg-gray-800 rounded-lg divide-y divide-gray-700 border-gray-700">
          <div className="flex items-center justify-between py-3 px-4">
            <Search
              value={searchString}
              handleChange={(e) => dispatch(setSearchString(e.target.value))}
            />
            <div className="flex items-center space-x-2">
              <button
                className="bg-blue-600 h-[40px] px-3 flex items-center space-x-1 text-md text-white rounded hover:bg-blue-700"
                onClick={() => dispatch(openModal(<ProductCreate />))}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12H20M12 4V20"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Create Product</span>
              </button>
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
                    {new Intl.NumberFormat("en-EN", {
                      style: "currency",
                      currency: "EUR",
                    }).format(product.price.toFixed(2))}
                  </Table.Cell>
                  <Table.Cell>{product.category.name}</Table.Cell>
                  <Table.Cell>
                    <div className="flex items-center space-x-2">
                      <button
                        className="bg-green-600 h-[32px] w-[32px] grid place-items-center space-x-1 text-md text-white rounded hover:bg-green-700"
                        onClick={() =>
                          dispatch(
                            openModal(<ProductUpdate productId={product.id} />)
                          )
                        }
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M21.1213 2.70705C19.9497 1.53548 18.0503 1.53547 16.8787 2.70705L15.1989 4.38685L7.29289 12.2928C7.16473 12.421 7.07382 12.5816 7.02986 12.7574L6.02986 16.7574C5.94466 17.0982 6.04451 17.4587 6.29289 17.707C6.54127 17.9554 6.90176 18.0553 7.24254 17.9701L11.2425 16.9701C11.4184 16.9261 11.5789 16.8352 11.7071 16.707L19.5556 8.85857L21.2929 7.12126C22.4645 5.94969 22.4645 4.05019 21.2929 2.87862L21.1213 2.70705ZM18.2929 4.12126C18.6834 3.73074 19.3166 3.73074 19.7071 4.12126L19.8787 4.29283C20.2692 4.68336 20.2692 5.31653 19.8787 5.70705L18.8622 6.72357L17.3068 5.10738L18.2929 4.12126ZM15.8923 6.52185L17.4477 8.13804L10.4888 15.097L8.37437 15.6256L8.90296 13.5112L15.8923 6.52185ZM4 7.99994C4 7.44766 4.44772 6.99994 5 6.99994H10C10.5523 6.99994 11 6.55223 11 5.99994C11 5.44766 10.5523 4.99994 10 4.99994H5C3.34315 4.99994 2 6.34309 2 7.99994V18.9999C2 20.6568 3.34315 21.9999 5 21.9999H16C17.6569 21.9999 19 20.6568 19 18.9999V13.9999C19 13.4477 18.5523 12.9999 18 12.9999C17.4477 12.9999 17 13.4477 17 13.9999V18.9999C17 19.5522 16.5523 19.9999 16 19.9999H5C4.44772 19.9999 4 19.5522 4 18.9999V7.99994Z"
                            fill="#fff"
                          />
                        </svg>
                      </button>
                      <button
                        className="bg-red-600 h-[32px] w-[32px] grid place-items-center space-x-1 text-md text-white rounded hover:bg-red-700"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6"
                            stroke="#fff"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </Table.Cell>
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
