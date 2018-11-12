import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
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
        location: PropTypes.object.isRequired, // eslint-disable-line
    }

    state = {
        currentIndex: -1,
        pathname: ''
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.location.pathname !== prevState.pathname) {
            const { alias } = nextProps.match.params
            return {
                currentIndex: nextProps.navList.findIndex(item => item.alias === alias),
                pathname: nextProps.location.pathname
            }
        }

        return null
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
                <Helmet>
                    <title>掘金小册</title>
                </Helmet>
                <NavList list={navList} selectedIndex={currentIndex} getLink={(nav) => `/books/${nav.alias || ''}`} />
                <BookList list={bookList} />
                <Pullup loader={this._getBookList} />
            </div>
        )
    }
}
