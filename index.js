
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
setInterval("imgnumation()",4000);

//----------버튼------------------

function recommendapi(){
    var areacode = [0,1,2,3,4,5,6,7,8,31,32,33,34,35,36,37,38,39];
    var number = Math.floor(Math.random() * 17 + 1);
    var contentscode = 12;
    var xhr = new XMLHttpRequest();
    var url = 'http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList'; /*URL*/
    var queryParams = '?' + encodeURIComponent('serviceKey') + '='+'yX8wx5nzKb42wtBThegyX7gb6G3xUCPCMfbzNYF1Gf0p0nSUn9ZeynPzokq9GNLvrFLmqQVbU9%2FQz9LckJpQLw%3D%3D'; /*Service Key*/
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('3'); /**/
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
            console.log(image);
            for(var i = 0; i<3; i++){
                var num = i;
                document.querySelectorAll('.recommend_place img')[num].setAttribute('src',image[num].innerHTML);
                document.querySelectorAll('.recommend_topic h3')[num].innerHTML = names[num].innerHTML;
            }
        }
    };

    xhr.send('');
}

recommendapi();

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
setInterval("imgnumation()",4000);

