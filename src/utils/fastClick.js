/* eslint-disable */

import FastClick from 'fastclick'

var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0
var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone

FastClick.prototype.focus = function(targetElement) {
    var length

    // Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
    if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
        length = targetElement.value.length
        targetElement.setSelectionRange(length, length)
        targetElement.focus()
    } else {
        targetElement.focus()
    }
}

FastClick.attach(document.body)
