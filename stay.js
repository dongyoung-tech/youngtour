window.addEventListener('scroll',function(){
    if(document.documentElement.scrollTop>50){
        document.querySelector('.header').classList.add('after');
    }
    else{
        document.querySelector('.header').classList.remove('after'); 
    }
});


var stayput = document.querySelector('.stay_input');
var stayput3 = document.querySelector(".stay_input2");
stayput.addEventListener('click',function(){
    if(document.querySelectorAll(".stay_input2 option").length>0){
        while(document.querySelector('.stay_input2').hasChildNodes()){
            document.querySelector('.stay_input2').removeChild(document.querySelector('.stay_input2').firstChild);
        }
    } 
    if(document.querySelector(".stay_input2").value ==0){
        var soption = document.createElement('option');
        stayput3.appendChild(soption);
        soption.innerHTML ="도시 선택";
        soption.setAttribute('value',"");
    }
    var v = stayput.value;
    stayinputapi(v);
});


function stayinputapi(v){
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
                var dinput3 = document.querySelector('.stay_input2');
                var option = document.createElement('option');
                option.innerHTML = names[num].innerHTML;
                option.setAttribute('value',num+1);
                dinput3.appendChild(option);
            }
        }
    };

    xhr.send('');
}

document.querySelector('.stay_btn').addEventListener('click',function(){
    var value1 = document.querySelector('.stay_input').value;
    var value2 = document.querySelector('.stay_input2').value;
    var  resultpage = document.querySelector('.stay_result_box'); 
    document.querySelector('.stay_result_page h2').style.display="inline-block";
    document.querySelector('.stay_result_page .area_weather').style.display="inline-block";
    if(resultpage.childElementCount > 0){
        resultpage.removeChild(document.querySelector('.stay_result_box h3'));
        while(resultpage.childElementCount > 0){
                resultpage.removeChild(document.querySelector('.stay_result_box div')); 
            }
        stayapi(value1,value2);  
        return
    } 
    if (document.querySelector('.stay_result_box').childElementCount == 0){
        stayapi(value1,value2);
    }

});

function stayapi(areacode,sicode){
    var xhr = new XMLHttpRequest();
    var url = 'http://api.visitkorea.or.kr/openapi/service/rest/KorService/searchStay'; /*URL*/
    var queryParams = '?' + encodeURIComponent('serviceKey') + '='+'yX8wx5nzKb42wtBThegyX7gb6G3xUCPCMfbzNYF1Gf0p0nSUn9ZeynPzokq9GNLvrFLmqQVbU9%2FQz9LckJpQLw%3D%3D'; /*Service Key*/
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('12'); /**/
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
    queryParams += '&' + encodeURIComponent('MobileOS') + '=' + encodeURIComponent('ETC'); /**/
    queryParams += '&' + encodeURIComponent('MobileApp') + '=' + encodeURIComponent('AppTest'); /**/
    queryParams += '&' + encodeURIComponent('arrange') + '=' + encodeURIComponent('P'); /**/
    queryParams += '&' + encodeURIComponent('listYN') + '=' + encodeURIComponent('Y'); /**/
    queryParams += '&' + encodeURIComponent('areaCode') + '=' + encodeURIComponent(areacode); /**/
    queryParams += '&' + encodeURIComponent('sigunguCode') + '=' + encodeURIComponent(sicode);/**/
    queryParams += '&' + encodeURIComponent('benikia') + '=' + encodeURIComponent(''); /**/
    queryParams += '&' + encodeURIComponent('goodStay') + '=' + encodeURIComponent(''); /**/
    xhr.open('GET', url + queryParams);
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            var xml = this.responseXML;
            var title = xml.getElementsByTagName('title');
            var addr = xml.getElementsByTagName('addr1');
            var image = xml.getElementsByTagName('firstimage');
            var contentId = xml.getElementsByTagName('contentid');
            var contentTypeId=xml.getElementsByTagName('contenttypeid');
            var rh = document.createElement('h3');
            document.querySelector('.stay_result_box').appendChild(rh);
            var min = Math.min(title.length,image.length,addr.length);
            rh.innerHTML = "찾은 업체수 : " + min;
            for(var i=0; i<min; i++){
                var sdiv = document.createElement('div');
                var imagebox = document.createElement('img');
                var rh1 = document.createElement('h3');
                var rh2 = document.createElement('h4');
                var rh3 = document.createElement('h5');
                var rh4 = document.createElement('h6');
                rhref = document.createElement('a');
                sdiv.setAttribute('data-value',i+1);
                document.querySelector('.stay_result_box').appendChild(sdiv);
                imagebox.setAttribute('src',image[i].innerHTML);
                rh1.innerHTML = title[i].innerHTML;
                rh2.innerHTML = addr[i].innerHTML; 
                rh3.innerHTML = contentId[i].innerHTML;
                rh4.innerHTML = contentTypeId[i].innerHTML; 
                rhref.setAttribute('href',"./result.html?" +rh3.innerHTML);
                document.querySelectorAll('.stay_result_box div')[i].appendChild(imagebox);
                document.querySelectorAll('.stay_result_box div')[i].appendChild(rh1);
                document.querySelectorAll('.stay_result_box div')[i].appendChild(rh2);
                document.querySelectorAll('.stay_result_box div')[i].appendChild(rh3);
                document.querySelectorAll('.stay_result_box div')[i].appendChild(rh4);
                document.querySelectorAll('.stay_result_box div')[i].appendChild(rhref);
            }
        }
    };

    xhr.send('');
}
   
