import Header from './component/layout/header';
import Footer from './component/layout/footer';
import { Outlet } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AuthContext } from './component/context/auth.context';
import { getAccountAPI } from './services/api.service';
import { Spin } from 'antd';

// const ParentComponent = (props) => {
//   // console.log("Check props",props)
//   return (<>
//     Parent Component
//     {/* {props.child} nếu muốn hiển thị trong component thì dùng cái này*/}
//   </>)
// }

// const ChildComponent = (props) => {
//   // console.log("Check props",props)
//   return (<>
//     Child Component
//   </>)
// }
const App = () => {
  //{key:value}
  const { setUser, isAppLoading, setIsAppLoading } = useContext(AuthContext);


  // const delay = (milSeconds) => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve()
  //     }, milSeconds)
  //   })
  // }

  const fetchUserInfo = async () => {
    const res = await getAccountAPI();
    // await delay(3000)
    // console.log(">>> check values: ", res)
    if (res.data) {
      //success
      setUser(res.data.user)
      // console.log(">>> check user data: ", res.data)
    }
    setIsAppLoading(false);
  }
  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <>
      {/* <ParentComponent>
        bên trong component
        <ChildComponent />
      </ParentComponent> */}
      {isAppLoading === true ?
        <div style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}>
          <Spin />
        </div>
        :
        <>
          <Header />
          <Outlet />
          <Footer />
        </>
      }

    </>
  )
}

export default App
