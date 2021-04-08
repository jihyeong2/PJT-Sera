import axios from "axios";

// axios 객체 생성  
export default axios.create({
  baseURL: "http://j4b202.p.ssafy.io:8000/api",
  headers: {
    "Content-type": "application/json"
  }
});
