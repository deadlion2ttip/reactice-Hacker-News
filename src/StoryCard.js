import React, { Component } from 'react';

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
        if (minutes < 1){
            return ' just now '
        } else if (minutes < 60) {
            return Math.floor(minutes) + ' minutes '
        }else if (minutes >= 60) {
            let hours = minutes / 60
            let minutesRemaining = minutes % 60
            return Math.floor(hours) + ' hours ' +  (Math.floor(minutesRemaining) !== 0? Math.floor(minutesRemaining) + ' minutes ago': "ago")
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
            return (
                <li className="story-cards" key={this.props.storyId}>
                    <a href={story.url}><span className='title'>
                    {story.title}
                    </span> 
                    </a>
                    <span className='time-since'>
                        {' Posted: ' + this.timeAdjust()}
                    </span> 
                    <span className='score'>
                    {' ' + story.score + ' points' }
                    </span> 
                    <span className='author'>
                         {' by ' + story.by + ' '}
                    </span> 
                    <span className='comment-number'>
                        {story.descendants === 0? 'discuss' : story.descendants + ' comments'}
                    </span>
                    </li>
                    
            )
        }
    }


}
export default StoryCard;