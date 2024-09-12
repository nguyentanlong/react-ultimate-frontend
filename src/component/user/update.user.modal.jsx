import { useEffect, useState } from "react";
import { Input, notification, Modal } from "antd";
import { updateUserAPI } from "../../services/api.service";

const UpdateUserModal = (props) => {
    const [fullName, setFullName] = useState("");
    const [id, setId] = useState("");
    // const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");


    const { isModalUpdateOpen, setIsModalUpdateOpen, dataUpdate, setDataUpdate, loadUser } = props;

    useEffect(() => {
        // console.log("du liệu từ update data:>>>", dataUpdate);
        if (dataUpdate) {
            setFullName(dataUpdate.fullName);
            setId(dataUpdate._id);
            setPhone(dataUpdate.phone);
        }
    }, [dataUpdate])//thêm dataupdae để chạy 1 lần
    const handleSubmitBtn = async () => {
        const res = await updateUserAPI(id, fullName, phone);
        if (res.data) {
            notification.success({
                message: "Cập nhật tài khoản",
                description: "Cập nhật thành công"
            })
            resetAndCloseModal();
            await loadUser();

        } else {
            notification.error({
                message: "Error create user",
                description: JSON.stringify(res.message)
            })
        }
    }

    const resetAndCloseModal = () => {
        setIsModalUpdateOpen(false);
        setFullName("");
        setId("");
        setPhone("");
        setDataUpdate(null);
    }

    return (
        <Modal
            title="Cập nhật tài khoản"
            open={isModalUpdateOpen}
            onOk={() => handleSubmitBtn()}
            onCancel={() => resetAndCloseModal()}
            maskClosable={false}
            okText={"Hoàn thành!"}
        >
            <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                <div>
                    <span>Id</span>
                    <Input
                        value={id}
                        disabled
                    // onChange={(event) => { setEmail(event.target.value) }}
                    />
                </div>
                <div>
                    <span>Full Name</span>
                    <Input
                        value={fullName}
                        onChange={(event) => { setFullName(event.target.value) }}
                    />
                </div>
                {/* <div>
                    <span>Password</span>
                    <Input.Password
                        value={password}
                        onChange={(event) => { setPassword(event.target.value) }}
                    />
                </div> */}
                <div>
                    <span>Phone number</span>
                    <Input
                        value={phone}
                        onChange={(event) => { setPhone(event.target.value) }}
                    />
                </div>
            </div>
        </Modal>
    )
}
export default UpdateUserModal;
