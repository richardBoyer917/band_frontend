import React, {useEffect, useState} from "react";
import { Box, Snackbar, Alert } from "@mui/material";
import { ChichaBox } from "../../../components/ChichaBox";
import { BestCaseTagButton, BlackButton } from "../../../components/Buttons";
import { DataTable } from "../../../components/Tables";
import { useNavigate } from "react-router-dom";
import { 
    greyArrow,
    moveDown,
    moveUp,
    redTrash,
} from "../../../assets";
import { deleteTagCase, getCasesWithTags } from "../../../api/caseAPI";

export const bestCaseInfo = [
    { title: "Главная", galleryType: "Home" },
    { title: "События", galleryType: "Events" },
    { title: "Туры", galleryType: "Tours" },
    { title: "Свет", galleryType: "Light" },
    { title: "Звук", galleryType: "Sound" },
    { title: "Видео", galleryType: "Video" },
    { title: "Одежда сцены", galleryType: "Stage" },
  ];

const BestCaseTable = ({ id }) => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);
    const [bestCases, setBestCases] = useState([]);
    const [caseType, setCaseType] = useState("Главная");
    const [notification, setNotification] = useState({
      open: false,
      message: "",
      severity: "info",
    });

    const handleNotification = (message, severity = "info") => {
      setNotification({ open: true, message, severity });
    };

    const handleCloseNotification = () => {
      setNotification({ ...notification, open: false });
    };

    const createMediaColumn = (field, headerName) => ({
        field,
        headerName,
        flex: 1,
        renderCell: (params) => {
        const src = field === "images" ? `${params.value[0]}` : `${params.value}`;
        const style =
            field === "video"
            ? { width: 70, height: 50, marginRight: 8, objectFit: "cover" }
            : { width: 50, height: 50, objectFit: "cover" };

        return field === "video" ? (
            <video src={src} alt="media" style={style} controls />
        ) : (
            <img src={src} alt="media" style={style} />
        );
        },
    })

    const moveRow = (tableData, setTableData, fromIndex, toIndex) => {
      if (toIndex >= 0 && toIndex < tableData?.length) {
        const updatedRows = [...tableData];
        const [movedRow] = updatedRows.splice(fromIndex, 1);
        updatedRows.splice(toIndex, 0, movedRow);
        setTableData(updatedRows);
        handleNotification("Row moved successfully", "success");
      }
    };

    const handleDelete = (index) => {
      deleteTagCase(index, caseType)
        .then((data) => {
          getCasesWithTags(caseType, 9)
          .then((data) => {
            let temp = addId(data);
            setBestCases(temp);
        })
        .catch((error) => {
            handleNotification("Error fetching cases by type", "error");
        });
          console.log(data)
        }).catch((error) =>{
          console.log("error", error)
        })
    };

    const handleNewCreate = (url) => {
      if(url === "/admin/events" && bestCases?.length >= 9){
        handleNotification("Cannot add more than 9 cases to this block", "error")
      } else {
        navigate(url);
      }
    };

    const handleSelBestCase = (type) => {
        setCaseType(type);
    };

    const addId = (data) => {
    let temp = [];
    data?.map(
        (item, index) => ((temp[index] = item), (temp[index]._id = index + 1))
    );
    return temp;
    };
    const createActionColumn = (
        type,
        tableData,
        setTableData,
        handleDelete,
        link,
        scrollSpy
      ) => ({
        field: "action",
        headerName: "Действие",
        flex: 2,
        renderCell: (params) => {
          const rowIndex = tableData.findIndex((row) => row.id === params.row.id);
    
          const handlePreview = () => {
            if (link) {
              navigate(link);
              setTimeout(() => {
                const section = document.getElementById(scrollSpy);
                if (section) {
                  const sectionY =
                    section.getBoundingClientRect().top + window.pageYOffset - 200;
                  window.scrollTo({ top: sectionY, behavior: "smooth" });
                }
              }, 300);
            } else {
              navigate(`/${type}-one/${params.row.id}`);
            }
          };
    
          return (
            <div
              className="spaceAround adminDirectoryEdit"
              style={{ height: "100%", width: "100%" }}
            >
              {type !== "three" && (
                <img
                  onClick={() => handlePreview()}
                  src={greyArrow}
                  alt="greyArrow"
                />
              )}
              {userInfo?.deleting !== 0 && (
                <img
                  onClick={() => handleDelete(params.row.id)}
                  src={redTrash}
                  alt="redTrash"
                />
              )}
              <img
                onClick={() =>
                  moveRow(tableData, setTableData, rowIndex, rowIndex - 1)
                }
                src={moveUp}
                alt="moveUp"
              />
              <img
                onClick={() =>
                  moveRow(tableData, setTableData, rowIndex, rowIndex + 1)
                }
                src={moveDown}
                alt="moveDown"
              />
            </div>
          );
        },
      });

      const bestCaseColumns = [
        { field: "_id", headerName: "ID", flex: 0.5 },
        { field: "name", headerName: "Кейс", flex: 3.5 },
        {field: "blog_type", headerName: "Дело", flex: 2},
        createMediaColumn("video", "Дело"),
        createActionColumn("case", bestCases, setBestCases, handleDelete),
      ];

    useEffect(() => {
      getCasesWithTags(caseType, 9)
        .then((data) => {
            let temp = addId(data);
            setBestCases(temp);
        })
        .catch((error) => {
            handleNotification("Error fetching cases by type", "error");
        });
    }, [caseType]);

    return(
      <>
        <ChichaBox
          content={
            <Box id="newCase">
              <div className="sectionHeader" style={{ marginBottom: "20px" }}>
                  <p className="sectionTitle">Раздел «Лучшие кейсы»</p>
              </div>
              <br />
              {id === "bestCase" && (
                  <div className="alignCenter flexWrap">
                      {bestCaseInfo?.map((item, index) => (
                      <BestCaseTagButton
                          key={index}
                          title={item.title}
                          className={
                              caseType === item.title ? "selBestCase" : ""
                          }
                          onClick={() => handleSelBestCase(item.title)}
                      />
                      ))}
                  </div>
                  )}
              <DataTable id="newCase" columns={bestCaseColumns} data={bestCases} />
              {userInfo?.adding !== 0 &&
                <div className="spaceBetween">
                    <div className="alignCenter">
                    <BlackButton
                        onClick={() => handleNewCreate("/admin/events")}
                        title={`добавить кейс`}
                    />
                    <span style={{ marginLeft: "25px" }}>
                        Можно добавить еще {9 - bestCases.length} кейса
                    </span>
                    </div>
                    <span style={{ paddingRight: "10px" }}>
                    <b>На странице:</b> {bestCases.length} кейсов
                    </span>
                </div>
              }
            </Box>
          }
        />

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseNotification} severity={notification.severity} variant="filled">
            {notification.message}
        </Alert>
      </Snackbar>
      </>
    )
}

export default BestCaseTable;