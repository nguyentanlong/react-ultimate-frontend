import UsersTable from "../component/user/users.table";
import UsersForm from "../component/user/users.form";
import { useEffect, useState } from 'react';
import { fetchAllUserAPI } from '../services/api.service';

const UserPage = () => {
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(8);//quy dinh so phan tu tren 1 trang
    const [total, setTotal] = useState(0)
    const [dataUsers, setDataUser] = useState()

    // nếu data rỗng chạy trước 1 lần
    //next value !== prev value chạy thếm 1 lần nưa
    useEffect(() => {
        loadUser();
    }, [current, pageSize])//= []+ dieu kien dong // 2
    const loadUser = async () => {
        const res = await fetchAllUserAPI(current, pageSize)
        if (res.data) {
            setDataUser(res.data.result)
            setCurrent(res.data.meta.current);
            setPageSize(res.data.meta.pageSize);
            setTotal(res.data.meta.total);
        }
    }

    return (
        <div>
            <UsersForm loadUser={loadUser} />
            <UsersTable
                dataTuUsersJSX={dataUsers}
                loadUser={loadUser}
                current={current}
                pageSize={pageSize}
                total={total}
                setCurrent={setCurrent}
                setPageSize={setPageSize}
            />
        </div>

    )
}

export default UserPage;
