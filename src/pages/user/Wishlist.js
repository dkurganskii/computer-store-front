import React, { useState, useEffect } from 'react';
import UserNav from '../../components/nav/UserNav'
import { getWishlist, removeWishlist } from '../../functions/user'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { DeleteOutlined } from '@ant-design/icons'

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([])
    const { user } = useSelector(state => ({ ...state }))

    useEffect(() => {
        loadWishlist()
    }, [])

    const loadWishlist = () =>
        getWishlist(user.token).then(res => {
            // console.log(res)
            setWishlist(res.data.wishlist)
        })

    const handleRemove = (productId) => removeWishlist(productId, user.token).then(res => {
        loadWishlist()
    })

    return (

        <div className='container-fluid'>
            <div className='row col-md-8'>
                <div className='col-md-4'>
                    <UserNav />
                </div>
                <div className='col'>
                    <h4>Wishlist</h4>
                    {!wishlist.length && <p>No products in wishlist. <Link to="/shop">Continue Shopping</Link></p>}
                    {wishlist.map(p => <div key={p._id} className='alert alert-secondary'>
                        <Link to={`/product/${p.slug}`}>{p.title}</Link>
                        <span onClick={() => handleRemove(p._id)} className='btn btn-sm float-right'><DeleteOutlined /></span>
                    </div>)}
                </div>
            </div>
        </div >
    )
}

export default Wishlist;