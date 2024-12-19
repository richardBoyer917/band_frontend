import React, {useEffect, useState} from "react";
import { Box } from "@mui/material";
import { ChichaBox } from "../../../components/ChichaBox";
import { BlackButton } from "../../../components/Buttons";
import { DataTable } from "../../../components/Tables";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../../../api/adminAPI";
import { 
    greyArrow,
    greyPencil,
    moveDown,
    moveUp,
    redTrash,
} from "../../../assets";
import FormDialog from "../../../components/Modal";
import { deleteThree, getThrees } from "../../../api/threeAPI";

const VisualizationTable = ({ id }) => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);
    const [three, setThree] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

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
        }
    };

    const handleThreeDelete = (index) => {
        deleteThree(index).then((data) => {
          let temp = addId(data);
          setThree(temp);
        });
      };

    const handleNewCreate = (url) => {
      navigate(url);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false); // Close the dialog
        setSelectedId(null); // Reset the selected ID
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
    
          const handleUpdate = () => {
            let url = `/admin/${type}`;
            let Data = params.row;
            navigate(url, { state: { Data } });
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
              {userInfo?.editing !== 0 && (
                <img
                  onClick={() => handleUpdate()}
                  src={greyPencil}
                  alt="greyPencil"
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

    const threeColumns = [
    { field: "_id", headerName: "ID", flex: 0.5 },
    { field: "title1", headerName: "Название1", flex: 2 },
    { field: "title2", headerName: "Название2", flex: 2 },
    createMediaColumn("video", "3D-визуализация"),
    createActionColumn("three", three, setThree, handleThreeDelete),
    ];

    useEffect(() => {
        getThrees().then((data) => {
            let temp = addId(data);
            setThree(temp)
        })

        getUserInfo().then((data) => {
            setUserInfo(data)
        })
    }, [])

    return(
        <div className="wrapper">
            <div className="section1">
                <ChichaBox
                    content={
                        <Box id={id}>
                        <div className="sectionHeader" style={{ marginBottom: "20px" }}>
                            <p className="sectionTitle">3D-визуализация</p>
                        </div>
                        <br />
                        <DataTable id={id} columns={threeColumns} data={three} />
                          {userInfo?.adding !== 0 &&
                            <BlackButton onClick={() => handleNewCreate("/admin/three")} title={`Новый 3D-визуализация`} />
                          }
                        </Box>
                    }
                />
            </div>

            <FormDialog
                opened={openDialog}
                idd={selectedId}
                onClose={handleCloseDialog}
            />
        </div>
    )
}

export default VisualizationTable;