$('a').on('click',function(e){
    e.preventDefault()
})
/* 마우스커서 */
// $(window).on('mousemove',function(e){
//     $('.mouseB').css({
//         top:e.pageY+5, left:e.pageX+5})
//     // console.log( $('.mouseB').position().left )

//     if( $('.mouseB').position().left > $(window).width() ){
//         $('.mouseB').hide()
//     }else if( $('.mouseB').position().left < $(window).width() ){
//         $('.mouseB').show()
//     }
// })

// .mouseB의 left값이 window값보다 많은 조건식에 걸릴경우 left값으로 0도 같이 찍힘

$(window).on('mousemove',function(e){
    if( $('.mouseB').position().left < $(window).width()-200 ){
        $('.mouseB').css({ opacity:1,
            top:e.pageY+5, left:e.pageX+5})
        }

   else  {
    $('.mouseB').css({ opacity:0,
        top:e.pageY+5, left:e.pageX-95})

    }
    // console.log( '.mouseB의 position().left= '+$('.mouseB').position().left )
    // console.log( '윈도우 넓이 = '+$(window).width() )
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
let navcolor=0
$(window).on('scroll',function(){
    if( $(window).scrollTop() >= 50 && navcolor==0 ){
        navcolor=1
        $('#navFix').css({boxShadow:'0 0 10px rgba(0, 0, 0, 0.3)'})
    }else if( $(window).scrollTop() < 50 && navcolor==1){
        $('#navFix').css({boxShadow:'0 0 0px'})
        navcolor=0
    }
})



/* 메인배너 슬라이드 */
var num=0; //변수 num은 slideOn클래스 이동을 위한 변수
// let Rwin=$(window).width()
let liCount=0; //메인슬라이더용 변수1
let liLength=$('.sliderList li').length; //메인슬라이더용 변수2

function sliding(){
    liCount++
    num++
    if( liCount==liLength ){
        num=0
        $('.sliderList:not(:animated)').stop().animate({left:"0%"})
    }else{
        $('.sliderList:not(:animated)').stop().animate({left:"-=100%"})
    }
    if( liCount==3 ) liCount=0

    $('.sliderBtn div').removeClass('slideOn')
    $('.sliderBtn div:eq('+num+')').addClass('slideOn')

}
let timer1=setInterval(sliding,3000)

$('.sliderBtn div').on('click',function(e){
    clearInterval(timer1)
    timer1=setInterval(sliding,3000)

    liCount = $(this).index()
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
        $('#list ul').append( $('#list ul li:first') ).css({marginLeft:'0px'})
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
/* 꿀팁 */
$('#honeyTip div:eq(0)').hover(function(){
    $(this).css({backgroundSize:'500px 500px',transition:'1s'})
},function(){
    $(this).css({backgroundSize:'450px 450px',transition:'1s'})
})
$('#honeyTip div:eq(1)').hover(function(){
    $(this).css({backgroundSize:'210px 210px',transition:'1s'})
},function(){
    $(this).css({backgroundSize:'170px 170px',transition:'1s'})
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
    $('#alarm').animate({top:"50px"})
    .animate({left:"70px"},100)
    .animate({left:"90px"},100)
    .animate({left:"70px"},100)
    .animate({left:"90px"},100)
    .animate({top:"70px"})
}
setInterval(alarm,1000)

/*-------------- farmWrap 슬라이드 -----------------------*/
$('#farm2, #farm3').hide()

let farmState=1 //eq:0,1,2 or farm1,2,3
let farmBtnState=0

function farmSlide(){
    farmState++
    farmBtnState++
    $('#farmWrap li').fadeOut(2000).removeClass('zIndex')
    $('#farm'+farmState+'').addClass('zIndex').fadeIn(2000)
    if(farmState==3){farmState=0;}
    if(farmBtnState==3){farmBtnState=0}

    $('#farmBtn div').removeClass('farmBtnOn')
    $('#farmBtn div:eq('+farmBtnState+')').addClass('farmBtnOn')
}
let farmTimer=setInterval(farmSlide,4000)


$('#farmBtn div').on('click',function(){
    clearInterval(farmTimer)
    farmTimer=setInterval(farmSlide,4000)

    let num=$(this).index()
    $('#farmWrap li').fadeOut(2000).removeClass('zIndex')
    $('#farmWrap li:eq('+num+')').addClass('zIndex').fadeIn(2000)

    $('#farmBtn div').removeClass('farmBtnOn')
    $(this).addClass('farmBtnOn')
})


$('#farmTxt').css({opacity:0})
$(window).on('scroll',function(){
    if( $(window).scrollTop() >= $('#native').position().top-500 ){
        $('#farmTxt').animate({opacity:1},2000)
    }
})

/* honeyWork */
let km=1; let kmP=document.querySelector('#honey_km p:nth-of-type(1)');
let mg=1; let mgP=document.querySelector('#honey_mg p:nth-of-type(1)');
let enter=0; let enterP=document.querySelector('#honey_enter p:nth-of-type(1)');
let beecount=1; let beecountP=document.querySelector('#honey_beecount p:nth-of-type(1)');
let state=1
let workpos=$('#honeyWork').position().top
// console.log(kmP, workpos)

window.addEventListener('scroll',function(){
    if(window.scrollY >= workpos-400 && state==1){
        state=0
        honeyKm()
        honeyMg()
        honeyEnt()
        honeyBcount()
    }
})

function honeyKm(){
    kmP.innerText= ++km
    if(km==40)return false
    setTimeout(function(){
        honeyKm()
    },50)
}
function honeyMg(){
    mgP.innerText= ++mg
    if(mg==30)return false
    setTimeout(function(){
        honeyMg()
    },50)
}
function honeyEnt(){
    enter+=100
    enterP.innerText= enter
    if(enter==40000)return false
    setTimeout(function(){
        honeyEnt()
    },3)
}
function honeyBcount(){
    beecountP.innerText= ++beecount
    if(beecount==600)return false
    setTimeout(function(){
        honeyBcount()
    },1)
}


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
