import { Link } from "react-scroll"
import { curtain1, curtain2, curtain3, curtain4 } from "../../../assets"
import { BlackButton } from "../../../components/Buttons"
import { ChichaBoxRightCard } from "../../../components/Cards"
import { LeftChichaBox } from "../../../components/ChichaBox"
import { DetailDataInput } from "../../../components/Inputs"

const transparentCurtainInfo = [
  { text: "Ширина", number: "110 метров" },
  { text: "Длина", number: "X метров" },
  { text: "Вес ткани", number: "90г/м²" },
  { text: "Цвет", number: "Белый" },
  {
    text: "Применяется в качестве проекционного материала в театре и шоу, а так же для натяжных потолков, стен выставочных стендов, архитектурных элементов",
    number: ""
  },
]

const curtainImageInfo = [curtain1, curtain2, curtain3, curtain4]

const TransCurtain = () => {

  const ChichaGallery = () => (
    <div className="curtainGallery flexWrapBetween">
      <img src={curtainImageInfo[0]} alt="curtain" />
      <img src={curtainImageInfo[1]} alt="curtain" />
      <img src={curtainImageInfo[2]} alt="curtain" />
      <img src={curtainImageInfo[3]} alt="curtain" />
    </div>
  )

  return (
    <div>
      <LeftChichaBox content={<div>
        <div className="section2" style={{ textAlign: 'right' }}>
          <p className="sectionTitle" style={{ color: 'var(--primaryBgColor)' }}>Прозрачный занавес</p>
        </div>
        <div className="flexWrapBetween transCurtain" style={{ marginTop: '30px', gap: 'clamp(0px, 2vw,20px)' }}>
          <div className="transCurtainGallery alignCenter chichaHidden">
            <ChichaGallery />
          </div>
          <ChichaBoxRightCard
            content={<div>
              {transparentCurtainInfo.map((item, index) => (
                <DetailDataInput key={index} item={item} index={index} />
              ))}
              <Link to="contactSection" offset={-200} spy={true} smooth={true}>
                <div style={{ marginTop: 'clamp(10px, 20vw, 40px)' }}><BlackButton title="CДЕЛАТЬ РАСЧЁТ" /></div>
              </Link>
            </div>} />
          <div className="transCurtainGallery alignCenter chichaShow">
            <ChichaGallery />
          </div>
        </div>
      </div>} />
    </div>
  )
}
export default TransCurtain