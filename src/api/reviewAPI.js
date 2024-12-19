import { handleError, apiClient } from "../utils";

export const getReviews = async () => {
  try {
    const response = await apiClient.get("/reviews");
    if (response.status !== 200)
      throw new Error(`Unexpected response status: ${response.status}`);
    return response.data;
  } catch (err) {
    handleError("Error fetching review data:", err);
  }
};

export const getReviewsBytype = async (reviewType) => {
  try {
    const response = await apiClient.get("/reviews/reviewsBytype", {
      params: { reviewType: reviewType },
    });
    if (response.status !== 200)
      throw new Error(`Unexpected response status: ${response.status}`);
    return response.data;
  } catch (err) {
    handleError("Error fetching review data:", err);
  }
};

export const insertReview = async (formdata) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await apiClient.post("/reviews", formdata, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.status !== 200)
      throw new Error(`Unexpected response status: ${response.status}`);
    return response.data;
  } catch (err) {
    handleError("Error inserting review:", err);
  }
};

export const updateReview = async (id, formdata) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await apiClient.post(`/reviews/${id}`, formdata, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.status !== 200)
      throw new Error(`Unexpected response status: ${response.status}`);
    return response.data;
  } catch (err) {
    handleError("Error updating review:", err);
  }
};

export const deleteReview = async (id) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await apiClient.delete(`/reviews/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status !== 200)
      throw new Error(`Unexpected response status: ${response.status}`);
    return response.data;
  } catch (err) {
    handleError("Error deleting review:", err);
  }
};
