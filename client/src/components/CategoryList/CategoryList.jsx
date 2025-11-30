import "./CategoryList.css";
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { deleteCategory } from "../../service/CategoryService";
import { toast } from "react-hot-toast";

const CategoryList = () => {
    const { categories, setCategories } = useContext(AppContext);
    const [searchTerm, setSearchTerm] = useState('');

    // Filter categories based on search term
    const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Function to delete a category by ID
    const deleteByCategoryId = async (categoryId) => {
        // if (!window.confirm("Are you sure you want to delete this category?")) return;

        try {
            const response = await deleteCategory(categoryId);
            if (response.status === 204) {
                const updatedCategories = categories.filter(category => category.categoryId !== categoryId);
                setCategories(updatedCategories);
                toast.success("Category deleted successfully");
                
            } else {
                toast.error("Unable to delete category");
            }
        } catch (error) {
            console.error("Error deleting category:", error);
            toast.error("An error occurred while deleting the category.");
        }
    };

    return (
        <div className="category-list-container" style={{ height: "100vh", overflowY: "auto", overflowX: "hidden" }}>
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
                {filteredCategories.map((category, index) => (
                    <div className="col-12" key={index}>
                        <div className="card p-3" style={{ backgroundColor: category.bgColor || "#444" }}>
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center">
                                    <img
                                        src={category.imgUrl?.trim() || "https://placehold.co/48x48?text=No+Image"}
                                        alt={category.name}
                                        className="category-image"
                                        onError={(e) => {
                                            e.target.src = "https://placehold.co/48x48?text=No+Image";
                                        }}
                                    />
                                    <div className="ms-3">
                                        <h5 className="mb-1 text-white">{category.name}</h5>
                                        <p className="mb-0 text-white">{category.items} Items</p>
                                    </div>
                                </div>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => deleteByCategoryId(category.categoryId)}>
                                    <i className="bi bi-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryList;
