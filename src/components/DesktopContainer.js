import '../App.css';
function DesktopContainer({ menuByDayAndHall, meal, capitalizeFirstLetter,
    upArrow, downArrow, upvoted, downvoted, votes, handleVote, clicked }) {
    return (
        <div>
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
                                    <div className={`category ${categoryName}`} key={categoryName}>
                                        <h4>{categoryName}</h4>
                                        {items.map(item => (
                                            <div key={item.id} className="item-container">
                                                <p>{item.name}</p>
                                                <div className="vote">
                                                    <img
                                                        alt="upvote"
                                                        src={clicked[item.id] === "upvoted" ? upvoted : upArrow}
                                                        onClick={() => handleVote(item.id, true)}
                                                    />
                                                    <p>{votes[item.id]}</p>
                                                    <img
                                                        alt="downvote"
                                                        src={clicked[item.id] === "downvoted" ? downvoted : downArrow}
                                                        onClick={() => handleVote(item.id, false)}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
export default DesktopContainer;