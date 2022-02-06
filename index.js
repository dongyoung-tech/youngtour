
if(document.documentElement.scrollTop>50){
    document.querySelector('.header').classList.add('after');
}
else{
    document.querySelector('.header').classList.remove('after'); 
}
window.addEventListener('scroll',function(){
    if(document.documentElement.scrollTop>50){
        document.querySelector('.header').classList.add('after');
    }
    else{
        document.querySelector('.header').classList.remove('after'); 
    }
});





var photo = document.querySelectorAll('.intro_img');

var num=0;
function imgnumation(){
 num++
 if(num>2){
     num=0;
 }

 if (num==0){
    photo[num].style.opacity="1";
    photo[2].style.opacity="0";
    }
    if (num==1){
       photo[num].style.opacity="1";
       photo[0].style.opacity="0";
       photo[2].style.opacity="0";
       } 
   if (num==2){
       photo[num].style.opacity="1";
       photo[0].style.opacity="0";
       photo[1].style.opacity="0";
       }   

}
setInterval(imgnumation,4000);

//----------버튼------------------

function recommendapi(){
    var areacode = [0,1,2,3,4,5,6,7,8,31,32,33,34,35,36,37,38,39];
    var number = Math.floor(Math.random() * 17 + 1);
    var contentscode = 12;
    var xhr = new XMLHttpRequest();
    var url = '//api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList'; /*URL*/
    var queryParams = '?' + encodeURIComponent('serviceKey') + '='+'yX8wx5nzKb42wtBThegyX7gb6G3xUCPCMfbzNYF1Gf0p0nSUn9ZeynPzokq9GNLvrFLmqQVbU9%2FQz9LckJpQLw%3D%3D'; /*Service Key*/
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('13'); /**/
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1');
    queryParams += '&' + encodeURIComponent('arrange') + '=' + encodeURIComponent('P'); /**/
    queryParams += '&' + encodeURIComponent('MobileOS') + '=' + encodeURIComponent('ETC'); /**/
    queryParams += '&' + encodeURIComponent('MobileApp') + '=' + encodeURIComponent('AppTest'); /**/
    queryParams += '&' + encodeURIComponent('areaCode') + '=' + encodeURIComponent(areacode[number]);
    queryParams += '&' + encodeURIComponent('contentTypeId') + '=' + encodeURIComponent(contentscode); /**/
    xhr.open('GET', url + queryParams);
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            var xml = this.responseXML;
            var names = xml.getElementsByTagName('title');
            var image = xml.getElementsByTagName('firstimage');
            var content = xml.getElementsByTagName('contentid');
            for(var i = 0; i<12; i++){
                var num = i;
                var span1 = document.createElement('span');
                var span2 = document.createElement('span');
                var image2 = document.createElement('img');
                var rh = document.createElement('h3');
                var rh2 = document.createElement('h4');   
                var rhref = document.createElement('a');
                rhref.setAttribute('href',"./result.html?" +content[i].innerHTML);            
                span1.className = "recommend_place";
                span2.className = "recommend_topic"
                document.querySelector('.recommend_box').appendChild(span1);
                span1.appendChild(span2);
                span1.appendChild(image2);
                span2.appendChild(rh2);
                span2.appendChild(rh);
                image2.setAttribute('src',image[num].innerHTML);
                rh2.innerHTML="추천여행지";
                rh.innerHTML = names[num].innerHTML;
                document.querySelectorAll('.recommend_place')[i].appendChild(rhref);
            }
        }
    };

    xhr.send('');
}
recommendapi();







function contentapi(a){
    var areacode = [0,1,2,3,4,5,6,7,8,31,32,33,34,35,36,37,38,39];
    var number = Math.floor(Math.random() * 17 + 1);
    var xhr = new XMLHttpRequest();
    var url = '//api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList'; /*URL*/
    var queryParams = '?' + encodeURIComponent('serviceKey') + '='+'yX8wx5nzKb42wtBThegyX7gb6G3xUCPCMfbzNYF1Gf0p0nSUn9ZeynPzokq9GNLvrFLmqQVbU9%2FQz9LckJpQLw%3D%3D'; /*Service Key*/
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('13'); /**/
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1');
    queryParams += '&' + encodeURIComponent('arrange') + '=' + encodeURIComponent('P'); /**/
    queryParams += '&' + encodeURIComponent('MobileOS') + '=' + encodeURIComponent('ETC'); /**/
    queryParams += '&' + encodeURIComponent('MobileApp') + '=' + encodeURIComponent('AppTest'); /**/
    queryParams += '&' + encodeURIComponent('areaCode') + '=' + encodeURIComponent(areacode[number]);
    queryParams += '&' + encodeURIComponent('contentTypeId') + '=' + encodeURIComponent(a); /**/
    xhr.open('GET', url + queryParams);
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            var xml = this.responseXML;
            var title = xml.getElementsByTagName('title');
            var image = xml.getElementsByTagName('firstimage');
            var addr = xml.getElementsByTagName('addr1');
            var content = xml.getElementsByTagName('contentid');
            for(var i =0; i<4; i++){
                var rhref = document.createElement('a');
                rhref.setAttribute('href',"./result.html?" +content[i].innerHTML);
                document.querySelectorAll('.recommend_travel_intro h2')[i].innerHTML = title[i].innerHTML;
                document.querySelectorAll('.recommend_travel_intro h3')[i].innerHTML = addr[i].innerHTML;
                document.querySelectorAll('.recommend_travel_box div')[i].style.backgroundImage = "url(" + image[i].innerHTML + ")";
                document.querySelectorAll('.recommend_travel_box div')[i].appendChild(rhref);
            }
        }
    };

    xhr.send('');
}
contentapi('39');

var rlist = document.querySelectorAll('.recommend_menu li');

rlist[0].addEventListener('click',function(){
    contentapi('12');
});
rlist[1].addEventListener('click',function(){
    contentapi('14');
});
rlist[2].addEventListener('click',function(){
    contentapi('39');
});

for(var i=0; i<3; i++){
    rlist[i].addEventListener('click',function(e){
        var alist = document.querySelector('.active');
        alist.classList.remove('active');
        e.target.classList.add('active');
    });
}


var currentidx=0;
function move1(idx){
    console.log(idx);
    if(idx == -2){
        document.querySelectorAll('.navi_btn')[0].style.display="none";
    }
    else{
        document.querySelectorAll('.navi_btn')[0].style.display="inline-block";
        
    }
    if (idx != 0 ){
        document.querySelectorAll('.navi_btn')[1].style.display="inline-block";
    }
    document.querySelector('.recommend_box').style.left = idx*1000+'px'; 
    currentidx += -1;
}
function move2(idx){
    console.log(idx);
    if(idx == 0){
        document.querySelectorAll('.navi_btn')[1].style.display="none";
    }
    else{
        document.querySelectorAll('.navi_btn')[1].style.display="inline-block";
    }
    if (idx != -2 ){
        document.querySelectorAll('.navi_btn')[0].style.display="inline-block";
    }
    document.querySelector('.recommend_box').style.left = idx*1000+'px'; 
    currentidx += 1;

}

document.querySelectorAll('.navi_btn')[0].addEventListener('click',function(){
    move1(currentidx-1);
});
document.querySelectorAll('.navi_btn')[1].addEventListener('click',function(){
    move2(currentidx+1);
});



function searchlink(){
    document.querySelector(".main_btn").setAttribute('onclick',"location.href='http://127.0.0.1:5500/keyword.html" + "?" +document.querySelector(".main_input").value + "'");
}

document.querySelector(".main_input").addEventListener("keyup",function(){searchlink();});

