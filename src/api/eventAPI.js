import { apiClient, handleError } from "../utils";

export const insertEvent = async (formdata) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await apiClient.post(`/events`, formdata, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.status !== 200) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
    return response.data;
  } catch (err) {
    handleError("Error inserting case:", err);
  }
};

export const getEvents = async () => {
  try {
    const response = await apiClient.get(`/events`);
    if (response.status !== 200) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
    return response.data;
  } catch (err) {
    handleError("Error fetching cases:", err);
  }
};

export const deleteEvent = async (id) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await apiClient.delete(`/events/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status !== 200) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
    return response.data;
  } catch (err) {
    handleError("Error deleting case:", err);
  }
};

export const updateEvent = async (id, formdata) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await apiClient.post(`/events/${id}`, formdata, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.status !== 200) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
    return response.data;
  } catch (err) {
    handleError("Error updating case:", err);
  }
};