import axios from 'axios'

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {"Content-Type": "application/json"} // 헤더는 데이터의 타입 명시
})



// interceptors (필수X 선택적인 부분, 디버깅이 수월해짐)

api.interceptors.request.use(function (config) {
    // console.log("request", config)
    return config;
  }, function (error) { 
    // console.log("request error", error)
    return Promise.reject(error);
  });

// Add a response interceptor
api.interceptors.response.use(function (response) {
    // console.log("response", response)
    return response;
  }, function (error) {
    // console.log("response error", error)
    return Promise.reject(error);
  });

  export default api;