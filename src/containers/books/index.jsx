import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import NavList from '../../components/navList'
import BookList from '../../components/bookList'
import Pullup from '../../components/pullup'
import './style.styl'

const mapState = state => ({
    bookList: state.books.bookList,
    navList: state.books.navList
})

const mapDispatch = ({ books: { getBookList } }) => ({
    getBookList
})

@connect(mapState, mapDispatch)
export default class Books extends React.Component {
    static propTypes = {
        bookList: PropTypes.array.isRequired,
        navList: PropTypes.array.isRequired,
        getBookList: PropTypes.func.isRequired,
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props)
        this.state = {
            currentIndex: this.getCurrentIndex(props.navList, props.match.params.alias)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.location.pathname !== this.props.location.pathname) {
            const { alias } = nextProps.match.params
            this.setState({
                currentIndex: this.getCurrentIndex(this.props.navList, alias)
            })
        }
    }

    getCurrentIndex(navList, alias) {
        const index = navList.findIndex(item => item.alias === alias)
        return index !== -1 ? index : 0
    }

    _getBookList = () => {
        const { alias } = this.props.match.params
        return this.props.getBookList({ alias, more: true })
    }

    render() {
        const { navList, bookList } = this.props
        const { currentIndex } = this.state

        return (
            <div>
                <NavList list={navList} selectedIndex={currentIndex} getLink={(nav) => `/books/${nav.alias || ''}`} />
                <BookList list={bookList} />
                <Pullup loader={this._getBookList} />
            </div>
        )
    }
}
