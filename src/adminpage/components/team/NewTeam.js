import { useState } from "react";
import "react-datepicker/dist/react-datepicker.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { CreatePageWrapper } from "../AdminSection";
import { Input, } from "../../../components/Inputs";
import { insertTeam } from "../../../api/teamAPI";
import LoadingProgress from "../../../components/Loading/Loading";

const NewTeam = () => {

  const location = useLocation();
  const { Data } = location.state || {};
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    competencies: Data?.competencies || [],
    tag1: Data?.tag1 || "",
    tag2: Data?.tag2 || "",
    tag3: Data?.tag3 || "",
    tag4: Data?.tag4 || "",
    tag5: Data?.tag5 || "",
    tag6: Data?.tag6 || "",
    tag7: Data?.tag7 || "",
    tag8: Data?.tag8 || "",
    links: Data?.links || "",
  });
  const inputinfo = [
    { title: 'компетенций1', name: 'competencies', type: 'text', placeholder: 'Введите компетенций1' },
    { title: 'компетенций2', name: 'competencies', type: 'text', placeholder: 'Введите компетенций2' },
    { title: 'компетенций3', name: 'competencies', type: 'text', placeholder: 'Введите компетенций3' },
    { title: 'компетенций4', name: 'competencies', type: 'text', placeholder: 'Введите компетенций4' },
    { title: 'компетенций5', name: 'competencies', type: 'text', placeholder: 'Введите компетенций5' },
    { title: 'компетенций6', name: 'competencies', type: 'text', placeholder: 'Введите компетенций6' },
    { title: 'Ярлык1', name: 'tag1', type: 'text', placeholder: 'Введите Ярлык1' },
    { title: 'Ярлык2', name: 'tag2', type: 'text', placeholder: 'Введите Ярлык2' },
    { title: 'Ярлык3', name: 'tag3', type: 'text', placeholder: 'Введите Ярлык3' },
    { title: 'Ярлык4', name: 'tag4', type: 'text', placeholder: 'Введите Ярлык4' },
    { title: 'Ярлык5', name: 'tag5', type: 'text', placeholder: 'Введите Ярлык5' },
    { title: 'Ярлык6', name: 'tag6', type: 'text', placeholder: 'Введите Ярлык6' },
    { title: 'Ярлык7', name: 'tag7', type: 'text', placeholder: 'Введите Ярлык7' },
    { title: 'Ярлык8', name: 'tag8', type: 'text', placeholder: 'Введите Ярлык8' },
    { title: 'ссылок', name: 'links', type: 'text', placeholder: 'Введите ссылок' },
  ]
  const navigate = useNavigate();

  const handleChange = (e, index) => {
    const { name, value } = e.target;

    if (name === 'competencies') {
      const updatedCompetencies = [...formData.competencies];
      updatedCompetencies[index] = value;
      setFormData({ ...formData, competencies: updatedCompetencies });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    const dataToSubmit = {
      ...formData, // Spread the current formData
      competencies: formData.competencies.filter(competency => competency), // Filter out any empty competencies if needed
    };
    const request = Data && insertTeam(dataToSubmit)

    request.then((data) => {
      if(data && data.error){
        console.log(data.error)
      } else {
        navigate('/admin/newTeamTable')
      }
    }).finally(() => {
      setLoading(false)
    })
  };

  return (
    <CreatePageWrapper title='Введите свой #ЗаводШоу подробности здесь' handleSubmit={handleSubmit} link="/admin/newTeamTable"
      content={
        <>
          {inputinfo.map((item, index) => (
            <div key={index}>
              <p className="x16">{item.title}</p>
              <Input value={item.name === 'competencies' ? formData[item.name][index] : formData[item.name]} item={item} handleChange={(e) => handleChange(e, index)} />
            </div>
          ))}
          {loading && (
            <LoadingProgress />
          )}
        </>
      } />
  );
};

export default NewTeam;
