import { Link, NavLink, useNavigate } from 'react-router-dom';
// import './header.css';
import { Menu, message } from 'antd';
import {
    UsergroupAddOutlined, LoginOutlined,
    HomeOutlined, AuditOutlined, AliwangwangOutlined
} from '@ant-design/icons';
import { useState, useContext } from 'react';

import { AuthContext } from '../context/auth.context';
import { logoutAPI } from '../../services/api.service';


const Header = () => {
    const [current, setCurrent] = useState('mail');

    const { user, setUser } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleLogout = async () => {
        const res = await logoutAPI();
        if (res.data) {
            //clear data
            localStorage.removeItem("access_token");
            setUser({
                email: "",
                phone: "",
                fullName: "",
                role: "",
                avatar: "",
                id: ""
            })
            message.success("Logout thành công.");

            //redirect to home
            navigate("/");
        }
    }


    // console.log(">>> check data: ", user)


    const onClick = (e) => {
        // console.log('click ', e);
        setCurrent(e.key);
    };
    const items = [
        {
            label: <Link to={"/"}>Home</Link>,
            key: 'home',
            icon: <HomeOutlined />,
        },
        {
            label: <Link to={"/users"}>Users</Link>,
            key: 'users',
            icon: <UsergroupAddOutlined />,
            // disabled: true,
        },
        {
            label: <Link to={"/books.html"}>Books</Link>,
            key: 'books',
            icon: <AuditOutlined />,

            // children: [
            //     {
            //         type: 'group',
            //         label: 'Item 1',
            //         children: [
            //             { label: 'Option 1', key: 'setting:1' },
            //             { label: 'Option 2', key: 'setting:2' },
            //         ],
            //     },
            //     {
            //         type: 'group',
            //         label: 'Item 2',
            //         children: [
            //             { label: 'Option 3', key: 'setting:3' },
            //             { label: 'Option 4', key: 'setting:4' },
            //         ],
            //     },
            // ],
        },
        ...(!user.id ? [{
            label: <Link to={"/login.html"}>Đăng nhập</Link>,
            key: 'login',
            icon: <LoginOutlined />,
        }] : []),
        ...(user.id ? [{
            label: `Welcome to ReactJS - ${user.fullName}`,
            key: 'setting',
            icon: <AliwangwangOutlined />,
            children: [
                {
                    label: <span onClick={() => handleLogout()}>Đăng xuất</span>,
                    key: 'logout',
                },
            ],
        }] : [])

        // {
        //     label: `Welcome to ReactJS, ${user.fuuName}`,
        //     key: 'setting',
        //     icon: <AliwangwangOutlined />,
        //     children: [
        //         /*{
        //             : <Link to={"/login.html"}>Đăng nhập</Link>, label
        //             : 'login', key
        //         },*/
        //         {
        //             label: 'Đăng xuất',
        //             key: 'logout',
        //         }]
        // }
        // {
        //     key: 'alipay',
        //     label: (
        //         <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
        //             Navigation Four - Link
        //         </a>
        //     ),
        // },
    ];
    return (
        //Link to thay a href để khỏi reload page 49
        //NavLink để khi lick vào nó sáng xanh 50
        /*<ul>
            <li><NavLink className="active" to="/">Home</NavLink></li>
            <li><NavLink to="/users">Users</NavLink></li>
            <li><NavLink to="/books.html">Products</NavLink></li>
        </ul>*/
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
    )
}
export default Header;