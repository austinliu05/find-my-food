import logo from '../assets/brown.png'
import header from '../assets/BrownHeader.png'
import '../App.css';

function Banner({ mobile, filters, setFilters }) {
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
  return (
    <div>
      <div className='banner'>
        <img className="logo" src={getPicture()} alt=''></img>
        {mobile &&
          <div className='dining-btns'>
            <button
              className="dining-btn"
              onClick={() => {
                setFilters(prevFilters => ({
                  Ratty: !prevFilters.Ratty,
                  IvyRoom: false,
                  Andrews: false,
                  VDub: false
                }));
              }}
            >Ratty</button>
            <button className="dining-btn" onClick={() => {
              setFilters(prevFilters => ({
                Ratty: false,
                IvyRoom: false,
                Andrews: !prevFilters.Andrews,
                VDub: false
              }))
            }}>Andrews</button>
            <button className="dining-btn" onClick={() => {
              setFilters(prevFilters => ({
                Ratty: false,
                IvyRoom: !prevFilters.IvyRoom,
                Andrews: false,
                VDub: false
              }))
            }}>Ivy Room</button>
            <button className="dining-btn" onClick={() => {
              setFilters(prevFilters => ({
                Ratty: false,
                IvyRoom: false,
                Andrews: false,
                VDub: !prevFilters.VDub
              }))
            }}>VDub</button>
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
                onChange={e => setFilters({ ...filters, Ratty: e.target.checked })}
              />
              Ratty
            </label>
            <label>
              <input
                type="checkbox"
                checked={filters.IvyRoom}
                onChange={e => setFilters({ ...filters, IvyRoom: e.target.checked })}
              />
              IvyRoom
            </label>
            <label>
              <input
                type="checkbox"
                checked={filters.Andrews}
                onChange={e => setFilters({ ...filters, Andrews: e.target.checked })}
              />
              Andrews
            </label>
            <label>
              <input
                type="checkbox"
                checked={filters.VDub}
                onChange={e => setFilters({ ...filters, VDub: e.target.checked })}
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