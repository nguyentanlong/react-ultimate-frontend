import axios from './axios.customize';

const createUserAPI = (fullName, email, password, phone) => {
    const URL_BACKEND = "/api/v1/user";
    const data = {
        fullName: fullName,//fullName 1 là tên trong database, fullName 2 là giá trị
        email: email,
        password: password,
        phone: phone
    }
    return (axios.post(URL_BACKEND, data))
}
const updateUserAPI = (_id, fullName, phone) => {
    const URL_BACKEND = "/api/v1/user";
    const data = {
        _id: _id,
        fullName: fullName,//fullName 1 là tên trong database, fullName 2 là giá trị
        phone: phone
    }
    return (axios.put(URL_BACKEND, data))
}

const deleteUserAPI = (id) => {
    const URL_BACKEND = `/api/v1/user/${id}`;
    return (axios.delete(URL_BACKEND))
}

const handleUploadFile = (file, folder) => {
    const URL_BACKEND = `/api/v1/file/upload`;
    let config = {
        headers: {
            "upload-type": folder,//upload-type là tên cot trong api
            "Content-Type": "multipart/form-data"//bắt buộc phải có 
        },
    }
    const bodyFormData = new FormData();
    bodyFormData.append("fileImg", file);//fileImg tên cột trong api
    return (axios.post(URL_BACKEND, bodyFormData, config));
}

const fetchAllUserAPI = (current, pageSize) => {
    const URL_BACKEND = `/api/v1/user?current=${current}&pageSize=${pageSize}`;
    return (axios.get(URL_BACKEND))
}
const updateUserAvatarAPI = (avatar, _id, fullName, phone) => {
    const URL_BACKEND = "/api/v1/user";
    const data = {
        _id: _id,
        avatar: avatar,
        fullName: fullName,
        phone: phone
    }
    return (axios.put(URL_BACKEND, data))
}

const registerUserAPI = (fullName, email, password, phone) => {
    const URL_BACKEND = "/api/v1/user/register";
    const data = {
        fullName: fullName,//fullName 1 là tên trong database, fullName 2 là giá trị
        email: email,
        password: password,
        phone: phone
    }
    return (axios.post(URL_BACKEND, data))
}

const loginAPI = (email, password) => {
    const URL_BACKEND = "/api/v1/auth/login";
    const data = {
        username: email,
        password: password,
        delay: 4000
    }
    return axios.post(URL_BACKEND, data);
}

const getAccountAPI = () => {
    const URL_BACKEND = "/api/v1/auth/account";
    // const data = {
    //     username: email,
    //     password: password,
    //     delay: 2000
    // }
    return axios.get(URL_BACKEND);
}

const logoutAPI = () => {
    const URL_BACKEND = "/api/v1/auth/logout";
    return axios.post(URL_BACKEND);
}

const fetchAllBookAPI = (current, pageSize) => {
    const URL_BACKEND = `/api/v1/book?current=${current}&pageSize=${pageSize}`;
    return axios.get(URL_BACKEND);
}

const createBookAPI = (thumbnail, mainText, author, price, quantity, category) => {
    const URL_BACKEND = `/api/v1/book`;
    const data = {
        thumbnail: thumbnail,
        mainText: mainText,
        author: author,
        price: price,
        quantity: quantity,
        category: category
    }
    return axios.post(URL_BACKEND, data);
}

const updateBookAPI = (_id, thumbnail, mainText, author, price, quantity, category) => {
    const URL_BACKEND = `/api/v1/book`;
    const data = {
        _id: _id,
        thumbnail: thumbnail,
        mainText: mainText,
        author: author,
        price: price,
        quantity: quantity,
        category: category
    }
    return axios.put(URL_BACKEND, data);
}

const deleteBookAPI = (id) => {
    const URL_BACKEND = `/api/v1/book/${id}`;
    return axios.delete(URL_BACKEND);
}

export {
    createUserAPI, fetchAllUserAPI,
    updateUserAPI, deleteUserAPI,
    handleUploadFile, updateUserAvatarAPI,
    registerUserAPI, loginAPI, getAccountAPI,
    logoutAPI, fetchAllBookAPI, createBookAPI,
    updateBookAPI, deleteBookAPI
}