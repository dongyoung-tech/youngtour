function areaApi() {
   var xhr = new XMLHttpRequest();
   var areavalue = document.querySelector(".detail_input").value;
   var contentvalue = document.querySelector(".detail_input2").value;
   var areavalue2 = document.querySelector(".detail_input3").value;
    var url = 'http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList'; /*URL*/
    var queryParams = '?' + encodeURIComponent('serviceKey') + '='+'yX8wx5nzKb42wtBThegyX7gb6G3xUCPCMfbzNYF1Gf0p0nSUn9ZeynPzokq9GNLvrFLmqQVbU9%2FQz9LckJpQLw%3D%3D'; /*Service Key*/
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('12'); /**/
    queryParams += '&' + encodeURIComponent('MobileApp') + '=' + encodeURIComponent('AppTest'); /**/
    queryParams += '&' + encodeURIComponent('MobileOS') + '=' + encodeURIComponent('ETC'); /**/
    queryParams += '&' + encodeURIComponent('arrange') + '=' + encodeURIComponent('P'); /**/ /**/
    queryParams += '&' + encodeURIComponent('areaCode') + '=' + encodeURIComponent(areavalue); /**/
    queryParams += '&' + encodeURIComponent('sigunguCode') + '=' + encodeURIComponent(areavalue2); /**/
    queryParams += '&' + encodeURIComponent('contentTypeId') + '=' + encodeURIComponent(contentvalue); /**/
    queryParams += '&' + encodeURIComponent('listYN') + '=' + encodeURIComponent('Y'); /**/
    xhr.open('GET', url + queryParams);
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            var xml = this.responseXML;
            var addr1 = xml.getElementsByTagName('addr1');
            var contentId = xml.getElementsByTagName('contentid');
            var title = xml.getElementsByTagName('title');
            if(dinput.value == 0){
                alert('지역을설정해주세요');
                return
            }
            if(title.length < 1){
                alert('검색결과가없습니다');
            }

            var image = xml.getElementsByTagName('firstimage');
            var typeid = xml.getElementsByTagName('contenttypeid');
            var resultpage = document.querySelector('.result_box');
            var min = Math.min(image.length,addr1.length,title.length);
            document.querySelector('.result_page h1').style.display="inline-block";
            document.querySelector('.area_weather').style.display="inline-block";
            aldiv = document.createElement('h2');
            resultpage.appendChild(aldiv);
            aldiv.innerHTML ="찾은 여행지 수 : " + title.length;
            for(var i=0; i<min; i++){
                img = document.createElement('img');
                rh = document.createElement('h3');
                rh2 = document.createElement('h4');
                rh3 = document.createElement('h5');
                rh4 = document.createElement('h6');
                rdiv = document.createElement('div');
                resultpage.appendChild(rdiv);
                img.setAttribute('src',image[i].innerHTML);
                rh.innerHTML = title[i].innerHTML;
                rh2.innerHTML = addr1[i].innerHTML;
                rh3.innerHTML = contentId[i].innerHTML;
                rh4.innerHTML = typeid[i].innerHTML;
                rdiv.setAttribute('data-value',i);
                document.querySelectorAll('.result_box div')[i].appendChild(img);
                document.querySelectorAll('.result_box div')[i].appendChild(rh);
                document.querySelectorAll('.result_box div')[i].appendChild(rh2);
                document.querySelectorAll('.result_box div')[i].appendChild(rh3);
                document.querySelectorAll('.result_box div')[i].appendChild(rh4);
            }
        }
    };
    xhr.send('');

}
var dinput = document.querySelector('.detail_input');
var dinput3 = document.querySelector(".detail_input3");
dinput.addEventListener('click',function(){
    if(document.querySelectorAll(".detail_input3 option").length>0){
        while(document.querySelector('.detail_input3').hasChildNodes()){
            document.querySelector('.detail_input3').removeChild(document.querySelector('.detail_input3').firstChild);
        }
    } 
    if(document.querySelector(".detail_input3").value == 0){ 
        var doption = document.createElement('option');
        dinput3.appendChild(doption);
        doption.innerHTML ="도시 선택";
        doption.setAttribute('value',"");
    }
    var v = dinput.value;
    inputapi(v);
});

function inputapi(v){
    var xhr = new XMLHttpRequest();
    var url = 'http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaCode'; /*URL*/
    var queryParams = '?' + encodeURIComponent('serviceKey') + '='+'yX8wx5nzKb42wtBThegyX7gb6G3xUCPCMfbzNYF1Gf0p0nSUn9ZeynPzokq9GNLvrFLmqQVbU9%2FQz9LckJpQLw%3D%3D'; /*Service Key*/
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('40'); /**/
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
    queryParams += '&' + encodeURIComponent('MobileOS') + '=' + encodeURIComponent('ETC'); /**/
    queryParams += '&' + encodeURIComponent('MobileApp') + '=' + encodeURIComponent('AppTest'); /**/
    queryParams += '&' + encodeURIComponent('areaCode') + '=' + encodeURIComponent(v); /**/
    xhr.open('GET', url + queryParams);
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            var xml = this.responseXML;
            var names = xml.getElementsByTagName('name');;
            for(var i = 0; i<names.length; i++){
                var num = i;
                var dinput3 = document.querySelector('.detail_input3');
                var option = document.createElement('option');
                option.innerHTML = names[num].innerHTML;
                option.setAttribute('value',num+1);
                dinput3.appendChild(option);
            }
        }
    };

    xhr.send('');
}

document.querySelector(".search_btn2").addEventListener('click',function(){
    var resultpage = document.querySelector('.result_box'); 
    if(document.querySelector('.result_box').childElementCount > 0){
        resultpage.removeChild(document.querySelector('.result_box h2')); 
        while(resultpage.childElementCount > 0){
                resultpage.removeChild(document.querySelector('.result_box div')); 
            }
        areaApi();    
        return
    } 
    if (document.querySelector('.result_box').childElementCount == 0){
        areaApi();
    }
});

//-----------------숙박 검색하기--------------------//



