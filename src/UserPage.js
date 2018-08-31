import React, { Component } from 'react';

class UserPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userid: null
        }
    }

    fetchUser = (userid) => {
        return fetch(`https://hacker-news.firebaseio.com/v0/user/${userid}.json?print=pretty`)
            .then((response) => {
                return response.json()
            })
            .then((user) => {
                this.setState({
                    userid: user
                })
                return user
            })
    }

    componentDidMount() {
        let user = this.state.userid
        if (!user) {
            this.fetchUser(this.props.match.params.userid)
        }
    }
    render() {
        let user = this.state.userid
        if (!user) {
            return (
                <div>Loading!</div>
            )
        } else {
            let date = new Date(user.created * 1000).toLocaleDateString()
            return (
                <div className='story-cards' id='user-card'>
                    <span id='user-id'>User: {user.id}</span>
                    <br />
                    <span id='user-karma'>Karma: {user.karma}</span>
                    <br />
                    <span id='user-created'>Created: {date.toString()}</span>
                </div>
            )
        }
    }
}

export default UserPage;