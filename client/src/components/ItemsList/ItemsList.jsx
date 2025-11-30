import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import './ItemsList.css';
import { AppContext } from "../../context/AppContext";
import { deleteItem } from "../../service/ItemService";

const ItemsList = () => {
  const { itemsData, setItemsData } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = itemsData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const removeItem = async (id) => {
    try {
      const response = await deleteItem(id);
      if (response.status === 204) {
        const updatedItems = itemsData.filter((item) => item.itemId !== id);
        setItemsData(updatedItems);
        toast.success("Item removed");
      } else {
        toast.error("Unable to remove item");
      }
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("Unable to remove item");
    }
  };

  return (
    <div
      className="category-list-container"
      style={{ height: "100vh", overflowY: "auto", overflowX: "hidden" }}
    >
      <div className="row pe-2">
        <div className="input-group mb-3">
          <input
            type="text"
            name="keyword"
            id="keyword"
            placeholder="Search by keyword"
            className="form-control"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="input-group-text bg-warning">
            <i className="bi bi-search"></i>
          </span>
        </div>
      </div>

      <div className="row g-3 pe-2">
        {filteredItems.map((item, index) => (
          <div key={index} className="col-12">
            <div className="card p-3 bg-dark mb-3">
              <div className="d-flex align-items-center">
                <div className="item-image me-3">
                  <img
                    src={
                      item.imgUrl?.trim() ||
                      "https://placehold.co/48x48?text=No+Image"
                    }
                    alt={item.name}
                    width={48}
                    height={48}
                    className="item-image"
                    onError={(e) =>
                      (e.target.src =
                        "https://placehold.co/48x48?text=No+Image")
                    }
                  />
                </div>

                <div className="flex-grow-1">
                  <h6 className="mb-1 text-white">{item.name}</h6>
                  <p className="mb-0 text-white">
                    Category: {item.categoryName}
                  </p>
                  <span className="mb-0 text-block badge rounded-pill text-bg-warning">
                    ₹ {item.price} /-
                  </span>
                </div>

                <div>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeItem(item.itemId)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemsList;
