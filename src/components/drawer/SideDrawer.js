import React from 'react'
import { Drawer } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import laptop from '../../images/laptop.png'

const SideDrawer = () => {
    const dispatch = useDispatch()
    const { drawer, cart } = useSelector((state) => ({ ...state }))

    const imageStyle = {
        width: '100px',
        height: '70px',
        objectDit: 'cover'
    }
    return (
        <Drawer
            className='text-center'
            title={`Cart/ ${cart.length} Product`}
            placement='right'
            onClose={() => {
                dispatch({
                    type: 'SET_VISIBLE',
                    payload: false
                })
            }}
            visible={drawer} >
            {cart.map((p) => (
                <div key={p._id} className='row'>
                    <div className='col'>
                        {p.images[0] ? (
                            <>
                                <img alt={p.name} src={p.images[0].url} style={imageStyle} />
                                <p className='text-center'>{p.title} x {p.count}</p>
                                <br />
                            </>
                        ) : (
                                <>
                                    <img alt={p.name} src={laptop} style={imageStyle} />
                                    <p className='text-center'>{p.title} x {p.count}</p>
                                </>
                            )}
                    </div>
                </div>
            ))}
            <Link to='/cart'>
                <button onClick={() =>
                    dispatch({
                        type: 'SET_VISIBLE',
                        payload: false
                    })
                } className='text-center btn btn-primary btn-raised btn-block'>Go To Cart</button>
            </Link>
        </Drawer >
    )
}

export default SideDrawer
