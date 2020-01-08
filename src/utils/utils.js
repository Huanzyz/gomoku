export function getRandomColor(){
    let palette = [
        'linear-gradient(120.01deg, #0772B8 3.08%, #0798B8 56.03%)',
        'linear-gradient(114.33deg, #18A09C 3.08%, #0798B8 56.03%)',
        'linear-gradient(114.33deg, #F36D22 3.08%, #EFAB28 56.03%)',
        'linear-gradient(114.33deg, #EB5757 3.08%, #F36D22 56.03%)'
    ]
    return palette[Math.floor(Math.random()*4)];
}
export function getRandomRoomAvatar(){
    const index = Math.floor(Math.random()*13);
    return `/images/r${index}.svg`;
}
export function getFormattedStringForPoints(points){
    return points.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function setUsernameToStorage(username){
    sessionStorage.setItem("username", username);
}
export function getUsernameFromStorage(){
    let username = sessionStorage.getItem("username");
    return username
}
export function setJwtToStorage(jwt){
    sessionStorage.setItem("jwt", jwt);
}
export function getJwtFromStorage(){
    let jwt = sessionStorage.getItem("jwt")
    return jwt;
}
export function clearStorage(){
    sessionStorage.clear();
}
export function isEmptyString(value){
    if(value === null || value === "") return true
    return false;
}
export function mergeConfig(a, b) {
    let a_headers = a.headers, b_headers = b.headers
    if (typeof a_headers === "undefined") a_headers = {}
    if (typeof b_headers === "undefined") b_headers = {}
    let merge_headers = Object.assign(a_headers, b_headers)
    if (Object.entries(merge_headers).length !== 0) {
        return Object.assign(a, b, {
            headers: merge_headers
        })
    }
    return Object.assign(a, b)
}
export function rankString(num){
    let endingNumber = parseInt(num) % 10;
    let suffix = "";
    switch(endingNumber){
        case 1: suffix = "st";break;
        case 2: suffix = "nd";break;
        case 3: suffix = "rd";break;
        default: suffix = "th";break;
    }
    return num.toString() + suffix;
}
export function rateString(num){
    let roundedNum = Math.round(num * 10000)/1000;
    return roundedNum.toString() + "%";
}
export function formatNumber(num){
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}
export function shortenName(name){
    if(name.length > 10)
        return name.slice(0,8) + "...";
    return name;
}