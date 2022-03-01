iscrollFront=document.getElementById('iscrollFront')
iscrollFront.style.height="0px"
// console.log(window.scrollY/(document.documentElement.scrollHeight-window.innerHeight)*100)
if (document.documentElement.scrollHeight == window.innerHeight){
    iscrollFront.style.height="100%"
}
window.onscroll = function(){
    var scrollPercent = window.scrollY/(document.documentElement.scrollHeight-window.innerHeight)*100
    iscrollFront.style.height = scrollPercent + "%"
}