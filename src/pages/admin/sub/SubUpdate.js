import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategories } from "../../../functions/category";
import { updateSub, getSub } from "../../../functions/sub";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";

const SubUpdate = ({ match, history }) => {
    const { user } = useSelector((state) => ({ ...state }));

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [parent, setParent] = useState('');

    useEffect(() => {
        loadCategories();
        loadSub()
    }, []);

    const loadCategories = () =>
        getCategories().then((c) => setCategories(c.data));

    const loadSub = () =>
        getSub(match.params.slug).then((s) => {
            setName(s.data.name)
            setParent(s.data.parent)
        })

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(name);
        if(name.trim().length < 2 || name.trim().length > 32){
            alert('Subcategory name must be from 2 to 32 characters long')
        }else{
            updateSub(match.params.slug, { name, parent }, user.token)
            .then((res) => {
                // console.log(res)
                setLoading(false);
                setName("");
                toast.success(`"${res.data.name}" is updated`);
                history.push('/admin/sub')
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                if (err.response.status === 400) toast.error(err.response.data);
            });
        }
       
    };

    return (
        <div className="container-fluid pt-3">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-8">
                    {loading ? (
                        <h4 className="text-danger">Loading..</h4>
                    ) : (
                            <h4>Update Subcategory</h4>
                        )}

                    <div className="form-group pt-4 pb-4">
                        <select
                            name="category"
                            className="form-control"
                            onChange={(e) => setParent(e.target.value)}
                        >
                            <option>Select Parent Category</option>
                            {categories.length > 0 &&
                                categories.map((c) => (
                                    <option key={c._id} value={c._id} selected={c._id === parent}>
                                        {c.name}
                                    </option>
                                ))}
                        </select>
                    </div>

                    <CategoryForm 
                        handleSubmit={handleSubmit}
                        name={name}
                        setName={setName} />
                </div>
            </div>
        </div>
    );
};

export default SubUpdate;
