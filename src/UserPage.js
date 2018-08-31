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
                <div>
                    User: {user.id}
                    <br />
                    Karma: {user.karma}
                    <br />
                    Created: {date.toString()}
                </div>
            )
        }
    }
}

export default UserPage;