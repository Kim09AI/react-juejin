export const books = {
    state: {
        bookList: [],
        navList: [],
        pageNum: 1,
        hasMore: true
    },
    reducers: {
        setBookList(state, { bookList, more, pageNum }) {
            return {
                ...state,
                bookList: more === true ? state.bookList.concat(bookList) : bookList,
                pageNum: pageNum + 1,
                hasMore: !!bookList.length
            }
        },
        setNavList(state, navList) {
            return {
                ...state,
                navList
            }
        }
    },
    effects: {
        async getBookList({ alias, more }, { api, books }) {
            try {
                if (more === true && !books.hasMore) {
                    return
                }

                const pageNum = more === true ? books.pageNum : 1
                const { data } = await api.getListByLastTime(pageNum, alias)

                this.setBookList({
                    bookList: data.d,
                    more,
                    pageNum
                })
            } catch (err) {
                console.log(err)
            }
        },
        async getNavList(payload, { api, books }) {
            if (books.navList.length > 0) {
                return
            }

            try {
                const { data } = await api.getNavList()
                const navList = [{
                    name: '全部',
                    id: -1
                }]
                this.setNavList(navList.concat(data.d))
            } catch (err) {
                console.log(err)
            }
        }
    }
}
