import React, { Component } from 'react';
import StoryCard from './StoryCard'

class TopStories extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentStories: [],
            storyCards: []
        }

    }

    fetchTopStoriesList = () => {
        return fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
            .then((response) => {
                return response.json()
            })
            .then((articleIds) => {
                this.setState({
                    currentStories: articleIds
                })
                return articleIds
            })
    }

    componentDidMount() {
        let currentStories = this.state.currentStories
        if (currentStories.length === 0) {
            this.fetchTopStoriesList()
        }
    }

    render() {
        let storyCards = this.state.currentStories.map((storyId, index) => {

            return <StoryCard storyId={storyId} key={storyId} />
            // return this.fetchStory(storyId).then((story)=>{ 
            //     let theStory = story;
            //     console.log(theStory)
            //     return (<li className="story-cards" key={index}>{theStory.title}</li>)
            //  }).then((storyCard) => {
            //      console.log(storyCard)
            //  })
        })

        let stories = this.state.currentStories

        if (stories.length === 0) {
            return (
                <div className='story-cards'>Loading...</div>
            )
        } else {
            return (
                <ul>
                    {storyCards}
                </ul>)
        }
    }
}

export default TopStories