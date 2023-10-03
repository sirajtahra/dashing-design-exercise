import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import useFetch from "../hooks/useFetch";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";

import "../styles/table.scss";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  thumbnail: string;
}

interface SortIconProps {
  field: keyof Product;
  currentSortField: keyof Product | null;
  sortDirection: "asc" | "desc";
}

const SortIcon: React.FC<SortIconProps> = ({
  field,
  currentSortField,
  sortDirection,
}) => {
  if (field !== currentSortField) return null;
  return sortDirection === "asc" ? (
    <ChevronUpIcon className="inline" width={20} height={20} />
  ) : (
    <ChevronDownIcon className="inline" width={20} height={20} />
  );
};

export default function ProductsTable() {
  const { roles, switchRole } = useAuth();
  const [filteredData, setFilteredData] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortField, setSortField] = useState<keyof Product | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const showActions = useMemo(() => roles.includes("Editor"), [roles]);

  const {
    responseJSON: data,
    isLoading,
    error,
  } = useFetch<{ products: Product[] }>("https://dummyjson.com/products");

  useEffect(() => {
    const products = data?.products ?? [];
    const sortedData = [...products];
    if (sortField) {
      sortedData.sort((a, b) =>
        a[sortField] > b[sortField]
          ? sortDirection === "asc"
            ? 1
            : -1
          : sortDirection === "asc"
          ? -1
          : 1
      );
    }
    setFilteredData(
      sortedData.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, data, sortField, sortDirection]);

  const handleSort = (field: keyof Product) => {
    if (sortField === field) {
      setSortDirection((prevDirection) =>
        prevDirection === "asc" ? "desc" : "asc"
      );
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  function handleEdit(productId: number) {
    console.log("Editing product:", productId);
    // Add logic to handle edit functionality
  }

  function handleDelete(productId: number) {
    console.log("Deleting product:", productId);
    // Add logic to handle delete functionality
  }

  function renderActions(productId: number) {
    if (showActions) {
      return (
        <>
          <PencilIcon
            width={20}
            height={20}
            onClick={() => handleEdit(productId)}
          />
          <TrashIcon
            width={20}
            height={20}
            onClick={() => handleDelete(productId)}
          />
        </>
      );
    }
    return null;
  }

  if (error) {
    return <div>Failed to fetch data!</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="products-table">
      <div className="controls">
        <input
          className="search-input"
          type="text"
          placeholder="Filter by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex justify-center">
          <label htmlFor="Role" className="mr-4">
            Role
          </label>
          <select onChange={(e) => switchRole(e.target.value)}>
            <option value="Viewer">Viewer</option>
            <option value="Editor">Editor</option>
          </select>
        </div>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort("id")}>
                <div className="header-content">
                  ID{" "}
                  <SortIcon
                    field="id"
                    currentSortField={sortField}
                    sortDirection={sortDirection}
                  />
                </div>
              </th>
              <th onClick={() => handleSort("title")}>
                <div className="header-content">
                  Title{" "}
                  <SortIcon
                    field="title"
                    currentSortField={sortField}
                    sortDirection={sortDirection}
                  />
                </div>
              </th>
              <th onClick={() => handleSort("description")}>
                <div className="header-content">
                  Description{" "}
                  <SortIcon
                    field="description"
                    currentSortField={sortField}
                    sortDirection={sortDirection}
                  />
                </div>
              </th>
              <th onClick={() => handleSort("price")}>
                <div className="header-content">
                  Price{" "}
                  <SortIcon
                    field="price"
                    currentSortField={sortField}
                    sortDirection={sortDirection}
                  />
                </div>
              </th>
              <th onClick={() => handleSort("rating")}>
                <div className="header-content">
                  Rating{" "}
                  <SortIcon
                    field="rating"
                    currentSortField={sortField}
                    sortDirection={sortDirection}
                  />
                </div>
              </th>
              <th>Thumbnail</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.title}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.rating}</td>
                <td>
                  <img src={product.thumbnail} alt={product.title} />
                </td>
                <td>{renderActions(product.id)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
