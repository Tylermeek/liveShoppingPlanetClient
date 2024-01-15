import Request from "axios/config"

export const getInfo = () =>{
   return Request.get("/test")
}