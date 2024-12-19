import { handleError, apiClient } from "../utils";

export const getEquips = async () => {
  try {
    const response = await apiClient.get("/equipments");
    if (response.status !== 200)
      throw new Error(`Unexpected response status: ${response.status}`);

    return response.data;
  } catch (err) {
    handleError("Error fetching equipment data:", err);
  }
};

export const getEquipsByType = async (equipmentType) => {
  try {
    const response = await apiClient.get("/equipments/type", {
      params: { equipmentType: equipmentType },
    });
    if (response.status !== 200)
      throw new Error(`Unexpected response status: ${response.status}`);

    return response.data;
  } catch (err) {
    handleError("Error fetching equipment data by type:", err);
  }
};

export const insertEquip = async (formdata) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await apiClient.post("/equipments", formdata, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.status !== 200)
      throw new Error(`Unexpected response status: ${response.status}`);

    return response.data;
  } catch (err) {
    handleError("Error inserting equipment:", err);
  }
};

export const updateEquip = async (id, formdata) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await apiClient.post(`/equipments/${id}`, formdata, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.status !== 200)
      throw new Error(`Unexpected response status: ${response.status}`);

    return response.data;
  } catch (err) {
    handleError("Error updating equipment:", err);
  }
};

export const deleteEquip = async (id) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await apiClient.delete(`/equipments/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status !== 200) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
    return response.data;
  } catch (err) {
    handleError("Error deleting equipment:", err);
  }
};

export const getEquipById = async (id) => {
  try {
    const response = await apiClient.get(`/equipments/${id}`);
    if (response.status !== 200) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
    return response.data;
  } catch (err) {
    handleError("Error fetching equipment by ID:", err);
  }
};
