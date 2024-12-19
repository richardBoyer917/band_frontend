import { handleError, apiClient } from "../utils";

export const getCases = async () => {
  try {
    const response = await apiClient.get(`/blogs`);
    if (response.status !== 200) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
    return response.data;
  } catch (err) {
    handleError("Error fetching cases:", err);
  }
};

export const getCaseById = async (id) => {
  try {
    const response = await apiClient.get(`/blogs/${id}`);
    if (response.status !== 200) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
    return response.data;
  } catch (err) {
    handleError("Error fetching case by ID:", err);
  }
};

export const insertCase = async (formdata) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await apiClient.post(`/blogs`, formdata, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("response:", response.data)
    if (response.status !== 200) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
    return response.data;
  } catch (err) {
    handleError("Error inserting case:", err);
  }
};

export const updateCase = async (id, formdata) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await apiClient.post(`/blogs/${id}`, formdata, {
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

export const updateTagCase = async (id, formdata) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await apiClient.post(`/blogs/tags/create/${id}`, formdata, {
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


export const deleteCase = async (id) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await apiClient.delete(`/blogs/${id}`, {
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

export const deleteTagCase = async (id,caseType) => {
  const cash = {tags:[caseType]}
  try {
    const token = sessionStorage.getItem("token");
    const response = await apiClient.post(`/blogs/tags/delete/${id}`, cash, {
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
    handleError("Error deleting case:", err);
  }
};

export const insertSolution = async (idd, formdata) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await apiClient.post(`/blogs/solution`, formdata, {
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
    handleError("Error inserting solution:", err);
  }
};

export const getCasesWithCheckbox = async (checkboxValue, num) => {
  try {
    const response = await apiClient.get(`/blogs/checkbox`, {
      params: { checkboxValue, casesNum: num },
    });
    if (response.status !== 200) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
    return response.data;
  } catch (err) {
    handleError("Error fetching cases with checkbox:", err);
  }
};
export const getCasesWithTags = async (tagsValue, num) => {
  try {
    const response = await apiClient.get(`/blogs/tags`, {
      params: { tagsValue, casesNum: num },
    });
    if (response.status !== 200) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
    return response.data;
  } catch (err) {
    handleError("Error fetching cases with checkbox:", err);
  }
};

export const getCasesByType = async (caseType) => {
  try {
    const response = await apiClient.get(`/blogs/type`, {
      params: { caseType },
    });
    if (response.status !== 200) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
    return response.data;
  } catch (err) {
    handleError("Error fetching cases by type:", err);
  }
};
