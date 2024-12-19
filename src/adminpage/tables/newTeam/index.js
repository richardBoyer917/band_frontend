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
import { getTeam } from "../../../api/teamAPI";

const NewTeamTable = ({ id }) => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);
    const [team, setTeam] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

    const moveRow = (tableData, setTableData, fromIndex, toIndex) => {
        if (toIndex >= 0 && toIndex < tableData?.length) {
          const updatedRows = [...tableData];
          const [movedRow] = updatedRows.splice(fromIndex, 1);
          updatedRows.splice(toIndex, 0, movedRow);
          setTableData(updatedRows);
        }
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
              navigate(`/team`);
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

    const teamColumns = [
        { field: "_id", headerName: "ID", flex: 0.5 },
        { field: "tag1", headerName: "Тег1", flex: 1 },
        { field: "tag2", headerName: "Тег2", flex: 1 },
        { field: "tag3", headerName: "Тег3", flex: 1 },
        { field: "tag4", headerName: "Тег4", flex: 1 },
        { field: "tag5", headerName: "Тег5", flex: 1 },
        { field: "tag6", headerName: "Тег6", flex: 1 },
        { field: "tag7", headerName: "Тег7", flex: 1 },
        { field: "tag8", headerName: "Тег8", flex: 1 },
        createActionColumn("team", team, setTeam, () => {
            console.log("handleTeamDelete");
        }),
    ];

    useEffect(() => {
        getTeam().then((data) => {
            let temp = addId(data);
            setTeam(temp)
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
                            <p className="sectionTitle">Команда</p>
                        </div>
                        <br />
                        <DataTable id={id} columns={teamColumns} data={team} />
                          {userInfo?.adding !== 0 &&
                            <BlackButton onClick={() => handleNewCreate("/admin/team")} title={`Новый Команда`} />
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

export default NewTeamTable;