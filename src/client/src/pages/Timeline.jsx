const Timeline = () => {
    // On small screen sizes, background image of couple with dark overlay; white timeline text.
    // On large, split left and right of couple photo and timeline.
    return (
        <div className="timeline-content">
                <div className="display-img w-100">
                    <img src="/images/engagement-photos/bw-6-cropped.jpeg" alt="Engagement Photo" />
                </div>
                <div className="timeline py-4">
                    <h2 className="text-center">Timeline of Events</h2>
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
                    <div className="p-4 mt-4">
                        <p><em>We are thrilled to celebrate this special day surrounded by so many of our favorite young people! However, we kindly request that only ladies and gentlemen aged twelve and older join us for our thirty-minute wedding ceremony.<br></br><br></br>For those who feel comfortable, on-site childcare will be available in the reception area, within view of the ceremony. Alternatively, parents are welcome to wait in the reception area with their children during the ceremony.<br></br><br></br>We appreciate your understanding and can't wait to celebrate with you.</em></p>
                    </div>
            </div>
        </div>
    )
}

export default Timeline;