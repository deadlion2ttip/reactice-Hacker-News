import React, { Component } from 'react';
import { Link } from 'react-router-dom'


class StoryCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            story: null
        }
    }

    fetchStory = (storyId) => {
        return fetch(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json?print=pretty`)
            .then((response) => {
                return response.json()
            })
            .then((theStory) => {
                this.setState({
                    story: theStory
                })
                return theStory
            })
    }

    componentDidMount() {
        let story = this.state.story
        if (!story) {
            this.fetchStory(this.props.storyId)
        }
    }

    timeAdjust = () => {
        let timeCreated = this.state.story.time * 1000
        let timeSince = new Date() - timeCreated
        let minutes = ((timeSince / 1000) / 60)
        console.log(timeCreated)
        console.log(minutes)
        if (minutes < 1) {
            return ' just now '
        } else if (minutes < 60) {
            return Math.floor(minutes) + ' minutes ago '
        } else if (minutes >= 60) {
            let hours = minutes / 60
            let minutesRemaining = minutes % 60
            return Math.floor(hours) + ' hours ' + (Math.floor(minutesRemaining) !== 0 ? Math.floor(minutesRemaining) + ' minutes ago' : "ago")
        }
    }

    render() {
        let story = this.state.story
        console.log(story)
        if (!story) {
            return (
                <div className='story-cards'>Loading...</div>
            )
        } else {
            console.log(typeof story.url)
            return (
                <li className="story-cards" key={this.props.storyId}>
                    {(story.url ?
                        <a href={story.url}><span className='title'>
                            {story.title}
                        </span>
                            <span className='url'>
                                {' ('+story.url.slice(0, 25) + '...)'}
                    </span>
                        </a> :
                        <Link to={`/comments/${this.props.storyId}`} param={{ storyid: this.props.storyId }}>
                            <span className='title'>
                                {story.title}
                            </span>
                        </Link>
                    )}
                    <span className='time-since'>
                        {' Posted: ' + this.timeAdjust()}
                    </span>
                    <br />
                    <span className='score'>
                        {' ' + story.score + ' points'}
                    </span>
                    <span className='author'>
                        {' by ' + story.by + ' | '}
                    </span>
                    <Link to={`/comments/${this.props.storyId}`} param={{ storyid: this.props.storyId }}>
                        <span className='comment-number'>
                            {story.descendants === 0 ? 'discuss' : story.descendants + ' comments'}
                        </span>
                    </Link>
                </li>

            )
        }
    }


}
export default StoryCard;