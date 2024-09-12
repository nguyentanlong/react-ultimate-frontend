import { Link, useRouteError } from "react-router-dom";
import { Button, Result } from 'antd';
export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);
    return (
        <>
            {/* <div id="error-page">
            <h1>Ôi Không!</h1>
            <p>Xin lỗi về sự bất tiện này!!<br />Link bạn vừa nhấp bị lội, hoặc chúng tôi đã xóa!</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div> */}
            <Result
                status="404"
                title="Opps!"
                subTitle={`Xin lỗi về sự bất tiện này! Đã có lỗi: ${error.statusText || error.message}}.`}
                extra={<Button type="primary"><Link to="/"><span>Quay lại trang chủ!</span></Link></Button>}
            />
        </>
    );
}