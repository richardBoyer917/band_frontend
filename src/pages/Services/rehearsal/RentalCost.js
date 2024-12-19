import { useEffect, useState } from "react";
import { RentalCostCard, RentalCostDocCard } from "../../../components/Cards";
import { ChichaBox } from "../../../components/ChichaBox";
import { getRental } from "../../../api/rentalAPI";

const rentalDocumentInfo = [
  { text: "3D-макеты сцены", size: "ZIP 50 Мб" },
  { text: "Тех. райдер площадки", size: "ZIP 3.54 Мб" },
  { text: "Архив фото", size: "ZIP 2.1 Мб" },
];

const RentalCost = () => {
  const [rental, setRental] = useState();

  useEffect(() => {
    getRental().then((data) => {
      data && setRental(data);
    });
  }, []);

  const RentalDocument = ({ documentFile }) => (
    <div className="flexWrapBetween">
      {rentalDocumentInfo.map((item, index) => (
        <RentalCostDocCard
          docFile={documentFile && documentFile[index] && documentFile[index]}
          key={index}
          item={item}
        />
      ))}
    </div>
  );

  const content = (
    <section>
      <p
        className="sectionTitle"
        style={{ color: `var(--primaryBgColor)`, width: "90%" }}
      >
        Стоимость аренды базы
      </p>
      <div className="rentalBody">
        <div className="rentalLeft">
          <RentalCostCard cost={rental?.cost} />
          <div className="chichaShow">
            <RentalDocument documentFile={rental?.files} />
          </div>
        </div>
        <div className="rentalRight">
          <div className="rentalRightTextSquare">
            <p
              className="cardTitle"
              style={{ marginBottom: "clamp(20px, 3vw, 35px)" }}
            >
              За отдельную плату может быть установлен любой технический сетап
              и предоставлены специалисты по свету, звуку и видео
            </p>
            <p className="cardDescription" style={{ marginBottom: "15px" }}>
              *Компании, осуществляющие техническое обеспечение репетиции
              обязаны иметь сотрудников с соответствующей квалификацией
              по электробезопасности, охране труда и пожарной безопасности.
            </p>
            <p className="cardDescription">
              Документы, подтверждающие квалификацию ответственных сотрудников
              должны быть предоставлены за 1 (одни) сутки до начала репетиции.
              В противном случае компании-подрядчику может быть отказано
              в доступе на площадку
            </p>
          </div>
          <div className="chichaHidden">
            <RentalDocument />
          </div>
        </div>
      </div>
    </section>
  );

  return <ChichaBox content={content} />;
};

export default RentalCost;
