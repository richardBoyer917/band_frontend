import { handleError, apiClient } from "../utils";

export const getSite = async () => {
  try {
    const response = await apiClient.get("/sites");
    if (response.status !== 200)
      throw new Error(`Unexpected response status: ${response.status}`);
    return response.data;
  } catch (err) {
    handleError("Error fetching site data:", err);
  }
};

export const getsixSite = async () => {
  try {
    const response = await apiClient.get("/sites/six");
    if (response.status !== 200)
      throw new Error(`Unexpected response status: ${response.status}`);
    return response.data;
  } catch (err) {
    handleError("Error fetching site data:", err);
  }
};

export const getSiteById = async (id) => {
  try {
    const response = await apiClient.get(`/sites/${id}`);
    if (response.status !== 200)
      throw new Error(`Unexpected response status: ${response.status}`);
    return response.data;
  } catch (err) {
    handleError("Error fetching site data:", err);
  }
};

export const insertSite = async (formdata) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await apiClient.post("/sites", formdata, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.status !== 200)
      throw new Error(`Unexpected response status: ${response.status}`);
    return response.data;
  } catch (err) {
    handleError("Error inserting site:", err);
  }
};

export const updateSite = async (id, formdata) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await apiClient.post(`/sites/${id}`, formdata, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    
    if (response.status !== 200)
      throw new Error(`Unexpected response status: ${response.status}`);
    return response.data;
  } catch (err) {
    handleError("Error updating site:", err);
  }
};

export const deleteSite = async (id) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await apiClient.delete(`/sites/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status !== 200)
      throw new Error(`Unexpected response status: ${response.status}`);
    return response.data;
  } catch (err) {
    handleError("Error deleting site:", err);
  }
};
