import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import {
    getCoupons,
    removeCoupon,
    createCoupon,
} from "../../../functions/coupon";
import "react-datepicker/dist/react-datepicker.css";
import { DeleteOutlined } from "@ant-design/icons";
import AdminNav from "../../../components/nav/AdminNav";

const CreateCouponPage = () => {
    const [name, setName] = useState("");
    const [expiry, setExpiry] = useState("");
    const [discount, setDiscount] = useState("");
    const [loading, setLoading] = useState("");
    const [coupons, setCoupons] = useState([]);

    // redux
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadAllCoupons();
    }, []);

    const loadAllCoupons = () => getCoupons().then((res) => setCoupons(res.data));

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        if(name.trim().length < 6 || name.trim().length > 32){
            alert('Coupon name must be from 6 to 32 characters long')
            setLoading(false);
        }else{
            createCoupon({ name, expiry, discount }, user.token)
            .then((res) => {
                setLoading(false);
                loadAllCoupons(); // load all coupons
                setName("");
                setDiscount("");
                setExpiry("");
                toast.success(`"${res.data.name}" is created`);
            })
            .catch((err) => console.log("create coupon err", err));
        }

       
    };

    const handleRemove = (couponId) => {
        if (window.confirm("Delete?")) {
            setLoading(true);
            removeCoupon(couponId, user.token)
                .then((res) => {
                    loadAllCoupons(); // load all coupons
                    setLoading(false);
                    toast.success(`Coupon "${res.data.name}" deleted`);
                })
                .catch((err) => console.log(err));
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
                        <h4 className="text-danger">Loading...</h4>
                    ) : (
                            <h4>Coupon</h4>
                        )}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group pt-4 pb-4">
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                autoFocus
                                required
                                placeholder='Enter Name'
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) => setDiscount(e.target.value)}
                                value={discount}
                                required
                                placeholder='Enter Discount %'
                            />
                        </div>

                        <div className="form-group">
                            <br />
                            <DatePicker
                                className="form-control"
                                selected={expiry}
                                onChange={(date) => setExpiry(date)}
                                required
                                placeholderText="Select Expiry"
                            />
                        </div>

                        <button className="text-center btn btn-primary btn-raised">Save</button>
                    </form>

                    <br />

                    <table className="table table-bordered">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Discount</th>
                                <th scope="col">Expiry</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {coupons.map((c) => (
                                <tr key={c._id}>
                                    <td>{c.name}</td>
                                    <td>{c.discount}%</td>
                                    <td>{new Date(c.expiry).toLocaleDateString()}</td>
                                    <td>
                                        <DeleteOutlined
                                            onClick={() => handleRemove(c._id)}
                                            className="text-danger pointer"
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CreateCouponPage;
