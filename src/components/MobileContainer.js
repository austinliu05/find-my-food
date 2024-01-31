import '../App.css';
function MobileContainer({
    currentDay, meal, capitalizeFirstLetter, todayMenu,
    upArrow, downArrow, upvoted, downvoted, votes, handleVote, clicked }) {
    return (
        <div>
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
                                        <div key={item.id} className="item-container">
                                            <p>{item.name}</p>
                                            <div className="vote">
                                                <img
                                                    src={clicked[item.id] === "upvoted" ? upvoted : upArrow}
                                                    onClick={() => handleVote(item.id, true)}
                                                />
                                                <p>{votes[item.id]}</p>
                                                <img
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
            </div>
        </div>
    );
}
export default MobileContainer;