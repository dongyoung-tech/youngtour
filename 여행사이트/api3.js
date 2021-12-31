function contentapi(contentid,b,callback){
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
            document.querySelector('.detail_topic').appendChild(img);
            document.querySelector('.detail_topic').appendChild(rh);
            document.querySelector('.detail_topic').appendChild(rh2);
            callback(contentid,b,ddr,title[0].innerHTML);
        }
    };

    xhr.send('');
}

function detail(){
        var rediv = document.querySelectorAll('.result_page div');
        var length = rediv.length;
        var rh1 =document.querySelectorAll('.result_page div h5');
        var rh2 =document.querySelectorAll('.result_page div h6');
        for(var i =  0; i<length; i++){
            rediv[i].addEventListener('click',function(event){
                var num = event.target.getAttribute('data-value');
                document.querySelector('.detail_page').style.display='block';
                document.querySelector('.delete_btn').style.display="block";
                document.querySelector('.background_overlay').style.display="inline-block";
                var a = rh1[num].innerHTML;
                var b= rh2[num].innerHTML;
                contentapi(a,b,detailapi);
            });
        } 
    document.querySelector('.delete_btn').addEventListener('click',function(){
        var node = document.querySelector('#map');
        document.querySelector('.detail_page').removeChild(node);
        document.querySelector('.detail_page').style.display="none";
        document.querySelector('.delete_btn').style.display='none';
        document.querySelector('.background_overlay').style.display="none";
        while(document.querySelector('.detail_topic').hasChildNodes()){
            document.querySelector('.detail_topic').removeChild(document.querySelector('.detail_topic').firstChild);
        }
        while(document.querySelector('.detail_inner').hasChildNodes()){
            document.querySelector('.detail_inner').removeChild(document.querySelector('.detail_inner').firstChild);
        }

    });
    if(document.querySelector('.result_page').childElementCount = 1){
        clearInterval(loop);
    }
    
}

document.querySelector('.search_btn2').addEventListener('click',function(){ 
    loop = setInterval(detail,1000);
});

document.querySelector('.search_btn').addEventListener('click',function(){
    loop = setInterval(detail,1000);

});


/*-------------------반복정보 조회---------------------- */

function detailapi(contentid,contenttype,addr,title){
    var xhr = new XMLHttpRequest();
    var url = 'http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailInfo'; /*URL*/
    var queryParams = '?' + encodeURIComponent('serviceKey') + '='+'yX8wx5nzKb42wtBThegyX7gb6G3xUCPCMfbzNYF1Gf0p0nSUn9ZeynPzokq9GNLvrFLmqQVbU9%2FQz9LckJpQLw%3D%3D'; /*Service Key*/
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /**/
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
    queryParams += '&' + encodeURIComponent('MobileOS') + '=' + encodeURIComponent('ETC'); /**/
    queryParams += '&' + encodeURIComponent('MobileApp') + '=' + encodeURIComponent('AppTest'); /**/
    queryParams += '&' + encodeURIComponent('are') + '=' + encodeURIComponent('1'); /**/
    queryParams += '&' + encodeURIComponent('contentId') + '=' + encodeURIComponent(contentid);
    queryParams += '&' + encodeURIComponent('contentTypeId') + '=' + encodeURIComponent(contenttype);
    queryParams += '&' + encodeURIComponent('detailYN') + '=' + encodeURIComponent("Y");
    xhr.open('GET', url + queryParams);
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            var xml = this.responseXML;
            var infoname = xml.getElementsByTagName('infoname');
            var infotext = xml.getElementsByTagName('infotext');
            if(infoname.length>=1){
                for(var i=0; i<infotext.length; i++){
                    Dspan = document.createElement('span');
                    Ddiv = document.createElement('dl');
                    Dspan.innerHTML = infoname[i].innerHTML;
                    Ddiv.innerHTML = infotext[i].textContent;
                    document.querySelector('.detail_inner').appendChild(Dspan);
                    document.querySelector('.detail_inner').appendChild(Ddiv);
                }
            }
            mapapi(addr,title);
        }
    };

    xhr.send('');
}


function mapapi(ddr,title){
    var map = document.createElement('div');
    map.setAttribute('id','map');
    document.querySelector('.detail_page').appendChild(map);
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

