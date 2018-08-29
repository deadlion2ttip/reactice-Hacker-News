import React, { Component } from 'react';
import sanitizeHtml from 'sanitize-html';

class CommentCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comment: null
        }
    }

    fetchcomment = (commentId) => {
        return fetch(`https://hacker-news.firebaseio.com/v0/item/${commentId}.json?print=pretty`)
            .then((response) => {
                return response.json()
            })
            .then((thecomment) => {
                this.setState({
                    comment: thecomment
                })
                return thecomment
            })
    }

    componentDidMount() {
        let comment = this.state.comment
        if (!comment) {
            this.fetchcomment(this.props.commentId)
        }
    }

    timeAdjust = () => {
        let timeCreated = this.state.comment.time * 1000
        let timeSince = new Date() - timeCreated
        let minutes = ((timeSince / 1000) / 60)
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

    createMarkup = (comment) => {
        return { __html: comment };
    }

    render() {
        let comment = this.state.comment
        if (!comment) {
            return (
                <div className='story-cards'>Loading...</div>
            )
        } else {
            let directDescendants = []
            if (this.state.comment.kids) {
                this.state.comment.kids.map((commentId) => {
                    return directDescendants.push(<CommentCard className='comment-card' key={commentId} commentId={commentId} />)
                })
            }
            const clean = sanitizeHtml(comment.text)
            return (
                <div className="story-cards" key={this.props.commentId}>
                    <span className='time-since'>
                        {' Posted: ' + this.timeAdjust()}
                    </span>

                    <span className='author'>
                        {' by ' + (comment.by ? comment.by : 'Deleted')}
                    </span>
                    <br />
                    <span className='comment-text'>
                        <div dangerouslySetInnerHTML={this.createMarkup(clean)} />
                    </span>
                    {directDescendants ? directDescendants : ''}

                </div>

            )
        }
    }


}
export default CommentCard;