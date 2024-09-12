import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Form, Input, Row, Col, Divider, message, notification } from "antd";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI } from "../services/api.service";
import { AuthContext } from "../component/context/auth.context";

const LoginPage = () => {
    const [form] = Form.useForm();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);//biến này de set nut dang nhap

    const { setUser } = useContext(AuthContext);


    const onFinish = async (values) => {
        // console.log(">>> check values: ", values)
        setLoading(true)
        const res = await loginAPI(values.email, values.password);
        // console.log(">>> check res: ", res.data.access_token)
        localStorage.setItem("access_token", res.data.access_token);//gan trong if ko duoc nó undefine
        if (res.data) {
            message.success("Đăng nhập thành công");
            // localStorage.setItem("access_token", res.data.access_token);
            setUser(res.data.user);
            // console.log(">>> check values: ", res.access_token);
            navigate("/");
        } else {
            notification.error({
                message: "Tài khoản không có trong hệ thống!",
                description: JSON.stringify(res.message)
            })
        }
        setLoading(false);

        // const enterLoading = (index: number) => {
        //     setLoadings((prevLoadings) => {
        //       const newLoadings = [...prevLoadings];
        //       newLoadings[index] = true;
        //       return newLoadings;
        //     });

        //     setTimeout(() => {
        //       setLoadings((prevLoadings) => {
        //         const newLoadings = [...prevLoadings];
        //         newLoadings[index] = false;
        //         return newLoadings;
        //       });
        //     }, 6000);
        //   };

    }

    return (
        <>

            <Row justify={"center"} style={{ marginTop: "30px" }}>
                <Col xs={24} md={16} lg={8}>
                    <fieldset style={{
                        padding: "15px",
                        margin: "5px",
                        border: "1px solid #ccc",
                        borderRadius: "5px"
                    }}>
                        <legend>Đăng Nhập</legend>
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={onFinish}
                        >
                            <Form.Item
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter') form.submit()
                                }}
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Email không được để trống!',
                                    },
                                    {
                                        type: "email",
                                        message: 'Email không đúng định dạng!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Password không được để trống!',
                                    },
                                ]}
                            >
                                <Input.Password
                                    onKeyDown={(event) => {
                                        if (event.key === 'Enter') form.submit()
                                    }}
                                />
                            </Form.Item>

                            <Form.Item >
                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                }}>
                                    <Button type="primary" onClick={() => form.submit()}>
                                        Login
                                    </Button>
                                    <Link to="/">Go to homepage <ArrowRightOutlined /></Link>
                                </div>
                            </Form.Item>
                        </Form>
                        <Divider />
                        <div style={{ textAlign: "center" }}>
                            Chưa có tài khoản? <Link to={"/register"}>Đăng ký tại đây</Link>
                        </div>
                    </fieldset>
                </Col>
            </Row>
        </>
    )
}


export default LoginPage;
