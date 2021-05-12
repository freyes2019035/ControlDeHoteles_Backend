exports.message_401 = res => {
    return res.status(401).render('401')
}
exports.message_alreadyExists = (res, data) => {
    return res.status(409).render('already_exists', {data})
}
exports.message_404 = (res, data) => {
    return res.status(404).render('error_404', {data})
}
exports.message_500 = res => {
    return res.status(500).render('error_500')
}
exports.message_400 = res => {
    return res.status(400).render('error_400')
}
exports.message_custom = (res, data) => {
    return res.status(500).render('customError', {data})
}