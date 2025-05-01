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
};

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

export const getProducts = async (name,category,entrada) => {
  try {
    return await apiClient.get("/products", {params: name, category, entrada });
  } catch (e) {
    return {
      error: true,
      e,
    };
  }
};

export const saveProduct = async (data) => {
  try {
    return await apiClient.post("/products/save/", data);
  } catch (e) {
    return {
      error: true,
      e,
    };
  }
};

export const editProduct = async (id, data) => {
  try {
    return await apiClient.put(`/products/update/${id}`, data);
  } catch (e) {
    return {
      error: true,
      e,
    };
  }
};

export const deleteProduct = async (id) => {
  try {
    return await apiClient.delete(`/products/delete/${id}`);
  } catch (e) {
    return {
      error: true,
      e,
    };
  }
};


export const getBestSellers = async () => {
  try {
    return await apiClient.get('/products/bestSellers');
  } catch (e) {
    return {
      error: true,
      e,
    };
  }
}

export const getLowStockProducts = async () => {
  try {
    return await apiClient.get('/products/lowStock');
  } catch (e) {
    return {
      error: true,
      e,
    };
  }
}

export const getSuppliers = async () => {
  try {
    return await apiClient.get('/proveedores');
  } catch (e) {
    return {
      error: true,
      e,
    };
  }
}

export const saveSupplier = async (data) => {
  try {
    return await apiClient.post('/proveedores/save', data)
  } catch (e) {
    return {
      error: true,
      e
    }
  }
}

export const editSupplier = async (id, data) => {
  try {
    return await apiClient.put(`/proveedores/update/${id}`, data);
  } catch (e) {
    return {
      error: true,
      e,
    };
  }
};

export const deleteSupplier = async (id) => {
  try {
    return await apiClient.delete(`/proveedores/delete/${id}`);
  } catch (e) {
    return {
      error: true,
      e,
    };
  }
};

export const getCategories = async () => {
  try {
    return await apiClient.get('/categories');
  } catch (e) {
    return {
      error: true,
      e,
    };
  }
}

export const getAllMovements = async () => {
  try {
    return await apiClient.get("/movements")
  } catch (e) {
    return {
      error: true,
      e,
    }
  }
}

export const getWeeklyInventoryMovements = async () => {
  try {
    return await apiClient.get("/movements/weekly")
  } catch (e) {
    return {
      error: true,
      e,
    }
  }
}

export const getUsers = async () => {
  try {
    return await apiClient.get("/users")
  } catch (e) {
    return {
      error: true,
      e,
    }
  }
}

export const editUser = async (id, data) => {
  try {
    return await apiClient.put(`/users/${id}`, data);
  } catch (e) {
    return {
      error: true,
      e,
    };
  }
};

export const deleteUser = async (id) => {
  try {
    return await apiClient.delete(`/users/${id}`);
  } catch (e) {
    return {
      error: true,
      e,
    };
  }
};

export const checkEmail = async (email) => {
  try {
    const response = await apiClient.get("/users/checkEmail", {
      params: { email },
    });
    return response.data.exists;
  } catch (e) {
    console.log(e);
    return {
      error: true,
      e,
    };
  }
};
