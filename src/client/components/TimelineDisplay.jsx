const TimelineDisplay = () => {
    return (
        <div className="timeline-sm mt-4">
            <div className="event">
                <span className="time">4:30 p.m.</span>
                <span className="event-info">Seating of Guests</span>
            </div>
            <div className="event">
                <span className="time">5:00 p.m.</span>
                <span className="event-info">Ceremony</span>
            </div>
            <div className="event">
                <span className="time">5:30 p.m.</span>
                <span className="event-info">Cocktail Hour</span>
            </div>
            <div className="event">
                <span className="time">6:45 p.m.</span>
                <span className="event-info">Dinner</span>
            </div>
            <div className="event">
                <span className="time">11:00 p.m.</span>
                <span className="event-info">Reception Ends</span>
            </div>
        </div>
    )
}

export default TimelineDisplay;