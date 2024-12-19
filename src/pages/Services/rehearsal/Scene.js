import { questionImg, threeRotation } from "../../../assets";
import { DetailDataInput1 } from "../../../components/Inputs";
import { WhiteBox } from "../../../components/WhiteBox/WhiteBox";

const sceneInfo = [
  { img: questionImg, title: "Задник из 2-х частей", scene: "15,5×9,5 м" },
  { img: questionImg, title: "Авансцена", scene: "3,5 м" },
  { title: "Высота до дер. колосников", scene: "20,6 м" },
  { title: "Арх. зеркало сцены", scene: "15,5×8 м" },
  { title: "Кулисы черные 2 плана", scene: "2,8×9,5 м" },
  { img: questionImg, title: "Фронтальная линейка", scene: "-" },
  { title: "Макс. раб. глубина сцена", scene: "26,5 м", text: "+ 2 м до несущих" },
  { title: "Факт. раб. зеркало сцены", scene: "12,5×6,5 м" },
  { title: "Падуги черные 2 плана", scene: "-" },
]

const Scene = () => {
  const SceneRight = () => (
    sceneInfo.map((item, index) => (
      <DetailDataInput1 key={index} item={item} index={index} length={sceneInfo.length} />
    ))
  )
  const content = (
    <section>
      <p className="sectionTitle" style={{ color: `var(--primaryBgColor)`, width: '90%', marginBottom: '10px' }}>Сцена</p>
      <div className="flexWrapBetween" style={{ marginTop: '30px', gap: 'clamp(0px, 3.5vw, 40px)' }}>
        <div className="auditoriumLeft" style={{ height: 'clamp(154px, 40vw, 544px)' }}>
          <img src={threeRotation} alt="threeRotation" className="absoluteCenter threeRotationImg" />
        </div>
        <div className="auditoriumRight alignCenter">
          <div style={{ width: '100%' }}>
            <SceneRight />
          </div>
        </div>
      </div>
    </section>
  )
  return (
    <WhiteBox content={content} />
  )
}

export default Scene;