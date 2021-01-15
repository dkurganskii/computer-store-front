import React from "react";

const CategoryForm = ({ handleSubmit, name, setName }) => (
    <form onSubmit={handleSubmit}>
        <div className="form-group">
            <input
                type="text"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
                value={name}
                autoFocus
                required
                placeholder='Enter Name'
            />
            <br />
            <button className="text-center btn btn-primary btn-raised">Save</button>
        </div>
    </form>
);

export default CategoryForm;
