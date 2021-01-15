import React from "react";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import ShowPaymentInfo from "../cards/ShowPaymentInfo";

const Orders = ({ orders, handleStatusChange }) => {
    const showOrderInTable = (order) => (
        <div className="table-responsive">
        <table className="table table-bordered">
            <thead className="thead-light">
                <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Price</th>
                    <th scope="col">Brand</th>
                    <th scope="col">Color</th>
                    <th scope="col">Count</th>
                    <th scope="col">Shipping</th>
                </tr>
            </thead>

            <tbody>
                {order.products.map((p, i) => (
                    <tr key={i}>
                        <td>
                        <b>{p.product.title}</b>
                        </td>
                        <td>${(p.product.price).toFixed(2)}</td>
                        <td>{p.product.brand}</td>
                        <td>{p.color}</td>
                        <td>{p.count}</td>
                        <td>
                            {p.product.shipping === "Yes" ? (
                                <CheckCircleOutlined style={{ color: "green" }} />
                            ) : (
                                    <CloseCircleOutlined style={{ color: "red" }} />
                                )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    );
    return (
        <>
            {orders.map((order) => (
                <div key={order._id} className="row pb-5 mr-4">
                    <div className="btn btn-block bg-light">
                        <ShowPaymentInfo order={order} showStatus={false} />
                    </div>
                    {showOrderInTable(order)}
                </div>
            ))}
        </>
    )
}

export default Orders;
