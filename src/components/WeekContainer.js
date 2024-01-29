import '../App.css';

function WeekContainer({ mobile, menuByDayAndHall, currentDay, meal, capitalizeFirstLetter, todayMenu }) {

    return (
        <div>
            {!mobile &&
                <div className="week-container">
                    {Object.entries(menuByDayAndHall).map(([day, halls]) => (
                        <div className="col" key={day}>
                            <div className='day-label'>
                                <h3>{day}</h3>
                                <p className='meal-info'>{capitalizeFirstLetter(meal)}</p>
                            </div>
                            {Object.entries(halls).map(([hallName, items]) => (
                                <div className={hallName} key={hallName} >
                                    {items.map(item => (
                                        <p key={item.id}>{item.name}</p>
                                    ))}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>}
            {mobile &&
                <div className="week-container">
                    <div className="col" key={currentDay}>
                        <div className='day-label'>
                            <h3>{currentDay}</h3>
                            <p className='meal-info'>{capitalizeFirstLetter(meal)}</p>
                        </div>
                        {Object.entries(todayMenu).map(([hallName, items]) => (
                            <div className={hallName} key={hallName} >
                                {items.map(item => (
                                    <p key={item.id}>{item.name}</p>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>}
        </div>
    );
}
export default WeekContainer;