$('a').on('click',function(e){
    e.preventDefault()
})

/*--------------------슬라이드----------------------- */
$('.snb').hide()
/* 주요네비-개별 내리기 */
$('#gnbTitle>li').on('mouseenter',function(){
    $('.snb').not( $(this).children('.snb') ).hide()
    $(this).children('.snb').stop().slideDown(300)
})
$('#gnbTitle>li').on('mouseleave',function(){
    $('.snb').stop().slideUp(300)
})

/* nav - 스크롤 내리면 shadow효과 적용 */
// $(window).on('scroll',function(){
//     if( $(window).scrollTop() >= 50 ){
//         $('#navFix').css({boxShadow:'0 0 10px rgba(0, 0, 0, 0.3)'})
//     }else{
//         $('#navFix').css({boxShadow:'0 0 0px'})
//     }
// })
let navcolor=0
$(window).on('scroll',function(){
    if( $(window).scrollTop() >= 50 && navcolor==0 ){
        navcolor=1
        $('#navFix').css({boxShadow:'0 0 10px rgba(0, 0, 0, 0.3)'}).animate({backgroundColor:"#fff"})
    }else if( $(window).scrollTop() < 50 && navcolor==1){
        $('#navFix').css({boxShadow:'0 0 0px'}).animate({backgroundColor:"#f8f8f2"})
        navcolor=0
    }
})




/* 메인배너 슬라이드 */
var num=0; //변수 num은 slideOn클래스 이동을 위한 변수
let Rwin=$(window).width()
console.log(Rwin)

function sliding(){
    num++
    //-4200보다 작고 -2100보다 크면
    if( $('.sliderList').css('left') <= "-4200px" && $('.sliderList').css('left') > "-2000px" ){
        num=0
        $('.sliderList').animate({left:"0%"})
    }else{
        $('.sliderList').animate({left:"-=100%"})
    }
    $('.sliderBtn div').removeClass('slideOn')
    $('.sliderBtn div:eq('+num+')').addClass('slideOn')
    // console.log('sliderLeft = '+$('.sliderList').css('left') )

}
let timer1=setInterval(sliding,3000)

$('.sliderBtn div').on('click',function(e){
    clearInterval(timer1)
    timer1=setInterval(sliding,3000)

    let pos=$(this).index()*(-100)+'%'
    $('.sliderList:not(:animated)').stop().animate({left:pos})

    $('.sliderBtn div').removeClass('slideOn')
    $(this).addClass('slideOn')

    e.preventDefault()
})








/* taste 슬라이드 */
let imgwidth=$('#list ul img').width()
$('#tasteLeft').on('click',function(){ //마지막이미지가 첫번째로 prepend, ul의 marginLeft
    $('#list ul').prepend( $('#list ul li:last') ).css({marginLeft:-imgwidth}).animate({marginLeft:0})
})
$('#tasteRight').on('click',function(){ //첫번째이미지가 맨뒤로 append. ul의 marginLeft이동
    $('#list ul:not(:animated)').animate({marginLeft:-imgwidth}, 500, function(){
        $('#list ul').append( $('#list ul li:first') ).css({marginLeft:'20px'})
    })
})




/* ------------------best-------------------- */


/* $('#bestWrap>section>div>ul>li>a') 클릭시 bestProduct에 이미지 뜨게하는 클릭이벤트 */
$('#bestWrap>section>div>ul>li>a').on('click',function(e){
    let honeyimg=$(this).attr('href')
    let alt=$(this).children().attr('alt')
    $('.bestProduct').attr({src:honeyimg, alt:alt})

    let honeyTxt=$(this).children().attr('alt')
    console.log(honeyTxt)
    $('.bestProductTxt').replaceWith('<p class="bestProductTxt">'+honeyTxt+'</p>')

    e.preventDefault()
})

/* 각 bestdiv클릭 시 해당하는 섹션으로 이동
예)베스트를 누르면 나머지는 사라지게 하고 베스트만 보이게 하기 */
$('.bestdiv div').on('click',function(e){
    let href=$(this).children().attr('href')
    let imgPath=$(href).find('li:eq(0)').children('a').attr('href')
    let txtPath=$(href).find('li:eq(0)').find('img').attr('alt')
    // console.log(txtPath)
    
    let num=$(this).index()
    $('.bestProduct').attr({src:imgPath})
    $('.bestProductTxt').replaceWith('<p class="bestProductTxt">'+txtPath+'</p>')
    
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
            document.getElementById(id).innerHTML = '타임딜 종료'
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
CountDownTimer('10/16/2021 23:59:59', 'dealCount') // 2021-10-16까지

function alarm(){
    $('#alarm').animate({top:"0"}).animate({left:"70px"},100).animate({left:"90px"},100).animate({left:"70px"},100).animate({left:"90px"},100).animate({top:"20px"})
}
setInterval(alarm,1000)

/* farmWrap 슬라이드 */
// $('#farmBtn div').on('click',function(){
//     let num=$(this).index()
//     console.log( num )
//     $('#farmWrap li').removeClass('zIndex')
//     $('#farmWrap li:eq('+num+')').addClass('zIndex')

//     $('#farmBtn div').removeClass('farmBtnOn')
//     $(this).addClass('farmBtnOn')
// })

$('#farm2, #farm3').hide()
$('#farmBtn div').on('click',function(){
    let num=$(this).index()
    console.log( num )
    $('#farmWrap li').fadeOut(1000).removeClass('zIndex')
    $('#farmWrap li:eq('+num+')').addClass('zIndex').fadeIn(1000)

    $('#farmBtn div').removeClass('farmBtnOn')
    $(this).addClass('farmBtnOn')
})




/*-----------------------------------퀵버튼------------------------------------- */
/*윈도우 스크롤이 #taste에 오면 나타나게하고, 그 이전이면 숨기기 */
$('#quick').css({display:'none'})

$(window).on('scroll',function(){
    if( $(window).scrollTop() >= $('main').position().top-500 ){
        $('#quick').show()
    }
    else{
        $('#quick').hide()
    }
})
/* 퀵버튼 hover 시 span 넓이 애니메이션 */
$('#quick').hover(function(){
    $('#quick div span:eq(1)').animate({width:'25'+'%', left:'22px'})
}, function(){
    $('#quick div span:eq(1)').animate({width:'42px', left:'10px'})
})

/*퀵버튼 slide */
$('.quickMenu').css({right:'-310px'})
$('#quick').on('click',function(e){
    $('.quickMenu').animate({right:'0px'})
    e.preventDefault()
})
$('.exit p').on('click',function(e){
    $('.quickMenu').animate({right:'-310px'})
    e.preventDefault()
})





/* exitX 돌아가게 만들기  */
$('.exit p').hover(function(){
    $('.exitX').stop().css({animationName:'exitXrotate', animationDuration: "0.3s"})
},function(){
    $('.exitX').stop().css({animationName:'exitXrotate2', animationDuration: "0.3s"})
})