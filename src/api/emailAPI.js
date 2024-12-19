import { handleError, apiClient } from "../utils";

export const sendEmail = async (data) => {
  try {
    const response = await apiClient.post("/sendEmail", data);
    if (response.status !== 200) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
    return response.data;
  } catch (err) {
    handleError("Error sending email:", err);
  }
};
