import React from 'react'
import PropTypes from 'prop-types'
import './style.styl'

export default class CommentInput extends React.Component {
    static propTypes = {
        submit: PropTypes.func.isRequired
    }

    state = {
        comment: ''
    }

    commentChange = (e) => {
        this.setState({
            comment: e.target.value
        })
    }

    submit = (e) => {
        e.preventDefault()

        this.props.submit(this.state.comment)
    }

    render() {
        const { comment } = this.state

        return (
            <form styleName="input-wrapper" onSubmit={this.submit}>
                <input type="text" styleName="comment-input" placeholder="输入评论..." value={comment} onChange={this.commentChange} />
            </form>
        )
    }
}
