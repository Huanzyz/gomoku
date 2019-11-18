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