import React, { Component } from 'react';
import StoryCard from './StoryCard'

class NewStories extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentStories: [],
            storyCards: []
        }

    }

    fetchnewStoriesList = () => {
        return fetch('https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty')
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
            this.fetchnewStoriesList()
        }
    }

    render() {
        let storyCards = this.state.currentStories.map((storyId, index) => {

            return <StoryCard storyId={storyId} key={storyId} />

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

export default NewStories