import React from 'react'

export default function pureWrapper(Component) {
    return class extends React.PureComponent {
        render() {
            return <Component {...this.props} />
        }
    }
}
