import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:3000/almacenadora",
  timeout: 5000,
});

export const login = async (data) => {
  try {
    return await apiClient.post("/auth/login", data);
  } catch (e) {
    return {
      error: true,
      e,
    };
  }
};

export const getUserById = async (id) => {
    try {
        return await apiClient.get(`/users/${id}`);
      } catch (e) {
        return {
          error: true,
          e,
        };
      }
}

apiClient.interceptors.request.use(
    (config) => {
      const userDetails = localStorage.getItem("user");
  
      if (userDetails) {
        try {
          const { token } = JSON.parse(userDetails);
  
          if (token) {
            config.headers["x-token"] = token;
          }
        } catch (error) {
          console.error("Error parsing user data from localStorage", error);
        }
      }
  
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  

export const register = async (data) => {
  try {
    return await apiClient.post("/auth/register", data);
  } catch (e) {
    console.log(e);
    return {
      error: true,
      e,
    };
  }
};

export const getProducts = async () => {
  try {
    return await apiClient.get("/products")
  } catch (e) {
    return {
      error: true,
      e
    }
  }
}

export const checkEmail = async (email) => {
    try {
       const response = await apiClient.get("/users/checkEmail", { params: {email}});
       return response.data.exists
      } catch (e) {
        console.log(e);
        return {
          error: true,
          e,
        };
      }
}
