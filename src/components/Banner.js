import logo from '../assets/brown.png'
import header from '../assets/BrownHeader.png'
import '../App.css';

function Banner({ mobile, filters, setFilters, ratty, andrews, ivy, vdub }) {
  // changes the logo based on the screen size
  function getPicture() {
    return mobile ? logo : header;
  }
  function clearFilters() {
    setFilters({
      Ratty: false,
      IvyRoom: false,
      Andrews: false,
      VDub: false
    });
  }
  // if the dining hall button is clicked
  const handleDiningClick = (hallName, isOpen) => {
    console.log(`${hallName} Open:`, isOpen);
    // check if its open
    if (!isOpen) {
      alert(`The ${hallName} is currently closed.`);
      return;
    }
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
  // similar function but for the desktop view
  const handleDiningCheck = (hallName, isOpen) => {
    if (!isOpen) {
      alert(`The ${hallName} is currently closed.`);
      return;
    }
    // keeps all other filters the same
    setFilters(prevFilters => ({
      ...prevFilters,
      [hallName]: !prevFilters[hallName], //only adjusts selected filter
    }));
  };
  return (
    <div>
      <div className='banner'>
        <img className="logo" src={getPicture()} alt=''></img>
        {mobile &&
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
          </div>}
        <div className='legend'>
          <div className="hall">
            <div className="legend-color legend-red"></div>
            <span>- Ratty</span>
          </div>
          <div className="hall">
            <div className="legend-color legend-green"></div>
            <span>- Ivy Room</span>
          </div>
          <div className="hall">
            <div className="legend-color legend-blue"></div>
            <span>- Andrews</span>
          </div>
          <div className="hall">
            <div className="legend-color legend-yellow"></div>
            <span>- VDub</span>
          </div>
        </div>
        <div className='filtering'>
          <form>
            <label>
              <input
                type="checkbox"
                checked={filters.Ratty} // shows checked depending if the user has clicked it or not
                onChange={e => { // whenever the user changes the state (by clicking)
                  if (!ratty) { // if ratty is not open
                    e.preventDefault(); //prevent the default action of updating the checked status (prevent user from checking the box)
                    alert('The Ratty is currently closed.'); //alert use that dining hall is closed
                    return;
                  }
                  handleDiningCheck('Ratty', ratty); //else, run the function and update the status
                }}
              />
              Ratty
            </label>
            <label>
              <input
                type="checkbox"
                checked={filters.Andrews}
                onChange={e => {
                  if (!andrews) {
                    e.preventDefault();
                    alert('The Andrews is currently closed.');
                    return;
                  }
                  handleDiningCheck('Andrews', andrews);
                }}
              />
              Andrews
            </label>
            <label>
              <input
                type="checkbox"
                checked={filters.ivy}
                onChange={e => {
                  if (!ivy) {
                    e.preventDefault();
                    alert('The IvyRoom is currently closed.');
                    return;
                  }
                  handleDiningCheck('IvyRoom', ivy);
                }}
              />
              IvyRoom
            </label>
            <label>
              <input
                type="checkbox"
                checked={filters.VDub}
                onChange={e => {
                  if (!vdub) {
                    e.preventDefault();
                    alert('The VDub is currently closed.');
                    return;
                  }
                  handleDiningCheck('VDub', vdub);
                }}
              />
              VDub
            </label>
            <button className="clear" onClick={clearFilters}>Clear Filters</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Banner;