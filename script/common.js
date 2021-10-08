/*--------------------슬라이드----------------------- */
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
/* 메인배너 슬라이드 */
$('.sliderBtn div').on('click',function(){
    let pos=$(this).index()*(-100)+'%'
    $('.sliderList').animate({left:pos})

    $('.sliderBtn div').removeClass('slideOn')
    $(this).addClass('slideOn')
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




/* ------------------best-------------------- */

/* $('#bestWrap>section>div>ul>li>a') 클릭시 bestProduct에 이미지 뜨게하는 클릭이벤트 */
$('#bestWrap>section>div>ul>li>a').on('click',function(e){
    let honeyimg=$(this).attr('href')
    let alt=$(this).children().attr('alt')
    $('.bestProduct').attr({src:honeyimg, alt:alt})
    // console.log( $(this) ).attr('alt') 
    e.preventDefault()
})

/* 각 bestdiv클릭 시 해당하는 섹션으로 이동
예)베스트를 누르면 나머지는 사라지게 하고 베스트만 보이게 하기 */
$('.bestdiv div').on('click',function(e){
    let href=$(this).children().attr('href')
    let imgPath=$(href).find('li:eq(0)').children().attr('href')
    let num=$(this).index()
    // console.log(imgPath)
    $('.bestProduct').attr({src:imgPath})

    $(this).parent().siblings('section').hide()
    $(this).parent().siblings('section:eq('+num+')').show()

    e.preventDefault()
})

/* 풀어서 쓰기 */
// $('#bestWrap section:eq(1), #bestWrap section:eq(2)').hide()
// $('.bestdiv_best').on('click',function(e){
//     $(this).parent().siblings('section').hide()
//     $(this).parent().siblings('section:eq(0)').show()
//     e.preventDefault()
// })
// $('.bestdiv_steady').on('click',function(e){
//     $(this).parent().siblings('section').hide()
//     $(this).parent().siblings('section:eq(1)').show()
//     e.preventDefault()
// })
// $('.bestdiv_thisweek').on('click',function(e){
//     $(this).parent().siblings('section').hide()
//     $(this).parent().siblings('section:eq(2)').show()
//     e.preventDefault()
// })


/* bestdiv클릭 시 class이동  */








/*-----------------------------------퀵버튼------------------------------------- */
/*윈도우 스크롤이 #taste에 오면 나타나게하고, 그 이전이면 숨기기 */
$('#top').css({display:'none'})

$(window).on('scroll',function(){
    if( $(window).scrollTop() >= $('main').position().top-500 ){
        $('#top').show()
    }
    else{
        $('#top').hide()
    }
})
// console.log( $('main').position().top )


/*퀵버튼 토글 */
$('.quickMenu').css({right:'-300px'})
$('#top, .exit p').toggle(function(e){
    $('.quickMenu').animate({right:'0px'})
    e.preventDefault()
},function(e){
    $('.quickMenu').animate({right:'-300px'})
    e.preventDefault()
})
/* exitX 돌아가게 만들기  */
$('.exitX').hover(function(){
    $(this).stop().css({animationName:'exitXrotate', animationDuration: "0.3s"})
},function(){
    $(this).stop().css({animationName:'exitXrotate2', animationDuration: "0.3s"})
})