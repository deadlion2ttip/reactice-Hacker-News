import React, { Component } from 'react';
import sanitizeHtml from 'sanitize-html';
import { Link } from 'react-router-dom'

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
            let link = ''
            let commentText = ''
            if (!comment.by) {
                link = 'Deleted'
            } else {
                link = <Link className='author-link' to={`/user/${comment.by}`} param={{ userid: comment.by }}>{comment.by}</Link>
            }

            if (clean === 'undefined') {
                commentText = '[Deleted]'
            } else {
                commentText = <div dangerouslySetInnerHTML={this.createMarkup(clean)} />
            }
            
            return (
                <div className="story-cards" key={this.props.commentId}>
                    <span className='time-since'>
                        {' Posted: ' + this.timeAdjust()}
                    </span>
                    {/* <Link className='author-link' to={`/user/${comment.by}`} param={{ userid: comment.by }}>{comment.by}</Link> */}
                    <span className='author'>
                        {' by '} {link}
                    </span>
                    <br />
                    <span className='comment-text'>
                        {commentText}
                    </span>
                    {directDescendants ? directDescendants : ''}

                </div>

            )
        }
    }


}
export default CommentCard;