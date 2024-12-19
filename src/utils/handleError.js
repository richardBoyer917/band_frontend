export const handleError = (message, err) => {
  if (err.response) {
    console.error(
      message,
      "Server error:",
      err.response.status,
      err.response.data
    );
  } else if (err.request) {
    console.error(message, "Network error: No response received from server");
  } else {
    console.error(message, "Error in request setup:", err.message);
  }
};
