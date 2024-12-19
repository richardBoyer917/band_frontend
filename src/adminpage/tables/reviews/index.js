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
import { deleteReview, getReviews } from "../../../api/reviewAPI";

const ReviewTable = ({ id }) => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);
    const [revlist, setRevlist] = useState([]);
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

    const handleRevDelete = (index) => {
        deleteReview(index).then((data) => {
          let temp = addId(data);
          setRevlist(temp);
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

      const reviewColumns = [
        { field: "_id", headerName: "ID", flex: 0.5 },
        { field: "type", headerName: "Тип", flex: 1 },
        { field: "name", headerName: "Имя", flex: 1 },
        { field: "queue", headerName: "Очередь", flex: 1 },
        { field: "displayType", headerName: "Тип", flex: 1 },
        { field: "content", headerName: "Содержание", flex: 2 },
        createActionColumn(
          "review",
          revlist,
          setRevlist,
          handleRevDelete,
          "/services/visualization",
          "customerReviewSection"
        ),
      ];

    useEffect(() => {
        getReviews().then((data) => {
            let temp = addId(data);
            setRevlist(temp)
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
                            <p className="sectionTitle">Отзывы (Нас рекомендуют)</p>
                        </div>
                        <br />
                        <DataTable id={id} columns={reviewColumns} data={revlist} />
                        {userInfo?.adding !== 0 &&
                          <BlackButton onClick={() => handleNewCreate("/admin/review")} title={`Новый Отзывы (Нас рекомендуют)`} />
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

export default ReviewTable;