import React, { useState, useEffect } from "react";
import { getOrders, changeStatus } from "../../functions/admin";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";


const ShowPaymentInfo = ({ order, showStatus = true }) =>{ 
// eslint-disable-next-line
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
      loadOrders();
      // eslint-disable-next-line
  }, []);

  const loadOrders = () =>
      getOrders(user.token).then((res) => {
        //   console.log(JSON.stringify(res.data, null, 4));
          setOrders(res.data);
      });

  const handleStatusChange = (orderId, orderStatus) => {
      changeStatus(orderId, orderStatus, user.token).then((res) => {
          toast.success("Status updated");
          loadOrders();
      });
  };

  return(
    <div className="container">
      <div className='row'>
          <div className='col-md'>
          <span>ID: {order.paymentIntent.id}</span>
          </div>
          <div className='col-md'>
          <span>
                ORDERED ON:{"  "}
                {new Date(order.createdAt).toLocaleDateString()}         
            </span>
          </div>
          <div className='col-md'>
          <span>
                TOTAL:{"  "}
                ${((order.paymentIntent.amount)/100).toFixed(2)}
            </span>
          </div>
            <div className='col-md'>
            {/* {showStatus && <span className="badge-pill bg-info text-white">STATUS: {order.orderStatus}</span>} */}
            {showStatus ? <span className="badge-pill bg-info text-white">STATUS: {order.orderStatus}</span> :
              <div className="row justify-content-end pr-4">
                             <div >
                                <select
                                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                    className="form-control"
                                    defaultValue={order.orderStatus}
                                    name="status"
                                >
                                    <option value="Not Processed">Not Processed</option>
                                    <option value="Cash On Delivery">Cash On Delivery</option>
                                    <option value="Processing">Processing</option>
                                    <option value="Dispatched">Dispatched</option>
                                    <option value="Cancelled">Cancelled</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>
                        </div> 
            }
            </div>
            </div>
    </div>
);
          }
export default ShowPaymentInfo;