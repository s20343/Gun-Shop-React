export function getCurrentUser() {
    let userJSON
    const user = localStorage.getItem('user')
    try {
        userJSON = JSON.parse(user)
    } catch (e) {
        return undefined
    }
    return userJSON
}

export function isAuthenticated() {
    const user = getCurrentUser()
    if(user) {
        return true
    }
    return false
}