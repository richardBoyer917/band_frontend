import { handleError, apiClient } from "../utils";

export const getSearchData = async (searchTerm) => {
  try {
    const response = await apiClient.post("/getSearchData", {
      searchTerm: searchTerm,
    });
    if (response.status !== 200)
      throw new Error(`Unexpected response status: ${response.status}`);
    return response.data;
  } catch (err) {
    handleError("Error fetching search data:", err);
  }
};
