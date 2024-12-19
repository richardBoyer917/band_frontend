export const defaultLink = "https://docs.google.com/forms/d/e/1FAIpQLSfKs1AfpUNM591y2wKODacMoENNU2QHJFu16zMQs6IDmCp-jQ/alreadyresponded"

export const handleDownload = (url, filename) => {
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
}