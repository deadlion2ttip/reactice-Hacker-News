import React, { Component } from 'react';

class TopStories extends Component{
    constructor(props){
        super(props)
        this.state = {
            currentStories: [],
            storyCards: []
        }
    
    }

    fetchTopStoriesList = () => {
       return fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
        .then((Response) => {
           return Response.json() 
        })
        .then((articleIds) => {
           this.setState({
               currentStories: articleIds
           })
           return articleIds
        })
    }

    componentDidMount(){
        this.fetchTopStoriesList()
        .then((storyIds) => {
            console.log(this.state.currentStories)
        })
    }

    render(){
        let storyCards = this.state.currentStories.map((storyId, index) => {
            return <li>{storyId}</li>
        })
        return(
        <ul> 
            {storyCards}
        </ul>)
    }
}

export default TopStories