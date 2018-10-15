export const scrollToElement = (el, offset = 0) => {
    const { top } = $(el).offset()
    const winH = $(window).height()
    const scrollTop = top - winH / 2 - offset

    window.scrollTo(0, scrollTop)
}
