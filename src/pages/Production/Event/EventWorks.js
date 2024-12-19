import { useState, useEffect } from "react"
import { EventWorksCard } from '../../../components/Cards'
import { eventCardInfo } from "../../../constant/group"
import { DefaultButton } from "../../../components/Buttons"
import { useNavigate } from "react-router-dom"


const EventWorks = () => {

  const [showAll, setShowAll] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1007)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleToggle = () => {
    setShowAll(!showAll)
  }

  const handleMoveToCase = () => {
    navigate("/cases")
  }

  const visibleCards = isMobile && !showAll ? eventCardInfo.slice(0, 3) : eventCardInfo

  return (
    <div className="sectionWrapper section2" style={{ textAlign: 'center' }}>
      <div className="sectionHeader">
        <p className="sectionTitle">C какими событиями мы работаем</p>
      </div>
      <div className="flexWrapAround" style={{ gap: '40px' }}>
        {visibleCards.map((item, index) => (
          <EventWorksCard key={index} item={item} handleMoveToCase={handleMoveToCase} />
        ))}
      </div>
      {isMobile && (
        <div className="itemCenter" style={{ paddingTop: '50px' }}><DefaultButton onClick={handleToggle} title={showAll ? "скрыть больше" : "cмотреть ещё"} /></div>
      )}
    </div>
  )
}

export default EventWorks
