import { chicha102, chicha107, chicha72 } from "../../assets"
import { SmallChichaRound } from "../BoxRound"
import { TreeChichas, TreeChichas1 } from "../Chichas"

const ChichaBox = ({ flag, content }) => (
  <section className="pendingSquare sectionWrapper section1" style={{ position: 'relative', marginBottom: flag && 0 }}>
    <div className="chichaShow">
      <TreeChichas img1={chicha102} img2={chicha107} img3={chicha72} />
    </div>
    <div className="chichaHidden">
      <SmallChichaRound right={-1} top={-1} />
    </div>
    {content}
  </section>
)

const LeftChichaBox = ({ flag, content }) => (
  <section className="pendingSquare sectionWrapper section1" style={{ position: 'relative', marginBottom: flag && 0 }}>
    <div className="chichaShow">
      <TreeChichas1 img1={chicha102} img2={chicha107} img3={chicha72} />
    </div>
    <div className="chichaHidden">
      <SmallChichaRound left={-1} top={-1} rotate='-90deg' />
    </div>
    {content}
  </section>
)

export { ChichaBox, LeftChichaBox }