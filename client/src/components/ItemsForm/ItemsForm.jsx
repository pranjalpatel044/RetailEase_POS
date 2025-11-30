import React, { useState, useContext } from "react";
import toast from "react-hot-toast";
import { AppContext } from "../../context/AppContext";
import { Assets } from '../../assets/Assets';
import { addItem } from "../../service/ItemService"; // Adjust this path

const ItemsForm = () => {
    const { categories, setItemsData, itemsData, setCategories } = useContext(AppContext);
    const [image, setImage] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        name: "",
        categoryId: "",
        price: "",
        description: ""
    });

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (!image) {
            toast.error("Select an image");
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append("item", new Blob([JSON.stringify(data)], { type: "application/json" }));
        formData.append("file", image);

        try {
            const response = await addItem(formData);
            if (response.status === 201) {
                setItemsData(prevItems => [...itemsData, response.data]);

                setCategories((prevCategories) =>
                    prevCategories.map((category) =>
                        category.categoryId === data.categoryId ? {...category, items: category.items + 1 } : category ))

                toast.success("Item added");
                setData({
                    name: "",
                    categoryId: "",
                    price: "",
                    description: ""
                });
                setImage(false);
            } else {
                toast.error("Unable to add item");
            }
        } catch (error) {
            console.error("Error adding item:", error);
            toast.error("Unable to add item");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="item-form-container" style={{ height: '100vh', overflowY: 'auto', overflowX: 'hidden' }}>
            <div className="mx-2 mt-2">
                <div className="row">
                    <div className="card col-md-12 form-container">
                        <div className="card-body">
                            <form onSubmit={onSubmitHandler}>
                                <div className="mb-3">
                                    <label htmlFor="image" className="form-label">
                                        <img src={image ? URL.createObjectURL(image) : Assets.upload} alt="" width={48} />
                                    </label>
                                    <input
                                        type="file"
                                        name="image"
                                        id="image"
                                        className="form-control"
                                        hidden
                                        onChange={(e) => setImage(e.target.files[0])}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        className="form-control"
                                        placeholder="Item Name"
                                        onChange={onChangeHandler}
                                        value={data.name}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="categoryId" className="form-label">Category</label>
                                    <select
                                        name="categoryId"
                                        id="categoryId"
                                        className="form-control"
                                        onChange={onChangeHandler}
                                        value={data.categoryId}
                                        required
                                    >
                                        <option value="">--SELECT CATEGORY--</option>
                                        {categories.map((category) => (
                                            <option key={category.categoryId} value={category.categoryId}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="price" className="form-label">Price</label>
                                    <input
                                        type="number"
                                        name="price"
                                        id="price"
                                        className="form-control"
                                        placeholder="₹200.00"
                                        onChange={onChangeHandler}
                                        value={data.price}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea
                                        rows="4"
                                        name="description"
                                        id="description"
                                        className="form-control"
                                        placeholder="Write content here..."
                                        onChange={onChangeHandler}
                                        value={data.description}
                                    ></textarea>
                                </div>

                                <button type="submit" className="btn btn-warning w-100" disabled={loading}>
                                    {loading ? "Saving..." : "Save"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemsForm;
