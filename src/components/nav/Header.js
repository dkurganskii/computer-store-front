import React, { useState, useEffect } from "react";
import { Menu, Badge } from "antd";
import {
    AppstoreOutlined,
    SettingOutlined,
    UserOutlined,
    UserAddOutlined,
    LoginOutlined,
    ShoppingOutlined,
    ShoppingCartOutlined
} from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import firebase from 'firebase/app';
import { useDispatch, useSelector } from 'react-redux'
import Search from '../forms/Search'

const { SubMenu, Item } = Menu;

const Header = () => {
    let history = useHistory()
    const currentPath = history.location.pathname
    // eslint-disable-next-line
    const [current, setCurrent] = useState(currentPath);

    let dispatch = useDispatch()
    let { user, cart } = useSelector((state) => ({ ...state }))
   

    const handleClick = (e) => {
        //  console.log('Menu -', e.key);
        setCurrent(e.key);
    };

        
    useEffect(() => {
        setCurrent(history.location.pathname)
        // eslint-disable-next-line
    }, [])

    //   console.log('location ', history.location.pathname)

    const logout = () => {
        firebase.auth().signOut()
        dispatch({
            type: 'LOGOUT',
            payload: null
        })
        history.push('/login')
    }

    return (
        <Menu onClick={handleClick} selectedKeys={[currentPath]} mode="horizontal">
            <Item key="/" icon={<AppstoreOutlined />}>
                <Link to="/">Home</Link>
            </Item>

            <Item key="/shop" icon={<ShoppingOutlined />}>
                <Link to="/shop">Shop</Link>
            </Item>

            <Item key="/cart" icon={<ShoppingCartOutlined />}>
                <Link to="/cart">
                    <Badge count={cart.length} offset={[9, 0]}>
                        Cart
                    </Badge>
                </Link>
            </Item>

            {
                !user && (<Item key="register" icon={<UserAddOutlined />} className="float-right">
                    <Link to="/register">Register</Link>
                </Item>)
            }

            {
                !user && (<Item key="login" icon={<UserOutlined />} className="float-right">
                    <Link to="/login">Login</Link>
                </Item>)
            }

            {
                user && (<SubMenu icon={<SettingOutlined />} title={user.email && user.email.split('@')[0]}
                    className='float-right'>
                    { user && user.role === 'subscriber' && <Item><Link to='/user/history'>Dashboard</Link></Item>}
                    { user && user.role === 'admin' && <Item><Link to='/admin/dashboard'>Dashboard</Link></Item>}

                    <Item icon={<LoginOutlined />} onClick={logout}>Logout</Item>
                </SubMenu>)
            }
            <span className='float-right p-1'>
                <Search />
            </span>
        </Menu >
    );
};

export default Header;
