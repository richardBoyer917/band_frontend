import React, {useEffect, useState} from "react";
import { OutLinedButton } from "../../../components/Buttons";
import { Box, Typography } from "@mui/material";
import { ChichaBox } from "../../../components/ChichaBox";
import { BlackButton, TabButton } from "../../../components/Buttons";
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
import { getRental, insertRental } from "../../../api/rentalAPI";
import { deleteParticipant, getParticipant } from "../../../api/participantAPI";
import { Input } from "../../../components/Inputs";
import { darkAdd } from "../../../assets";

const RehearsalTable = ({ id }) => {
    const navigate = useNavigate()
    const [userInfo, setUserInfo] = useState(null);
    const [participant, setParticipant] = useState([]);
    const [rental, setRental] = useState({ cost: "", files: [] });

    const handleFileChange = (e, index) => {
        const file = e.target.files[0];
        setRental((prevState) => {
            const updatedFiles = [...(prevState.files || [])];
            updatedFiles[index] = file;
            return {
            ...prevState,
            files: updatedFiles,
            };
        });
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

    const addId = (data) => {
    let temp = [];
    data?.map(
        (item, index) => ((temp[index] = item), (temp[index]._id = index + 1))
    );
    return temp;
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
      });

    const moveRow = (tableData, setTableData, fromIndex, toIndex) => {
    if (toIndex >= 0 && toIndex < tableData?.length) {
        const updatedRows = [...tableData];
        const [movedRow] = updatedRows.splice(fromIndex, 1);
        updatedRows.splice(toIndex, 0, movedRow);
        setTableData(updatedRows);
    }
    };

    const handleParticipantDelete = (index) => {
        deleteParticipant(index).then((data) => {
          let temp = addId(data);
          setParticipant(temp);
        });
      };

    const participantColumns = [
        { field: "_id", headerName: "ID", flex: 0.5 },
        { field: "name", headerName: "Имя", flex: 4 },
        createMediaColumn("image", "Avatar"),
        createActionColumn(
          "participant",
          participant,
          setParticipant,
          handleParticipantDelete,
          "/services/showdevelopment",
          "userLists"
        ),
      ];

    const inputinfo = {
        title: "Стоимость аренды",
        name: "cost",
        type: "text",
        placeholder: "Введите Стоимость аренды",
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRental({ ...rental, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let newFormData = new FormData();
        Object.keys(rental).forEach((key) => {
          if (key === "files") {
            rental[key].forEach((file) => newFormData.append("files[]", file));
          } else {
            newFormData.append(key, rental[key]);
          }
        });
        insertRental(newFormData).then((data) => {
          console.log("data", data);
        });
    };

    const handleNewCreate = (url) => {
      navigate(url);
    }

    
    useEffect(() => {
        getRental()
          .then((data) => {
            if (data) {
              setRental(data);
            } else {
              setRental({ cost: "", files: [] });
            }
          })
          .catch((error) => {
            console.error("Error fetching rental data: ", error);
            setRental({ cost: "", files: [] });
          });
      }, []);

    useEffect(() => {
        getUserInfo().then((data) => {
            setUserInfo(data)
        })

        getParticipant().then((data) =>{
            let temp = addId(data);
            setParticipant(temp)
        })
    }, [])

    const fileList = ["3D-макеты сцены", "Тех.райдер площадки", "Архив фото"];

    return(
        <div className="wrapper">
        <div className="section1">
            <ChichaBox
                content={
                <Box id={id}>
                    <div className="sectionHeader">
                        <p
                        className="sectionTitle"
                        style={{ color: `var(--primaryBgColor)` }}
                        >
                            Репетиционная база
                        </p>
                    </div>
                    <DataTable columns={participantColumns} data={participant} />
                    {userInfo?.adding !== 0 && (
                        <BlackButton title={`Новый Репетиционная база`} onClick={() => handleNewCreate("/admin/participant")}>
                            Новый Репетиционная база
                        </BlackButton>
                    )}
                    <div>
                        <form
                            onSubmit={handleSubmit}
                            style={{ display: "flex", gap: "18px" }}
                            className="itemCenter"
                        >
                            <div
                            style={{ display: "flex", gap: "10px" }}
                            className="itemCenter"
                            >
                                <p className="x16">{inputinfo.title}:</p>
                                <Input
                                    value={rental.cost || ""}
                                    item={inputinfo}
                                    handleChange={handleChange}
                                />
                                </div>
                                <div style={{ display: "flex", gap: "10px" }}>
                                {fileList.map((item, index) => (
                                    <div key={index}>
                                    <TabButton
                                        icon={darkAdd}
                                        title={item}
                                        onChange={(e) => handleFileChange(e, index)}
                                    />
                                    {rental.files && rental.files[index] && (
                                        <Typography>
                                        {" "}
                                        Выбранный файл: {rental.files[index].name}
                                        </Typography>
                                    )}
                                    </div>
                                ))}
                                </div>
                                <OutLinedButton type="submit" title="Применять" />
                            </form>
                        </div>
                    </Box>
                }
            />
        </div>
    </div>
    )
}

export default RehearsalTable;