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
import { deleteEquip, getEquips } from "../../../api/equipAPI";

const EquipmentTable = ({ id }) => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);
    const [equipment, setEquipment] = useState([]);
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

    const handleEquipDelete = (index) => {
        deleteEquip(index).then((data) => {
          let temp = addId(data);
          setEquipment(temp);
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

      const equipmentColums = [
        { field: "_id", headerName: "ID", flex: 0.5 },
        { field: "name", headerName: "Имя", flex: 1 },
        { field: "queue", headerName: "Очередь", flex: 1 },
        { field: "type", headerName: "Тип", flex: 1 },
        { field: "description", headerName: "Описание", flex: 2 },
        { field: "manufacturer", headerName: "Производитель", flex: 1 },
        createMediaColumn("images", "Оборудование"),
        createActionColumn("equipment", equipment, setEquipment, handleEquipDelete),
      ];

    useEffect(() => {
        getEquips().then((data) => {
            let temp = addId(data);
            setEquipment(temp)
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
                            <p className="sectionTitle">Каталог оборудования</p>
                        </div>
                        <br />
                        <DataTable id={id} columns={equipmentColums} data={equipment} />
                          {userInfo?.adding !== 0 &&
                            <BlackButton onClick={() => handleNewCreate("/admin/equipment")} title={`Новый Каталог оборудования`} />
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

export default EquipmentTable;