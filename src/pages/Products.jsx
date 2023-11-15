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
import ProductCreateForm from "@/components/Product/Create";
import ProductUpdateForm from "@/components/Product/Update";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FilterIcon, PencilIcon, PlusIcon, TrashIcon } from "@/components/Icons";

function Products() {
  const [reload, setReload] = useState(false);
  const { data, perPageLimit, currentPage, searchString, filters } = useSelector((state) => state.products);
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
      () =>
        toast.error("Products could not be loaded. Please try again later."),
    );
  }, [currentPage, perPageLimit, searchString, filters, reload]);

  function handleDeleteProduct(id) {
    toast.info("Product is deleting...");
    const url = getApiURL(`products/${id}`);
    actionData(
      url,
      "DELETE",
      undefined,
      () => {
        toast.success("Product deleted.");
        setReload(!reload);
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
                onClick={() => dispatch(openModal(<ProductCreateForm />))}
              >
                <PlusIcon />
                <span>Create Product</span>
              </button>
              <button
                className="bg-blue-600 h-[40px] px-3 flex items-center space-x-1 text-md text-white rounded hover:bg-blue-700"
                onClick={() => dispatch(openModal(<Filters />))}
              >
                <FilterIcon />
                <span>Filter</span>
              </button>
            </div>
          </div>
          <div className="overflow-hidden">
            <Table
              thead={["#", "Image", "Title", "Price", "Category", "Actions"]}
            >
              <AnimatePresence>
                {data.map((product) => (
                  <Table.Row key={product.id}>
                    <Table.Cell>{product.id}</Table.Cell>
                    <Table.Cell>
                      <div className="w-[60px] h-[60px] relative overflow-hidden rounded-md border-2 border-gray-700 bg-white">
                        <img
                          src={product.images[0]}
                          className="absolute inset-0 max-w-full max-h-full m-auto"
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
                              openModal(
                                <ProductUpdateForm productId={product.id} />
                              )
                            )
                          }
                        >
                          <PencilIcon />
                        </button>
                        <button
                          className="bg-red-600 h-[32px] w-[32px] grid place-items-center space-x-1 text-md text-white rounded hover:bg-red-700"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <TrashIcon />
                        </button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </AnimatePresence>
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
