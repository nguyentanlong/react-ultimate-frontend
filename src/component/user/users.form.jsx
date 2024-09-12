import { Input, Button, notification, Modal } from "antd";
import { useState } from "react";
import { createUserAPI } from "../../services/api.service";


const UsersForm = (props) => {
    const { loadUser } = props;
    const [fullName, setFullName] = useState();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleSubmitBtn = async () => {
        const res = await createUserAPI(fullName, email, password, phone);

        if (res.data) {
            notification.success({
                message: "Đăng ký tài khoản",
                description: "Bạn đã đăng ký thành công!"
            })
            resetAndCloseModal();
            await loadUser();
        } else {
            notification.error({
                message: "Đăng ký tài khoản lỗi",
                description: JSON.stringify(res.message)
            })
        }
        //console.log(">>> check state: ", res.data.data/{ fullName, email, password, phone }*/)
    }
    const resetAndCloseModal = () => {
        setIsModalOpen(false);
        setFullName("");
        setEmail("");
        setPassword("");
        setPhone("");
    }


    return (
        <div className="user-form" style={{ margin: "20px 0" }}>
            <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                {/* tai day */}
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h3>Danh sách Users</h3>
                    <Button
                        // onClick={() => handleClickBtn()}
                        onClick={() => setIsModalOpen(true)}
                        type="primary"> Đăng Ký </Button>
                </div>
                <Modal
                    title="Đăng Ký Tài Khoản"
                    open={isModalOpen}
                    onOk={() => handleSubmitBtn()}
                    onCancel={() => setIsModalOpen(false)}
                    maskClosable={false}
                    okText={"Tạo"}
                    cancelText={"Hủy"}
                >
                    <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                        <div>
                            <span>Full Name</span>
                            <Input
                                value={fullName}
                                onChange={(event) => { setFullName(event.target.value) }}
                            />
                        </div>
                        <div>
                            <span>Email</span>
                            <Input
                                value={email}
                                onChange={(event) => { setEmail(event.target.value) }}
                            />
                        </div>
                        <div>
                            <span>Password</span>
                            <Input.Password
                                value={password}
                                onChange={(event) => { setPassword(event.target.value) }}
                            />
                        </div>
                        <div>
                            <span>Phone number</span>
                            <Input
                                value={phone}
                                onChange={(event) => { setPhone(event.target.value) }}
                            />
                        </div>
                    </div>
                </Modal>


            </div>
        </div>

    );
}

export default UsersForm