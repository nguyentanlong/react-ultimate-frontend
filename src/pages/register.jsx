import { Button, Input, Form, notification, Row, Col, Divider } from "antd";
import { registerUserAPI } from "../services/api.service";
import { useNavigate, Link } from "react-router-dom";

const RegisterPage = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        // console.log(">>> check values: ", values)
        const res = await registerUserAPI(values.fullName, values.email, values.password, values.phone);
        if (res.data) {
            notification.success({
                message: "Đăng ký người dùng!",
                description: "Đăng ký người dùng thành công!"
            }), navigate('/users')
        } else {
            notification.error({
                message: "Đăng ký người dùng!",
                description: JSON.stringify(res.message)
            })
        }
    }

    return (
        <>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            >
                {/* <div style={{
                    margin: "50px",
                }}> */}

                <h3 style={{ textAlign: "center" }}>Đăng ký tài khoản</h3>

                <Row justify={"center"}>
                    <Col xs={24} md={6}>
                        <Form.Item
                            label="Họ & Tên: "
                            name="fullName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Phải nhập thông tin!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row justify={"center"}>
                    <Col xs={24} md={6}>
                        <Form.Item
                            label="Email: "
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Phải nhập thông tin!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row justify={"center"}>
                    <Col xs={24} md={6}>
                        <Form.Item
                            label="Mật khẩu: "
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Phải nhập thông tin!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                    </Col>
                </Row>

                <Row justify={"center"}>
                    <Col xs={24} md={6}>
                        <Form.Item
                            label="Số điện thoại:"
                            name="phone"
                            rules={[
                                {
                                    required: true,//false se ko bat buoc
                                    message: 'Phải nhập thông tin!',
                                },
                                {
                                    required: true,
                                    pattern: new RegExp(/\d+/g),
                                    message: "Wrong format!"
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row justify={"center"}>
                    <div>
                        <Button
                            onClick={() => form.submit()}
                            type="primary">Register</Button>

                        {/* uncontrolled email, fullName, password, phone là name của field*/}
                        <Button
                            onClick={() => {
                                form.setFieldsValue({
                                    email: "hello@gmail.com",
                                    fullName: "thử uncontronlled",
                                    password: "123",
                                    phone: "012"
                                })
                                console.log("lấy nhiều giá trị thì sử dụng fields láy 1 thì field", form.getFieldsValue())
                            }}
                        >Test</Button>
                    </div>
                    {/* </div> */}
                    <Divider />
                    <div>Đã có tài khoản? <Link to={"/login"}>Đăng nhập tại đây</Link></div>

                </Row>
            </Form >
        </>
    )
}
export default RegisterPage