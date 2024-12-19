import React, {useEffect, useState} from "react";
import { deleteCase, getCases } from "../../../api/caseAPI";
import { Box, Button } from "@mui/material";
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

const CasesTable = () => {
  const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);
    const [cases, setCases] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const moveRow = (tableData, setTableData, fromIndex, toIndex) => {
        if (toIndex >= 0 && toIndex < tableData?.length) {
          const updatedRows = [...tableData];
          const [movedRow] = updatedRows.splice(fromIndex, 1);
          updatedRows.splice(toIndex, 0, movedRow);
          setTableData(updatedRows);
        }
    };

    const handleDelete = (index) => {
        deleteCase(index).then((data) => {
          let temp = addId(data);
          setCases(temp);
        });
    };

    const handleOpenDialog = (id) => {
      setSelectedId(id);
      setOpenDialog(true); // Open the dialog
    };
    
    const handleCloseDialog = () => {
      setOpenDialog(false); // Close the dialog
      setSelectedId(null); // Reset the selected ID
    };
    
    const handleNewCreate = (url) => {
        navigate(url);
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

      const caseColumns = [
        { field: "_id", headerName: "ID", flex: 0.5 },
        { field: "name", headerName: "Имя", flex: 2 },
        { field: "blog_type", headerName: "Тип", flex: 1.5 },
        { field: "startDate", headerName: "Когда", flex: 1.5 },
        { field: "venue", headerName: "Адрес", flex: 1 },
        { field: "guests", headerName: "Гости", flex: 0.5 },
        createActionColumn("case", cases, setCases, handleDelete),
        {
            field: "addAction",
            headerName: "Добавить решение",
            flex: 1.5,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpenDialog(params.row.id)}
                >
                    Добавить
                </Button>
            ),
        },
      ];

    useEffect(() => {
      getCases().then((data) => {
          let temp = addId(data);
          setCases(temp)
      })

      getUserInfo().then((data) => {
          setUserInfo(data)
      })
    }, [])

  return(
    <>
      <ChichaBox
        content={
          <Box>
          <div className="sectionHeader" style={{ marginBottom: "20px" }}>
              <p className="sectionTitle">кейс мероприятия</p>
          </div>
          <br />
          <DataTable columns={caseColumns} data={cases} />
          {userInfo?.adding !== 0 &&
            <BlackButton onClick={() => handleNewCreate("/admin/case")} title={`Новый кейс мероприятия`} />
          }
          </Box>
        }
        
      />
      <FormDialog
        opened={openDialog}
        idd={selectedId}
        onClose={handleCloseDialog}
      />
    </>
  )
}

export default CasesTable