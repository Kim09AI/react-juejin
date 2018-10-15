import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import EntryList from '../../components/entryList'
import Pullup from '../../components/pullup'
import NavList from '../../components/navList'
import { queryParse } from '../../utils'
import './style.styl'

const mapState = state => ({
    entryList: state.home.entryList,
    isLogin: state.user.isLogin,
    categoryList: state.home.categoryList
})

const mapDispatch = ({ home: { getEntryList, toggleEntryLike } }) => ({
    getEntryList,
    toggleEntryLike
})

@connect(mapState, mapDispatch)
export default class Home extends React.Component {
    static propTypes = {
        entryList: PropTypes.array.isRequired,
        getEntryList: PropTypes.func.isRequired,
        toggleEntryLike: PropTypes.func.isRequired,
        isLogin: PropTypes.bool.isRequired,
        location: PropTypes.object.isRequired,
        categoryList: PropTypes.array.isRequired
    }

    constructor(props) {
        super(props)

        const sortTabs = [
            { text: '热门', name: 'popular' },
            { text: '最新', name: 'newest' },
            { text: '评论', name: 'comment' }
        ]
        const { category, sort } = this.getQuery(props.location.search, props.categoryList, sortTabs)

        this.state = {
            currentCategoryIndex: this.getCurrentCategoryIndex(props.location.search, props.categoryList),
            sortTabs,
            category,
            sort
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.isLogin && nextProps.location.search !== this.props.location.search) {
            const { location: { search }, categoryList } = nextProps

            const currentCategoryIndex = this.getCurrentCategoryIndex(search, categoryList)
            const { category, sort } = this.getQuery(search, categoryList, this.state.sortTabs)
            this.setState({
                currentCategoryIndex,
                category,
                sort
            })
        }
    }

    getQuery(search, categoryList, sortTabs) {
        const { category: categoryValue, sort } = queryParse(search)
        const matchedItem = categoryList.find(item => item.title === categoryValue) || {}
        const _sort = sortTabs.some(item => item.name === sort) ? sort : sortTabs[0].name

        return {
            category: matchedItem.id || 'all',
            sort: _sort
        }
    }

    getCurrentCategoryIndex(search, categoryList) {
        const { category } = queryParse(search)
        const index = categoryList.findIndex(item => item.title === category)

        return index === -1 ? 0 : index
    }

    getSortLink(sortType) {
        const { pathname, search } = this.props.location
        const { category: categoryValue } = queryParse(search) || { categoryValue: 'subscribe' }

        return `${pathname}?category=${categoryValue || 'subscribe'}&sort=${sortType}`
    }

    _getEntryList = () => {
        const { getEntryList } = this.props
        const { category, sort } = this.state

        return getEntryList({
            more: true,
            category,
            sort
        })
    }

    _toggleEntryLike = (postId, index, isApprove) => {
        const payload = {
            postId,
            index,
            isApprove,
            auth: true
        }

        return this.props.toggleEntryLike(payload)
    }

    render() {
        const { entryList, isLogin, categoryList } = this.props
        const { currentCategoryIndex, sort, sortTabs } = this.state

        return (
            <div>
                {
                    isLogin && (
                        <NavList
                            list={categoryList}
                            initClass="home-init-class"
                            translateClass="home-translate-class"
                            boundaryTop={800}
                            selectedIndex={currentCategoryIndex}
                            getLink={(item) => `/?category=${item.title}`}
                        />
                    )
                }
                <div className="main">
                    {
                        isLogin
                            ? (
                                <div styleName="category">
                                    {
                                        sortTabs.map(item => (
                                            <Link
                                                key={item.name}
                                                to={this.getSortLink(item.name)}
                                                styleName={classNames({ item: true, active: sort === item.name })}
                                            >
                                                {item.text}
                                            </Link>
                                        ))
                                    }
                                </div>
                            )
                            : (
                                <div styleName="header">
                                    <h3 styleName="title">热门文章</h3>
                                    <span styleName="more">查看更多</span>
                                </div>
                            )

                    }
                    <EntryList
                        entryList={entryList}
                        onApproveClick={this._toggleEntryLike}
                    />
                </div>
                <Pullup loader={this._getEntryList} />
            </div>
        )
    }
}
