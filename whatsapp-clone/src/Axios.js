import axios from "axios"

const instance =  axios.create({
    baseURL: "https://whatsapp-mern-1.herokuapp.com/"
})

export default instance;