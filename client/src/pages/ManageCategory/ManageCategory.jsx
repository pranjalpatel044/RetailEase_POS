// src/pages/ManageCategory/ManageCategory.jsx
import React from 'react';
import './ManageCategory.css';
import CategoryForm from '../../components/CategoryForm/CategoryForm';
import CategoryList from '../../components/CategoryList/CategoryList';

const ManageCategory = () => {
    return (
        <div className="category-container text-light">
            <div className="left-column">
                <CategoryForm />
            </div>
            <div className="right-column">
                <CategoryList />
            </div>
        </div>
    );
};

export default ManageCategory;
