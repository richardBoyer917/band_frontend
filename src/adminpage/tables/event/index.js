import React from "react";
import CasesTable from "../cases";
import BestCaseTable from "../bestCase";

const MainEventTable = () => {
  return(
    <div className="wrapper">
      <div className="section1">
        <CasesTable />
        <BestCaseTable id="bestCase" />
      </div>
    </div>
  )
}

export default MainEventTable