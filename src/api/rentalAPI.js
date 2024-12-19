import { handleError, apiClient } from "../utils";

export const getRental = async () => {
  try {
    const response = await apiClient.get("/rental");

    if (response.status !== 200)
      throw new Error(`Unexpected response status: ${response.status}`);

    return response.data;
  } catch (err) {
    handleError("Error fetching rental data:", err);
  }
};

export const insertRental = async (formdata) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await apiClient.post("/rental", formdata, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status !== 200)
      throw new Error(`Unexpected response status: ${response.status}`);

    return response.data;
  } catch (err) {
    handleError("Error inserting rental:", err);
  }
};
