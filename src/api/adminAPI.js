import { handleError, apiClient } from "../utils";

export const register = async (formdata) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await apiClient.post("/admin/register", formdata, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status !== 200)
      throw new Error(`Unexpected response status: ${response.status}`);

    return response.data;
  } catch (err) {
    handleError("Error registering user:", err);
  }
};

export const getUsers = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await apiClient.get("/admin", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status !== 200)
      throw new Error(`Unexpected response status: ${response.status}`);

    return response.data;
  } catch (err) {
    handleError("Error fetching users:", err);
  }
};

export const getUserById = async (id) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await apiClient.get(`/admin/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status !== 200)
      throw new Error(`Unexpected response status: ${response.status}`);

    return response.data;
  } catch (err) {
    handleError("Error fetching user by ID:", err);
  }
};

export const getUserInfo = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await apiClient.get("/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status !== 200)
      throw new Error(`Unexpected response status: ${response.status}`);
    return response.data;
  } catch (err) {
    handleError("Error fetching user info:", err);
  }
};

export const updateUser = async (id, formdata) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await apiClient.post(`/admin/${id}`, formdata, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (response.status !== 200)
      throw new Error(`Unexpected response status: ${response.status}`);

    return response.data;
  } catch (err) {
    handleError("Error updating user:", err);
  }
};

export const deleteUser = async (id) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await apiClient.delete(`/admin/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status !== 200)
      throw new Error(`Unexpected response status: ${response.status}`);

    return response.data;
  } catch (err) {
    handleError("Error deleting user:", err);
  }
};

export const changeEmail = async (formdata, id) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await apiClient.post(
      `/admin/${id}/change-email`,
      formdata,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status !== 200)
      throw new Error(`Unexpected response status: ${response.status}`);

    return response.data;
  } catch (err) {
    handleError("Error changing email:", err);
  }
};
