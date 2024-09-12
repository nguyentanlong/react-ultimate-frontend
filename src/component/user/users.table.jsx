import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Table, notification, Popconfirm, Pagination } from 'antd';
import UpdateUserModal from './update.user.modal';
import { useState } from 'react';
import ViewUserDetail from './view.userdetail';
import { deleteUserAPI } from '../../services/api.service';


const UsersTable = (props) => {

    const { dataTuUsersJSX, loadUser,
        current, pageSize, total,
        setCurrent, setPageSize
    } = props;

    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);

    const [dataDetail, setDataDetail] = useState(null);
    const [isDataOpen, setIsDataOpen] = useState(false);
    const columns = [
        {
            title: 'STT',
            render: (_, record, index) => {
                return (<>
                    {(index + 1) + (current - 1) * pageSize}</>
                );
            }
        },
        {
            title: 'Id',
            // dataIndex: '_id', bang voi render oi duoi
            render: (_, record) => {
                return (
                    <a
                        onClick={() => {
                            setDataDetail(record);
                            setIsDataOpen(true)
                        }}
                    >{record._id}</a>
                );
            }
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Hành Động',
            key: 'action',
            render: (_, record) => (
                <div style={{ display: "flex", gap: "20px" }}>
                    <EditOutlined style={{ cursor: "pointer", color: "orange" }}
                        onClick={() => {
                            setDataUpdate(record)
                            setIsModalUpdateOpen(true)
                        }} />
                    <Popconfirm
                        title="Xóa tài khoản"
                        description="Bạn chắc chắn xóa tài khoản này ?"
                        onConfirm={() => handleDeleteUser(record._id)}
                        okText="Yes"
                        cancelText="No"
                        placement="left"
                    >
                        <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
                    </Popconfirm>
                </div>

            ),

        },


        /*{
            title: 'Họ & Tên',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Tuổi',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: (_, { tags }) => (
                <>
                    {tags.map((tag) => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a>Invite {record.name}</a>
                    <a>Delete</a>
                </Space>
            ),
        },*/
    ];
    const handleDeleteUser = async (id) => {
        const res = await deleteUserAPI(id);
        if (res.data) {
            notification.success({
                message: "Xóa tài khoản",
                description: "Xóa tài khoản thành công"
            })
            await loadUser();

        } else {
            notification.error({
                message: "Lỗi không xóa được tài khoản!",
                description: JSON.stringify(res.message)
            })
        }
    }

    /*const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sydney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
    ];*/

    // loadUser();

    const onChange = (pagination, filters, sorter, extra) => {
        if (pagination && pagination.current) {//nếu tháy đổi trang
            if (+pagination.current !== +current) {
                setCurrent(+pagination.current);//dau + truoc ten bien=> cover string -> int
            }
        }

        //thay doi pageSize/trang
        if (pagination && pagination.pageSize) {//nếu tháy đổi trang
            if (+pagination.pageSize !== +pageSize) {
                setPageSize(+pagination.pageSize);//dau + truoc ten bien=> cover string -> int
            }
        }
    };

    return (
        <>
            <Table
                columns={columns}
                dataSource={dataTuUsersJSX}
                rowKey={"_id"}
                pagination={
                    {
                        current: current,
                        pageSize: pageSize,
                        showSizeChanger: true,
                        total: total,
                        showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
                    }}
                onChange={onChange}
            />
            <UpdateUserModal
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                loadUser={loadUser}
            />
            <ViewUserDetail
                dataDetail={dataDetail}
                setDataDetail={setDataDetail}
                isDataOpen={isDataOpen}
                setIsDataOpen={setIsDataOpen}
                loadUser={loadUser}
            />
        </>
    );
}

export default UsersTable;