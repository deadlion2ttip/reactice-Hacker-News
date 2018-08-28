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
                    <a href={story.url}>
                    {story.title}
                    </a>
                    </li>
            )
        }
    }


}
export default StoryCard;