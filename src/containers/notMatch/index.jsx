import React from 'react'
import { Link } from 'react-router-dom'
import Helmet from 'react-helmet'
import './style.styl'

export default function NotMatch() {
    return (
        <div styleName="not-match-wrapper">
            <Helmet>
                <title>找不到页面 - 掘金</title>
            </Helmet>
            <div styleName="img-wrapper">
                <img styleName="bg" src="https://b-gold-cdn.xitu.io/v3/static/img/bg.1f516b3.png" alt="" />
                <img styleName="panfish" src="https://b-gold-cdn.xitu.io/v3/static/img/panfish.9be67f5.png" alt="" />
                <img styleName="sea" src="https://b-gold-cdn.xitu.io/v3/static/img/sea.892cf5d.png" alt="" />
                <img styleName="spray" src="https://b-gold-cdn.xitu.io/v3/static/img/spray.bc638d2.png" alt="" />
            </div>
            <div styleName="link-wrapper">
                <Link to="/" styleName="link">回到首页</Link>
            </div>
        </div>
    )
}
