/*--------------------슬라이드----------------------- */
$('.snb').hide()

/* 주요네비-전체내리기 */
// $('#gnbTitle').hover(function(){
//     $('.snb').stop().slideDown(500)
// }, function(){
//     $('.snb').stop().slideUp(500)
// })

/* 주요네비-개별 내리기 */
$('#gnbTitle>li').on('mouseenter',function(){
    $('.snb').not( $(this).children('.snb') ).hide()
    $(this).children('.snb').stop().slideDown(300)
})
$('#gnbTitle>li').on('mouseleave',function(){
    $('.snb').stop().slideUp(300)
})

/* nav - 스크롤 한번 내리면 fix시키기 */
// $(window).on('scroll',function(){
//     $('#navFix').css({position:'fixed',boxShadow:'0 0 10px rgba(0, 0, 0, 0.3)'})
// })

let state=1
document.addEventListener('wheel',function(e){
    if(e.wheelDelta<0 && state==1){
        state=0
        $('#navFix').css({position:'fixed',boxShadow:'0 0 10px rgba(0, 0, 0, 0.3)'})
    }else if(e.wheelDelta>0 && state==0){
        $('#navFix').css({position:'fixed',boxShadow:'0 0 0px'})
        state=1
    }
})
/* 메인배너 슬라이드 */
var num=0; //변수 num은 slideOn클래스 이동을 위한 변수
let liWidth=$('.sliderList').width()
let sliderLeft= $('.sliderList').css('left')

function sliding(){
    num++
    if( $('.sliderList').css('left') == "-200%"){
        num=0
        $('.sliderList').animate({left:0})
    }else{
        $('.sliderList').animate({left:"-=100%"})
    }
    $('.sliderBtn div').removeClass('slideOn')
    $('.sliderBtn div:eq('+num+')').addClass('slideOn')
    console.log('sliderLeft = '+$('.sliderList').css('left'))

}
// let timer1=setInterval(sliding,2000)

$('.sliderBtn div').on('click',function(e){
    // clearInterval(timer1)
    // timer1=setInterval(sliding,2000)

    let pos=$(this).index()*(-100)+'%'
    $('.sliderList:not(:animated)').stop().animate({left:pos})

    $('.sliderBtn div').removeClass('slideOn')
    $(this).addClass('slideOn')

    e.preventDefault()
})








/* taste 슬라이드 */
let imgwidth=$('#list ul img').width()
// console.log(imgwidth)
$('#tasteLeft').on('click',function(){ //마지막이미지가 첫번째로 prepend, ul의 marginLeft
    $('#list ul').prepend( $('#list ul li:last') ).css({marginLeft:-imgwidth}).animate({marginLeft:0})
})
$('#tasteRight').on('click',function(){ //첫번째이미지가 맨뒤로 append. ul의 marginLeft이동
    $('#list ul:not(:animated)').animate({marginLeft:-imgwidth}, 500, function(){
        $('#list ul').append( $('#list ul li:first') ).css({marginLeft:'20px'})
    })
})




/* ------------------best-------------------- */
// $('#steadyList,#thisweekList').hide()


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

/* bestdiv클릭 시 class이동  */
$('.bestdiv div').on('click',function(){
    let posY=$(this).position().top
    $('.divOn').stop().animate({top:posY},300)

    $('.bestdiv div').children('a').css({color:'#000'})
    $(this).children('a').css({color:'#fff'})
})


/* timeDeal */
function CountDownTimer(dt, id) {
    var end = new Date(dt)
    var _second = 1000;
    var _minute = _second * 60
    var _hour = _minute * 60
    var _day = _hour * 24
    var timer;
    function showRemaining() {
        var now = new Date()
        var distance = end - now
        if (distance < 0) { //timeOut시
            clearInterval(timer)
            document.getElementById(id).innerHTML = '타임딜 종료됨'
            return
        }
        var days = Math.floor(distance / _day)
        var hours = Math.floor((distance % _day) / _hour)
        var minutes = Math.floor((distance % _hour) / _minute)
        var seconds = Math.floor((distance % _minute) / _second)
        document.getElementById(id).innerHTML = days + '일 '
        document.getElementById(id).innerHTML += hours + '시간 '
        document.getElementById(id).innerHTML += minutes + '분 '
        document.getElementById(id).innerHTML += seconds + '초'
    }
    timer = setInterval(showRemaining, 1000)
}
CountDownTimer('10/13/2021 23:59:59', 'dealCount') // 2021-10-13까지

function alarm(){
    $('#alarm').animate({top:"0"}).animate({left:"70px"},100).animate({left:"90px"},100).animate({left:"70px"},100).animate({left:"90px"},100).animate({top:"20px"})
}
setInterval(alarm,1000)

/* farmWrap 슬라이드 */
// $('#farmBtn div').on('click',function(){
//     let pos=$(this).index()*(-800)
//     $('#farmWrap').stop().animate({marginLeft:pos})

//     $('#farmBtn div').removeClass('farmBtnOn')
//     $(this).addClass('farmBtnOn')
// })

$('#farmBtn div').on('click',function(){
    let num=$(this).index()
    console.log( num )
    $('#farmWrap li').removeClass('zIndex')
    $('#farmWrap li:eq('+num+')').addClass('zIndex')

    $('#farmBtn div').removeClass('farmBtnOn')
    $(this).addClass('farmBtnOn')
})




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