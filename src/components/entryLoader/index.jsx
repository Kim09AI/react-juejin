import React from 'react'
import ContentLoader from 'react-content-loader'
import './style.styl'

export default class EntryLoader extends React.PureComponent {
    state = {
        width: 0
    }

    componentDidMount() {
        this.setState({
            width: this.wrapper.clientWidth
        })

        window.addEventListener('resize', this.setWidth)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.setWidth)
    }

    setWidth = () => {
        this.setState({
            width: this.wrapper.clientWidth
        })
    }

    render() {
        const { width } = this.state

        return (
            <div styleName="content-loader-wrapper">
                <div ref={wrapper => { this.wrapper = wrapper }}>
                    {
                        width !== 0
                            ? (
                                <ContentLoader
                                    height={72}
                                    width={width}
                                    speed={2}
                                    primaryColor="hsla(0,0%,95%,.4)"
                                    secondaryColor="hsla(0,0%,95%,.4)"
                                    animate={false}
                                >
                                    <rect x="0" y="15" rx="3" ry="3" width={width / 2 + 30} height="20" />
                                    <rect x="0" y="48" rx="3" ry="3" width={width / 3 + 30} height="15" />
                                </ContentLoader>
                            )
                            : null
                    }
                </div>
            </div>
        )
    }
}
