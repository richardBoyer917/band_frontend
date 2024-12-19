import { ChichaBox } from "../../../components/ChichaBox"
import { DetailDataInput } from "../../../components/Inputs"

const AudioriumLeftInfo = [
  { text: 'Всего зрительных мест', number: 1372 },
  { text: 'Из них в партере', number: 1011 },
  { text: 'Балкон', number: 1 },
  { text: 'Мест на балконе', number: 361 },
  { text: 'Проходов в зале', number: 3 }
]

const Auditorium = () => {
  const AuditoriumBottom = () => (
    <div className="audiTextContainer" style={{ paddingTop: '20px' }}>
      <div className="audiBoldTextWrap">
        <p>Места под пультовую</p>
        <p className="audiBoldText">3 гримерные комнаты</p>
      </div>
      <div className="audiSmallTextWrap">
        <p>Между 11-м и 12-м<br />рядами в центре зала</p>
        <p className="audiSmallText">Две из них по 10 м²<br />и одна — по 15 м²</p>
      </div>
    </div>
  )

  const content = (
    <section>
      <p className="sectionTitle" style={{ color: `var(--primaryBgColor)`, width: '90%' }}>Зрительный зал</p>
      <div className="flexWrapBetween" style={{ marginTop: '30px', gap: 'clamp(30px, 3.5vw, 40px)' }}>
        <div className="auditoriumLeft">
          <span className="auditoriumLeftTitle absoluteCenter">схема зала</span>
        </div>
        <div className="auditoriumRight alignCenter">
          <div style={{ width: '100%' }}>
            {AudioriumLeftInfo.map((item, index) => (
              <DetailDataInput key={index} item={item} index={index} />
            ))}
            <AuditoriumBottom />
          </div>
        </div>
      </div>
    </section>
  )
  return (
    <ChichaBox flag={true} content={content} />
  )
}

export default Auditorium