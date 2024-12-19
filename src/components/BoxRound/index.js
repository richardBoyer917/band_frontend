import { chicha35, chicha94 } from '../../assets'
import { BigOneChicha, OneChichas } from '../Chichas'

import "../../styles/components/boxRound.css"

const BoxRound = ({ width, top, right, bottom, left, rotate, }) => (
  <div className='outCircleSquare' style={{ width: width, height: width, top: top, right: right, bottom: bottom, left: left, rotate: rotate }}></div>
)

const MiddleChichaRound = ({ top, right, bottom, left, rotate }) => (
  <div className="chichaIndex" style={{ top: top, right: right, bottom: bottom, left: left, rotate: rotate }}>
    <BigOneChicha img={chicha94} />
    <BoxRound left={-49} top={-1} width='50px' rotate='180deg' />
    <BoxRound right={-1} bottom={-49} width='50px' rotate='180deg' />
  </div>
)

const MiddleRound = ({ top, right, bottom, left, rotate }) => (
  <div className="chichaIndex heroOneChicha" style={{ top: top, right: right, bottom: bottom, left: left, rotate: rotate }}>
    <BoxRound left={-29} top={-1} width='30px' rotate='180deg' />
    <BoxRound right={-1} bottom={-29} width='30px' rotate='180deg' />
  </div>
)

const SmallChichaRound = ({ top, right, bottom, left, rotate }) => (
  <div className="chichaIndex smallHeroOneChichas itemCenter" style={{ top: top, right: right, bottom: bottom, left: left, rotate: rotate }}>
    <OneChichas img={chicha35} />
    <BoxRound left={-14} top={-1} width='15px' rotate='180deg' />
    <BoxRound right={-1} bottom={-14} width='15px' rotate='180deg' />
  </div>
)

const SmallRound = ({ top, right, bottom, left, rotate }) => (
  <div className="chichaIndex smallHeroOneChichas itemCenter" style={{ top: top, right: right, bottom: bottom, left: left, rotate: rotate }}>
    <BoxRound left={-14} top={-1} width='15px' rotate='180deg' />
    <BoxRound right={-1} bottom={-14} width='15px' rotate='180deg' />
  </div>
)

export { BoxRound, MiddleChichaRound, MiddleRound, SmallChichaRound, SmallRound }