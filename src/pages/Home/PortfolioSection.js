import { useEffect, useState } from "react"
import { ArrowDefaultButton } from "../../components/Buttons"
import { PublicationCard } from "../../components/Cards"
import { getsixSite } from "../../api/siteAPI"
import { useNavigate } from "react-router-dom"

const PortfolioSection = () => {

  const [publicationCardInfo, setPublicationCardInfo] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    getsixSite().then((data) => {
      data && setPublicationCardInfo(data)
    })
  }, [])
  const handleLink = (url) => {
    navigate(url);
  }

  return (
    <div className="sectionWrapper">
      <div className="spaceBetween sectionHeader section2"  >
        <p className="sectionTitle">Работаем на площадках</p>
        <div className="chichaShow"><ArrowDefaultButton title='все площадки' onClick={() => handleLink('/platforms')} /></div>
      </div>
      <div className="flexWrapAround" style={{ gap: '40px' }}>
        {publicationCardInfo.map((item, index) => (
          <PublicationCard key={index} item={item} />
        ))}
      </div>
      <div className="chichaHidden itemCenter" style={{ paddingTop: '40px' }}><ArrowDefaultButton title='все площадки' /></div>
    </div>
  )
}

export default PortfolioSection