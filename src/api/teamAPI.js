import { handleError, apiClient } from "../utils";

export const getTeam = async () => {
  try {
    const response = await apiClient.get("/team");
    if (response.status !== 200)
      throw new Error(`Unexpected response status: ${response.status}`);
    return response.data;
  } catch (err) {
    handleError("Error fetching team data:", err);
  }
};

export const insertTeam = async (formdata) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await apiClient.post("/team", formdata, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status !== 200)
      throw new Error(`Unexpected response status: ${response.status}`);
    return response.data;
  } catch (err) {
    handleError("Error inserting team:", err);
  }
};
