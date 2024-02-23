import logo from '../assets/brown.png'
import header from '../assets/BrownHeader.png'
import './Banner.css';

function Banner({ mobile, filters, setFilters, ratty, andrews, ivy, vdub }) {
  // changes the logo based on the screen size
  function getPicture() {
    return mobile ? logo : header;
  }
  // if the dining hall button is clicked
  const handleDiningClick = (hallName, isOpen) => {
    console.log(`${hallName} Open:`, isOpen);
    // only filter for the corresponding dining hall
    if (hallName === "Ratty") {
      setFilters(prevFilters => ({
        Ratty: !prevFilters.Ratty,
        IvyRoom: false,
        Andrews: false,
        VDub: false
      }));
    }
    if (hallName === "Andrews") {
      setFilters(prevFilters => ({
        Ratty: false,
        IvyRoom: false,
        Andrews: !prevFilters.Andrews,
        VDub: false
      }));
    }
    if (hallName === "IvyRoom") {
      setFilters(prevFilters => ({
        Ratty: false,
        IvyRoom: !prevFilters.IvyRoom,
        Andrews: false,
        VDub: false
      }));
    }
    if (hallName === "VDub") {
      setFilters(prevFilters => ({
        Ratty: false,
        IvyRoom: false,
        Andrews: false,
        VDub: !prevFilters.VDub
      }));
    }
  };
  return (
    <div>
      <div className='banner'>
        <img className="logo" src={getPicture()} alt=''></img>
        <div className='dining-btns'>
          <button className="dining-btn" disabled={!ratty} onClick={() => handleDiningClick('Ratty', ratty)}>Ratty
            {!ratty && <p className='closed'>Closed</p>}
            {ratty && <p className='open'>Open</p>}
          </button>
          <button className="dining-btn" disabled={!andrews} onClick={() => handleDiningClick('Andrews', andrews)}>Andrews
            {!andrews && <p className='closed'>Closed</p>}
            {andrews && <p className='open'>Open</p>}
          </button>
          <button className="dining-btn" disabled={!ivy} onClick={() => handleDiningClick('IvyRoom', ivy)}>Ivy Room
            {!ivy && <p className='closed'>Closed</p>}
            {ivy && <p className='open'>Open</p>}</button>
          <button className="dining-btn" disabled={!vdub} onClick={() => handleDiningClick('VDub', vdub)}>VDub
            {!vdub && <p className='closed'>Closed</p>}
            {vdub && <p className='open'>Open</p>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Banner;