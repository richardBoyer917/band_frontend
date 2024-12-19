import React, { useState, useRef, useEffect } from "react";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import { uploadImage, caseSolutionChiCha } from "../../assets";
import { getCaseById, insertSolution } from "../../api/caseAPI";

export default function FormDialog({ opened, idd, onClose }) {
  const initialFormData = [
    {
      content: "",
      images: [
        { image: "", title: "" },
        { image: "", title: "" },
      ]
    },
    {
      content: "",
      images: [
        { image: "", title: "" },
        { image: "", title: "" },
      ]
    },
    {
      content: "",
      images: [
        { image: "" },
        { image: "" },
        { image: "" },
        { image: "" },
      ]
    }
  ];

  const [formData, setFormData] = useState([]);
  const [uploadedImages, setUploadedImages] = useState({});
  const fileInputRefs = useRef({});
  const [editMode, setEditMode] = useState({});
  const [editedContent, setEditedContent] = useState({});

  useEffect(() => {
    getCaseById(idd).then((data) => {
      if (data?.solution) {
        // Extend solution if it has fewer items than initialFormData
        const extendedData = data.solution.length < initialFormData.length
          ? data.solution.concat(initialFormData.slice(data.solution.length))
          : data.solution;

        // Apply missing data from initialFormData if fields are missing
        const finalData = extendedData.map((item, index) => {
          // Apply content and images from initialFormData where missing
          return {
            ...initialFormData[index],
            ...item,
            images: item.images?.length ? item.images : initialFormData[index].images,
            content: item.content || initialFormData[index].content
          };
        });

        setFormData(finalData);
      } else {
        setFormData(initialFormData);
      }
    });
  }, [idd]);

  const handleContentChange = (e, index) => {
    const { value } = e.target;
    setEditedContent((prev) => ({ ...prev, [`content-${index}`]: value }));
  };

  const updateContent = (index) => {
    const updatedData = [...formData];
    updatedData[index].content = editedContent[`content-${index}`] || "";
    setFormData(updatedData);
    setEditMode((prev) => ({ ...prev, [`content-${index}`]: false }));
  };

  const handleTitleChange = (e, outerIndex, innerIndex) => {
    const { value } = e.target;
    const key = `title-${outerIndex}-${innerIndex}`;
    setEditedContent((prev) => ({ ...prev, [key]: value }));
  };

  const updateTitle = (outerIndex, innerIndex) => {
    const updatedData = [...formData];
    updatedData[outerIndex].images[innerIndex].title = editedContent[`title-${outerIndex}-${innerIndex}`] || "";
    setFormData(updatedData);
    setEditMode((prev) => ({ ...prev, [`title-${outerIndex}-${innerIndex}`]: false }));
  };

  const handleImageClick = (uniqueKey) => {
    fileInputRefs.current[uniqueKey]?.click();
  };

  const handleImageChange = (e, outerIndex, innerIdx) => {
    const file = e.target.files?.[0];
    if (file) {
      const updatedData = [...formData];
      updatedData[outerIndex].images[innerIdx].image = file;

      setFormData(updatedData);
      const uniqueKey = `${outerIndex}-${innerIdx}`;
      setUploadedImages((prev) => ({
        ...prev,
        [uniqueKey]: URL.createObjectURL(file), // For previewing
      }));
    }
  };

  const getCardWidth = (index, idx) => {
    const widths = ["39.3%", "58.7%", "58.7%", "39.3%"];
    return index % 2 === 0 ? widths[idx % 4] : widths[(idx + 2) % 4];
  };

  const handleClose = () => {
    setFormData(initialFormData);
    setUploadedImages({});
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newFormData = new FormData();
  
    // Add each block's data to FormData
    formData.forEach((block, blockIndex) => {
      // Add content
      newFormData.append(`solution[${blockIndex}][content]`, block.content);
  
      // Add images
      block.images.forEach((imageItem, imageIndex) => {
        // Check if image is a File object (new upload) or URL string (existing image)
        if (imageItem.image instanceof File) {
          // If it's a new file upload
          newFormData.append(
            `solution[${blockIndex}][images][${imageIndex}][image]`,
            imageItem.image
          );
        } else if (typeof imageItem.image === 'string' && imageItem.image !== '') {
          // If it's an existing image URL
          newFormData.append(
            `solution[${blockIndex}][images][${imageIndex}][image]`,
            imageItem.image
          );
        }
  
        // Add title if it exists (skip for the third block which doesn't have titles)
        if (blockIndex !== 2 && imageItem.title !== undefined) {
          newFormData.append(
            `solution[${blockIndex}][images][${imageIndex}][title]`,
            imageItem.title || ''
          );
        }
      });
    });
  
    // Send to backend
    insertSolution(idd, newFormData)
      .then((data) => {
        if (data && data.error) {
          console.log("Error:", data.error);
          // Add error handling (e.g., show error message to user)
        } else {
          console.log("Success!");
          handleClose(); // Close the dialog on success
          // Add success message or any other success handling
        }
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        // Add error handling
      });
  };

  return (
    <Dialog
      open={opened}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth={false}
      PaperProps={{
        sx: {
          width: '1440px',
          maxWidth: '1440px',
          background: "var(--primaryBgColor)"
        }
      }}
      sx={{ backdropFilter: 'blur(8px)' }}
    >
      <DialogContent sx={{ width: '100%', boxSizing: 'border-box', overflowX: 'hidden' }}>
        <div className="container">
          <div className="section caseEvent1">
            <div style={{ display: "grid", gap: "clamp(20px, 2vw, 24px)" }}>
              <p className="x30 caseChiCha">
                <img
                  className="firstImage"
                  src={caseSolutionChiCha}
                  alt="CaseSolutionChiCha"
                  style={{ width: "31px", height: "39px", paddingRight: "16.29px" }}
                />
                Решение кейса
                <img
                  className="secondImage"
                  src={caseSolutionChiCha}
                  alt="CaseSolutionChiCha"
                  style={{ width: "31px", height: "39px", paddingLeft: "13px" }}
                />
              </p>
              <div className="flexWrap" style={{ display: "grid", gap: "clamp(68px,7vw,85px)" }}>
                {formData?.map((item, index) => (
                  <div key={index} style={{ display: "grid", gap: "clamp(30px,3vw,40px)" }}>
                    {!editMode[`content-${index}`] ? (
                      <p
                        className="x20Font calleryContent"
                        onClick={() => {
                          setEditMode((prev) => ({ ...prev, [`content-${index}`]: true }));
                          setEditedContent((prev) => ({ ...prev, [`content-${index}`]: item.content }));
                        }}
                      >
                        {item.content ? item.content : "Please Insert the Content!!!"}
                      </p>
                    ) : (
                      <textarea
                        className="x20Font calleryContent"
                        value={editedContent[`content-${index}`] || ""}
                        onChange={(e) => handleContentChange(e, index)}
                        onBlur={() => updateContent(index)}
                        rows={3}
                        autoFocus
                      />
                    )}

                    <div className="flexWrap" style={{ width: "100%", gap: "clamp(10px,1.3vw,20px)" }}>
                      {item.images?.map((imgItem, idx) => {
                        const uniqueKey = `${index}-${idx}`;
                        const titleKey = `title-${index}-${idx}`;
                        return (
                          <div
                            key={uniqueKey}
                            className="caseCardImg"
                            style={{
                              width: getCardWidth(index, idx),
                              display: "grid",
                              gap: "clamp(10px,1.3vw,20px)",
                              borderRadius: "10px",
                            }}
                          >
                            <input
                              type="file"
                              accept="image/*"
                              ref={(el) => (fileInputRefs.current[uniqueKey] = el)}
                              onChange={(e) => handleImageChange(e, index, idx)}
                              style={{ display: "none" }}
                            />
                            <img
                              src={uploadedImages[uniqueKey] || imgItem.image || uploadImage}
                              onClick={() => handleImageClick(uniqueKey)}
                              alt={imgItem.title || "Uploaded image"}
                              style={{ cursor: "pointer" }}
                            />
                            {index !== 2 && (!editMode[titleKey] ? (
                              <p
                                className="x18_3"
                                onClick={() => {
                                  setEditMode((prev) => ({ ...prev, [titleKey]: true }));
                                  setEditedContent((prev) => ({ ...prev, [titleKey]: imgItem.title }));
                                }}
                              >
                                {imgItem.title ? imgItem.title : "Please Insert the Title!!!"}
                              </p>
                            ) : (
                              <input
                                className="x18_3 calleryContent"
                                value={editedContent[titleKey] || ""}
                                onChange={(e) => handleTitleChange(e, index, idx)}
                                onBlur={() => updateTitle(index, idx)}
                                autoFocus
                              />
                            ))}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}
