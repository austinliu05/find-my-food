import logo from '../assets/brown.png'
import header from '../assets/BrownHeader.png'
import '../App.css';

function Banner({ mobile, filters, setFilters, ratty, andrews, ivy, vdub }) {
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
  const handleDiningClick = (hallName, isOpen) => {
    console.log(`${hallName} Open:`, isOpen);
    if (!isOpen) {
      alert(`The ${hallName} is currently closed.`);
      return;
    }
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
  const handleDiningCheck = (hallName, isOpen) => {
    if (!isOpen) {
      alert(`The ${hallName} is currently closed.`);
      return;
    }
    setFilters(prevFilters => ({
      ...prevFilters,
      [hallName]: !prevFilters[hallName],
    }));
  };
  return (
    <div>
      <div className='banner'>
        <img className="logo" src={getPicture()} alt=''></img>
        {mobile &&
          <div className='dining-btns'>
            <button className="dining-btn" onClick={() => handleDiningClick('Ratty', ratty)}>Ratty</button>
            <button className="dining-btn" onClick={() => handleDiningClick('Andrews', andrews)}>Andrews</button>
            <button className="dining-btn" onClick={() => handleDiningClick('IvyRoom', ivy)}>Ivy Room</button>
            <button className="dining-btn" onClick={() => handleDiningClick('VDub', vdub)}>VDub</button>
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
                checked={filters.Ratty}
                onChange={e => {
                  if (!ratty) {
                    e.preventDefault();
                    alert('The Ratty is currently closed.');
                    return;
                  }
                  handleDiningCheck('Ratty', ratty);
                }}
              />
              Ratty
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