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
                sdiv.setAttribute('data-value',i+1);
                document.querySelector('.stay_result_box').appendChild(sdiv);
                imagebox.setAttribute('src',image[i].innerHTML);
                rh1.innerHTML = title[i].innerHTML;
                rh2.innerHTML = addr[i].innerHTML; 
                rh3.innerHTML = contentId[i].innerHTML;
                rh4.innerHTML = contentTypeId[i].innerHTML; 
                document.querySelectorAll('.stay_result_box div')[i].appendChild(imagebox);
                document.querySelectorAll('.stay_result_box div')[i].appendChild(rh1);
                document.querySelectorAll('.stay_result_box div')[i].appendChild(rh2);
                document.querySelectorAll('.stay_result_box div')[i].appendChild(rh3);
                document.querySelectorAll('.stay_result_box div')[i].appendChild(rh4);
            }
        }
    };

    xhr.send('');
}
   

function staycontentapi(contentid,b,callback){
    var xhr = new XMLHttpRequest();
    var url = 'http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailCommon'; /*URL*/
    var queryParams = '?' + encodeURIComponent('serviceKey') + '='+'yX8wx5nzKb42wtBThegyX7gb6G3xUCPCMfbzNYF1Gf0p0nSUn9ZeynPzokq9GNLvrFLmqQVbU9%2FQz9LckJpQLw%3D%3D'; /*Service Key*/
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('1'); /**/
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
    queryParams += '&' + encodeURIComponent('MobileOS') + '=' + encodeURIComponent('ETC'); /**/
    queryParams += '&' + encodeURIComponent('MobileApp') + '=' + encodeURIComponent('AppTest');
    queryParams += '&' + encodeURIComponent('firstImageYN') + '=' + encodeURIComponent('Y');
    queryParams += '&' + encodeURIComponent('defaultYN') + '=' + encodeURIComponent('Y');
    queryParams += '&' + encodeURIComponent('addrinfoYN') + '=' + encodeURIComponent('Y');
    queryParams += '&' + encodeURIComponent('overviewYN') + '=' + encodeURIComponent('Y'); /**/
    queryParams += '&' + encodeURIComponent('contentId') + '=' + encodeURIComponent(contentid); /**/
    xhr.open('GET', url + queryParams);
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            var xml = this.responseXML;
            var title = xml.getElementsByTagName('title');
            var view = xml.getElementsByTagName('overview');
            var image = xml.getElementsByTagName('firstimage');
            var ddr = xml.getElementsByTagName('addr1')[0].innerHTML;
            if(title.length < 1){
                alert('검색결과가없습니다');
                aldiv.innerHTML ="검색결과 가 없습니다";
            }
            rh = document.createElement('h3');
            img = document.createElement('img');
            rh2 = document.createElement('p');
            rh.innerHTML = title[0].innerHTML;
            rh2.innerHTML = view[0].textContent;
            img.setAttribute('src',image[0].innerHTML);
            document.querySelector('.stay_detail_topic').appendChild(img);
            document.querySelector('.stay_detail_topic').appendChild(rh);
            document.querySelector('.stay_detail_topic').appendChild(rh2);
            callback(contentid,b,ddr,title[0].innerHTML);
        }
    };

    xhr.send('');
}

function staydetail(){
    var rediv = document.querySelectorAll('.stay_result_page div');
    var length = rediv.length;
    var rh1 =document.querySelectorAll('.stay_result_page div h5');
    var rh2 =document.querySelectorAll('.stay_result_page div h6');
    for(var i =  0; i<length; i++){
        rediv[i].addEventListener('click',function(event){
            var num = event.target.getAttribute('data-value');
            document.querySelector('.stay_detail_page').style.display='block';
            document.querySelector('.stay_delete_btn').style.display="block";
            document.querySelector('.background_overlay').style.display="inline-block";
            var a = rh1[num-1].innerHTML;
            var b= rh2[num-1].innerHTML;
            staycontentapi(a,b,staydetailapi);
        });
    } 
    document.querySelector('.stay_delete_btn').addEventListener('click',function(){
        let node = document.querySelector('#map');
        document.querySelector('.stay_detail_page').removeChild(node);
        document.querySelector('.stay_detail_page').style.display="none";
        document.querySelector('.stay_delete_btn').style.display='none';
        document.querySelector('.background_overlay').style.display="none";
        while(document.querySelector('.stay_detail_topic').hasChildNodes()){
            document.querySelector('.stay_detail_topic').removeChild(document.querySelector('.stay_detail_topic').firstChild);
        }
        while(document.querySelector('.stay_detail_inner').hasChildNodes()){
            document.querySelector('.stay_detail_inner').removeChild(document.querySelector('.stay_detail_inner').firstChild);
        }
    });
    if(document.querySelector('.stay_result_page').childElementCount >=1){
        clearInterval(stayloop);
    }

}


