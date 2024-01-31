import '../App.css';

function WeekContainer({ mobile, menuByDayAndHall, currentDay, meal, capitalizeFirstLetter, todayMenu }) {

    return (
        <div>
            {!mobile &&
                <div className="week-container">

                    {Object.entries(menuByDayAndHall).map(([day, halls]) => (
                        <div className="col" key={day}> {/* Iterate over the data, converting into array of key and value pairs (day = key, hall = value) */}
                            <div className='day-label'>
                                <h3>{day}</h3> {/* Showing day of the week */}
                                <p className='meal-info'>{capitalizeFirstLetter(meal)}</p> {/* Showing type of meal being shown (breakfast, lunch, dinner) */}
                            </div>
                            {Object.entries(halls).map(([hallName, categories]) => (
                                <div className={hallName} key={hallName}>{/* Iterate over the all the categories within each hall*/}
                                    {Object.entries(categories).map(([categoryName, items]) => (
                                        <div className={categoryName} key={categoryName}> {/* Iterating over each item within each category and displayingh it */}
                                            <h4>{categoryName}</h4>
                                            {items.map(item => (
                                                <p key={item.id}>{item.name}</p>
                                            ))}
                                        </div>
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
                        {Object.entries(todayMenu).map(([hallName, categories]) => (
                            <div className={hallName} key={hallName}>
                                {Object.entries(categories).map(([categoryName, items]) => (
                                    <div className={`category ${categoryName}`} key={categoryName}>
                                        <h4>{categoryName}</h4>
                                        {items.map(item => (
                                            <p key={item.id}>{item.name}</p>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>}
        </div>
    );
}
export default WeekContainer;