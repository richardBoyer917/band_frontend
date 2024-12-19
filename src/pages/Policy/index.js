import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { policyAccordion } from "../../constant/group";
import { cancelIcon, plusIcon } from "../../assets";
import useScrollToTop from "../../hooks/useScrollToTop";
import "../../styles/pages/policy.css";
const Policy = () => {
  useScrollToTop();
  const [selectIndex, setSelectIndex] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClick = (index) => {
    setOpen((prev) => !prev || selectIndex !== index);
    setSelectIndex(index);
  };
  return (
    <div className="wrapper">
      <div className="container">
        <div className="sectionWrapper section2">
          <p className="policyTopLine x30Font_2 ">
            Политика конфиденциальности
          </p>
          <div className="policyAccordion">
            {policyAccordion.map((item, index) => (
              <div className="policyAccordionLine" key={index}>
                <Accordion
                  className="policyAccordionGap"
                  expanded={selectIndex === index && open}
                >
                  <AccordionSummary
                    expandIcon={
                      selectIndex === index && open ? (
                        <img
                          className="policyAddIcon"
                          src={cancelIcon}
                          alt="cancelIcon"
                        />
                      ) : (
                        <img
                          className="policyAddIcon"
                          src={plusIcon}
                          alt="plusIcon"
                        />
                      )
                    }
                    aria-controls={`panel${index}-content`}
                    id={`panel${index}-header`}
                    onClick={() => handleClick(index)}
                  >
                    <div className="x20">{item.title}</div>
                  </AccordionSummary>
                  <AccordionDetails className="policyAccordionTxt">
                    <div className="x16Font_3">{item.txt1}</div>
                    <div className="x16Font_3">{item.txt2}</div>
                  </AccordionDetails>
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Policy;