document.querySelector('.stay_btn').addEventListener('click',function(){ 
    stayloop = setInterval(staydetail,1000);
});

function staydetailapi(contentid,contenttype,addr,title){
    var xhr = new XMLHttpRequest();
    var url = 'http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailIntro'; /*URL*/
    var queryParams = '?' + encodeURIComponent('serviceKey') + '='+'yX8wx5nzKb42wtBThegyX7gb6G3xUCPCMfbzNYF1Gf0p0nSUn9ZeynPzokq9GNLvrFLmqQVbU9%2FQz9LckJpQLw%3D%3D'; /*Service Key*/
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /**/
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
    queryParams += '&' + encodeURIComponent('MobileOS') + '=' + encodeURIComponent('ETC'); /**/
    queryParams += '&' + encodeURIComponent('MobileApp') + '=' + encodeURIComponent('AppTest'); /**/
    queryParams += '&' + encodeURIComponent('are') + '=' + encodeURIComponent('1'); /**/
    queryParams += '&' + encodeURIComponent('contentId') + '=' + encodeURIComponent(contentid);
    queryParams += '&' + encodeURIComponent('contentTypeId') + '=' + encodeURIComponent(contenttype);
    queryParams += '&' + encodeURIComponent('defaultYN') + '=' + encodeURIComponent('Y');
    queryParams += '&' + encodeURIComponent('introYN') + '=' + encodeURIComponent('Y');
    xhr.open('GET', url + queryParams);
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            var xml = this.responseXML;
            var infotext = xml.getElementsByTagName('infocenterlodging');
            var intype = xml.getElementsByTagName('roomtype');
            var infoplace = xml.getElementsByTagName('foodplace');
            if(infotext.length>=1){
                for(var i=0; i<3; i++){
                    Dspan = document.createElement('span');
                    Ddiv = document.createElement('dl');
                    document.querySelector('.stay_detail_inner').appendChild(Dspan);
                    document.querySelector('.stay_detail_inner').appendChild(Ddiv);
                }
                var dspan = document.querySelectorAll('.stay_detail_page span');
                var ddiv = document.querySelectorAll('.stay_detail_page dl');
                dspan[0].innerHTML = "전화번호";
                dspan[1].innerHTML = "방 타입";
                dspan[2].innerHTML = "구비시설";
                ddiv[0].innerHTML = infotext[0].innerHTML;
                ddiv[1].innerHTML = intype[0].innerHTML;
                ddiv[2].innerHTML = infoplace[0].innerHTML;
                
            }

            mapapi2(addr,title);
        }
    };

    xhr.send('');
}
function mapapi2(ddr,title){
    var map = document.createElement('div');
    map.setAttribute('id','map');
    document.querySelector('.stay_detail_page').appendChild(map);
    var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };  

// 지도를 생성합니다    
    var map = new kakao.maps.Map(mapContainer, mapOption); 

// 주소-좌표 변환 객체를 생성합니다
    var geocoder = new kakao.maps.services.Geocoder();

// 주소로 좌표를 검색합니다
    geocoder.addressSearch(ddr, function(result, status) {

    // 정상적으로 검색이 완료됐으면 
     if (status === kakao.maps.services.Status.OK) {

        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        // 결과값으로 받은 위치를 마커로 표시합니다
        var marker = new kakao.maps.Marker({
            map: map,
            position: coords
        });

        // 인포윈도우로 장소에 대한 설명을 표시합니다
        var infowindow = new kakao.maps.InfoWindow({
            content: '<div style="width:150px;text-align:center;padding:6px 0;">'+title+'</div>'
        });
        infowindow.open(map, marker);

        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
        map.setCenter(coords);
    } 
});    

}   