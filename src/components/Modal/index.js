import React, { useState, useRef, useEffect } from "react";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import { gallery1, caseSolutionChiCha } from "../../assets";
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
      content:"",
      images:[
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
    getCaseById(idd).then((data)=>{
      data?.solution ? setFormData(data?.solution) : setFormData(initialFormData)
    })
  }, [idd])

  const handleContentChange = (e, index) => {
    const { value } = e.target;
    setEditedContent(prev => ({ ...prev, [`content-${index}`]: value }));
  };

  const updateContent = (index) => {
    const updatedData = [...formData];
    updatedData[index].content = editedContent[`content-${index}`] || "";
    setFormData(updatedData);
    setEditMode(prev => ({ ...prev, [`content-${index}`]: false }));
  };

  const handleTitleChange = (e, outerIndex, innerIndex) => {
    const { value } = e.target;
    const key = `title-${outerIndex}-${innerIndex}`;
    setEditedContent(prev => ({ ...prev, [key]: value }));
  };

  const updateTitle = (outerIndex, innerIndex) => {
    const updatedData = [...formData];
    updatedData[outerIndex].images[innerIndex].title = editedContent[`title-${outerIndex}-${innerIndex}`] || "";
    setFormData(updatedData);
    setEditMode(prev => ({ ...prev, [`title-${outerIndex}-${innerIndex}`]: false }));
  };

  const handleImageClick = (uniqueKey) => {
    fileInputRefs.current[uniqueKey]?.click();
  };

  const handleImageChange = (e, outerIndex, innerIdx) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const updatedData = [...formData];
        updatedData[outerIndex].images[innerIdx].image = reader.result;
        setFormData(updatedData);
        const uniqueKey = `${outerIndex}-${innerIdx}`;
        setUploadedImages(prev => ({ ...prev, [uniqueKey]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const getCardWidth = (index, idx) => {
    const widths = ["39.3%", "58.7%", "58.7%", "39.3%"];
    return index % 2 === 0 ? widths[idx % 4] : widths[(idx + 2) % 4];
  };

  const handleClose = () => {
    setFormData(initialFormData);
    setUploadedImages({})
    onClose();
  };

  const handleSubmit = () => {
    insertSolution(idd, formData).then((data) => {
      if(data && data.error){
        console.log("Error!")
      } else {
        console.log("Success!")
      }
    })
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
            {
              <div style={{ display: "grid", gap: "clamp(20px, 2vw, 24px)" }}>
                <p className="x30 caseChiCha">
                  <img className="firstImage" src={caseSolutionChiCha} alt="CaseSolutionChiCha" style={{ width: "31px", height: "39px", paddingRight: "16.29px" }} />
                  Решение кейса
                  <img className="secondImage" src={caseSolutionChiCha} alt="CaseSolutionChiCha" style={{ width: "31px", height: "39px", paddingLeft: "13px" }} />
                </p>

                <div className="flexWrap" style={{ display: "grid", gap: "clamp(68px,7vw,85px)" }}>
                  {formData?.map((item, index) => (
                    <div key={index} style={{ display: "grid", gap: "clamp(30px,3vw,40px)" }}>
                      {!editMode[`content-${index}`] ? (
                        <p
                          className="x20Font calleryContent"
                          onClick={() => {
                            setEditMode(prev => ({ ...prev, [`content-${index}`]: true }));
                            setEditedContent(prev => ({ ...prev, [`content-${index}`]: item.content }));
                          }}
                        >
                          {item.content ? item.content : "Please Insert the Content!!!"}
                        </p>
                      ) : (
                        <textarea
                          className="x20Font calleryContent"
                          value={editedContent[`content-${index}`] || ""}
                          onChange={e => handleContentChange(e, index)}
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
                                src={uploadedImages[uniqueKey] || imgItem.image || gallery1}
                                onClick={() => handleImageClick(uniqueKey)}
                                alt={imgItem.title || "Uploaded image"}
                                style={{ cursor: "pointer" }}
                              />
                              
                              {/* Conditional Rendering: Skip titles for the third array */}
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
            }
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
