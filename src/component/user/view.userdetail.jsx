import { AlignRightOutlined } from "@ant-design/icons";
import { Button, Drawer, message, notification } from "antd";
import { useState } from "react";
import { handleUploadFile, updateUserAvatarAPI } from "../../services/api.service";
const ViewUserDetail = (props) => {
    const {
        dataDetail,
        setDataDetail,
        isDataOpen,
        setIsDataOpen,
        loadUser
    } = props;

    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleOnChangeFile = (event) => {
        if (!event.target.files || event.target.files.length == 0) {
            setSelectedFile(null)
            setPreview(null)
            return;
        }
        const file = event.target.files[0];
        console.log(`>>hell ${preview}`);//do là simple file nen là 0
        if (file) {
            setSelectedFile(file)
            setPreview(URL.createObjectURL(file))
        }
        // alert("hello")

    }
    const handleUpdateUserAvatar = async () => {
        const resUpload = await handleUploadFile(selectedFile, "avatar");//avatar trong backend tên folder
        if (resUpload) {
            const newAvatar = resUpload.data.fileUploaded;
            const resUpdateAvatar = await updateUserAvatarAPI(newAvatar, dataDetail._id,
                dataDetail.fullName, dataDetail.phone
            );
            if (resUpdateAvatar) {
                setIsDataOpen(false);
                setSelectedFile(null);
                setPreview(null);
                await loadUser();
                notification.success({
                    message: "Cập nhật Avatar!",
                    description: "Cập nhật thành công!!"
                })
            } else {
                notification.error({
                    message: "Lỗi không cập nhật được",
                    description: JSON.stringify(resUpdateAvatar.message),
                })
            }
        } else {
            notification.error({
                message: "Lỗi không cập nhật được",
                description: JSON.stringify(resUpload.message),
            })
        }
    }
    return (
        <Drawer
            width={"40vw"}
            title="Chi tiết người dung:"
            onClose={() => {
                setDataDetail(null)
                setIsDataOpen(false)
            }}
            open={isDataOpen}
        >
            {dataDetail ?
                <>
                    <p>Số ID: {dataDetail._id}</p>
                    <br /><hr />
                    <p>Họ & Tên: {dataDetail.fullName}</p>
                    <br /><hr /><p>Email: {dataDetail.email}</p>
                    <br /><hr /><p>Phone: {dataDetail.phone}</p>
                    <br /><hr />
                    <p>Avatar:</p>
                    <div>
                        <img height={100} width={150}
                            src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataDetail.avatar}`} />
                    </div>
                    <div>
                        <label htmlFor='btnUpload' style={{
                            display: "block",
                            width: "fit-content",
                            marginTop: "15px",
                            padding: "5px 10px",
                            background: "orange",
                            borderRadius: "5px",
                            cursor: "pointer"
                        }}>
                            Upload Avatar
                        </label>
                        <input type='file' hidden id='btnUpload'
                            // onChange={handleOnChangeFile}
                            onChange={(event) => handleOnChangeFile(event)}
                        />
                        {/* <Button type='primary'>Upload Avatar</Button> */}
                    </div>
                    {preview &&
                        <>
                            <div>
                                <img height={100} width={150}
                                    src={preview} />
                            </div>
                            <Button type="primary"
                                onClick={() => handleUpdateUserAvatar()}
                            >Thay đổi
                            </Button>
                        </>
                    }

                </>
                :
                <>
                    <p>Không có dữ liệu!</p>
                </>
            }
        </Drawer>
    );
}
export default ViewUserDetail;