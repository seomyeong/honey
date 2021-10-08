$('.snb').hide()
/* 주요네비-전체내리기 */
// $('#gnbTitle').hover(function(){
//     $('.snb').stop().slideDown(500)
// }, function(){
//     $('.snb').stop().slideUp(500)
// })
/* 주요네비 개별 내리기 */
$('#gnbTitle>li').on('mouseenter',function(){
    $('.snb').not( $(this).children('.snb') ).hide()
    $(this).children('.snb').slideDown(300)
})
$('#gnbTitle>li').on('mouseleave',function(){
    $('.snb').hide()
})

/* nav - 스크롤 한번 내리면 fix시키기 */
// $(window).on('scroll',function(){
//     $('#navFix').css({position:'fixed',boxShadow:'0 0 10px rgba(0, 0, 0, 0.3)'})
// })

let state=1
document.addEventListener('wheel',function(e){
    // console.log(e.wheelDelta)
    if(e.wheelDelta<0 && state==1){
        state=0
        $('#navFix').css({position:'fixed',boxShadow:'0 0 10px rgba(0, 0, 0, 0.3)'})
    }else if(e.wheelDelta>0 && state==0){
        $('#navFix').css({position:'fixed',boxShadow:'0 0 0px'})
        state=1
    }
})




/* taste 슬라이드 */
let imgwidth=$('#list ul img').width()
// console.log(imgwidth)
$('#tasteLeft').on('click',function(){ //마지막이미지가 첫번째로 prepend, ul의 marginLeft
    $('#list ul').prepend( $('#list ul li:last') ).css({marginLeft:-imgwidth}).animate({marginLeft:0})
})
$('#tasteRight').on('click',function(){ //첫번째이미지가 맨뒤로 append. ul의 marginLeft이동
    $('#list ul:not(:animated)').animate({marginLeft:-imgwidth}, 500, function(){
        $('#list ul').append( $('#list ul li:first') ).css({marginLeft:0})
    })
})















/* top버튼 : 윈도우 스크롤이 #taste에 오면 나타나게하고, 그 이전이면 숨기기 */
$('#top').css({display:'none'})

$(window).on('scroll',function(){
    if( $(window).scrollTop() >= $('main').position().top-500 ){
        $('#top').show()
    }
    else{
        $('#top').hide()
    }
})
console.log( $('main').position().top )