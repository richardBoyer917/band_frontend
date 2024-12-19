import { PendingCard } from "../../components/Cards";
import { ChichaBox } from "../../components/ChichaBox";

import { pendingCardInfo } from "../../constant/group";

const PendingSection = () => {
  const content = (
    <>
      <p
        className="sectionTitle sectionHeader"
        style={{ color: `var(--primaryBgColor)`, width: "90%" }}
      >
        Проверьте идею заранее
        <br /> и сократите риски
      </p>
      <div className="flexWrap itemCenter" style={{ gap: "40px" }}>
        {pendingCardInfo.map((item, index) => (
          <PendingCard key={index} item={item} />
        ))}
      </div>
    </>
  );

  return <ChichaBox content={content} />;
};

export default PendingSection;
