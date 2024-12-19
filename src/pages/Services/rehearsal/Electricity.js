import { WhiteBox } from "../../../components/WhiteBox/WhiteBox"

const ElectricityInfo = [
  { smallText: "Раздельное подключение фаз", boldText: "присутствует" },
  { smallText: "Тип основного подключения", boldText: "розетка CEE 5p 63 A" },
  { smallText: "Тип вторичного подключения", boldText: "розетка CEE 5p 32 A" },
  { smallText: "Расстояние до сцены", boldText: "20 метров" },
  { smallText: "Защитный механизм", boldText: "автомат" },
  { smallText: "Максимальный ток отключения", boldText: "53 ампер" },
]

const Electricity = () => {
  const content = (
    <section>
      <p className="sectionTitle" style={{ color: `var(--primaryBgColor)`, width: '90%', marginBottom: '30px' }}>Электричество</p>
      <div className="flexWrapBetween">
        {ElectricityInfo.map((item, index) => (
          <div key={index} style={{ maxWidth: '310px', width: '100%' }}>
            <div>
              <p className="x20Font" style={{ fontWeight: '500' }}>{item.smallText}</p>
              <p className="x24Font_3 eleBoldText">{item.boldText}</p>
            </div>
            <hr className="eleHr" />
          </div>
        ))}
      </div>
      <p className="x20Font">Расположение точки подключения</p>
      <p className="x24Font_3 eleBoldText">Правая сторона сцены, сзади под сценой</p>
    </section>
  )

  return (
    <WhiteBox content={content} />
  )
}

export default Electricity