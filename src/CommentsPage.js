import React, { Component } from 'react';
import CommentCard from './CommentCard'



class CommentsPage extends Component{
    constructor(props){
        super(props)
        this.state ={
            story: null
        }
    }

    fetchComments = () => {
       fetch(`https://hacker-news.firebaseio.com/v0/item/${this.props.match.params.storyid}.json?print=pretty`)
        .then((result) => {
            return result.json()
        })
        .then((story) => {
            this.setState({
                story: story
            })
        })
    }

    componentDidMount(){
        this.fetchComments()
    }


    render(){
        let directDescendants = 'Loading...'
        if (this.state.story){
            if (this.state.story.kids){
            directDescendants = []
        this.state.story.kids.map((commentId)=> {
            return directDescendants.push(<CommentCard className='comment-card' key={commentId} commentId={commentId} />)
        })
    } else {
        directDescendants = 'There are no comments on this thread...'
    }
    }
        return(
        <div>
            <div className='story-cards'> Comments for {(this.state.story? this.state.story.title: 'loading')}</div>
            {directDescendants}
        </div>


        )
    }
}
export default CommentsPage;