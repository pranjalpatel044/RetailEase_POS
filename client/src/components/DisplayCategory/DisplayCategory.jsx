import Category from "../Category/Category";
import "./DisplayCategory.css";
import { Assets } from "../../assets/Assets"; 


const DisplayCategory = ({
  selectedCategory,
  setSelectedCategory,
  categories,
}) => {
  const totalItems = categories.reduce((acc, cat) => acc + cat.items, 0);

  return (
    <div className="display-category-wrapper">

      <div className="row g-3" style={{ width: "100%", margin: 0 }}>
        {/* All Items category */}
        <div key="Key" className="col-md-3 col-sm-6" style={{ padding: "0 10px" }}>
          <Category
            categoryName="All Items"
            imgUrl={Assets.device}
            numberOfItems={totalItems}
            bgColor="#6c757d"
            isSelected={selectedCategory === ""}
            onClick={() => setSelectedCategory("")}
          />
        </div>


        {categories.map((category) => (
          <div
            key={category.categoryId}
            className="col-md-3 col-sm-6"
            style={{ padding: "0 10px" }}
          >
            <Category
              categoryName={category.name}
              imgUrl={category.imgUrl}
              numberOfItems={category.items}
              bgColor={category.bgColor}
              isSelected={selectedCategory === category.categoryId}
              onClick={() => setSelectedCategory(category.categoryId)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayCategory;
