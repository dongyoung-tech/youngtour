var link = window.location.search;
link = link.replace(/[^0-9]/g,'');
function contentapi(a){
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
    queryParams += '&' + encodeURIComponent('mapinfoYN') + '=' + encodeURIComponent('Y');
    queryParams += '&' + encodeURIComponent('areacodeYN') + '=' + encodeURIComponent('Y');
    queryParams += '&' + encodeURIComponent('overviewYN') + '=' + encodeURIComponent('Y'); /**/
    queryParams += '&' + encodeURIComponent('contentId') + '=' + encodeURIComponent(a) /**/
    xhr.open('GET', url + queryParams);
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            var xml = this.responseXML;
            var title = xml.getElementsByTagName('title');
            var view = xml.getElementsByTagName('overview');
            var image = xml.getElementsByTagName('firstimage');
            var contenttype = xml.getElementsByTagName('contenttypeid')[0].innerHTML;
            var contentid = xml.getElementsByTagName('contentid')[0].innerHTML;
            var area = xml.getElementsByTagName('mapx');
            var area2 = xml.getElementsByTagName('mapy');
            addr = xml.getElementsByTagName('addr1')[0].innerHTML;
            document.querySelector('title').innerHTML = "여행지 > " +title[0].textContent;
            if(contenttype == 32){
                document.querySelector('title').innerHTML = "숙박 > " +title[0].textContent;
            }
            if(title.length < 1){
                alert('검색결과가없습니다');
                aldiv.innerHTML ="검색결과 가 없습니다";
            }
            document.querySelector(".main_topic p").innerHTML = view[0].textContent;
            if(image.length > 0){
                document.querySelector('.intro_img').style.backgroundImage = "url(" + image[0].innerHTML + ")";
            }
            else if(image.length == 0){
                document.querySelector('.intro_img').classList.add("after");
                document.querySelector('.intro_img').innerHTML ="죄송합니다 해당 여행지는 사진이 없습니다";
            }
            document.querySelector(".main_name").innerHTML = title[0].innerHTML;
            document.querySelector(".main_addr").innerHTML = addr;
            detailimage(contentid,contenttype);
            if(area.length>0){
                areacode(area[0].innerHTML,area2[0].innerHTML);
            }
        }
    };

    xhr.send('');

}
contentapi(link);
function detailimage(a,b){
    var xhr = new XMLHttpRequest();
    var url = 'http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailImage'; /*URL*/
    var queryParams = '?' + encodeURIComponent('serviceKey') + '='+'yX8wx5nzKb42wtBThegyX7gb6G3xUCPCMfbzNYF1Gf0p0nSUn9ZeynPzokq9GNLvrFLmqQVbU9%2FQz9LckJpQLw%3D%3D'; /*Service Key*/
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /**/
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
    queryParams += '&' + encodeURIComponent('MobileOS') + '=' + encodeURIComponent('ETC'); /**/
    queryParams += '&' + encodeURIComponent('MobileApp') + '=' + encodeURIComponent('AppTest'); /**/
    queryParams += '&' + encodeURIComponent('contentId') + '=' + encodeURIComponent(a); /**/
    queryParams += '&' + encodeURIComponent('contentTypeId') + '=' + encodeURIComponent(b); /**/
    queryParams += '&' + encodeURIComponent('imageYN') + '=' + encodeURIComponent('Y'); /**/
    queryParams += '&' + encodeURIComponent('subImageYN') + '=' + encodeURIComponent('Y'); /**/
    xhr.open('GET', url + queryParams);
    xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
        var xml = this.responseXML;
        imgurl = xml.getElementsByTagName('originimgurl');
        var image = document.createElement('img');
        if(imgurl.length != 0){
            for(var i =0; i<imgurl.length; i++){
                var img = document.createElement('img');
                img.setAttribute("src",imgurl[i].innerHTML);
                document.querySelector('.photo_box').appendChild(img);
            }
            image.setAttribute('src',imgurl[0].innerHTML);
        }
        else{
            document.querySelector('.photo_box').classList.add('after');
        }
        document.querySelector('.photo_container').appendChild(image);
        detailapi(a,b);
    }
};
xhr.send('');
}


function detailapi(a,b){
    var xhr = new XMLHttpRequest();
    var url = 'http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailInfo'; /*URL*/
    var queryParams = '?' + encodeURIComponent('serviceKey') + '='+'yX8wx5nzKb42wtBThegyX7gb6G3xUCPCMfbzNYF1Gf0p0nSUn9ZeynPzokq9GNLvrFLmqQVbU9%2FQz9LckJpQLw%3D%3D'; /*Service Key*/
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /**/
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
    queryParams += '&' + encodeURIComponent('MobileOS') + '=' + encodeURIComponent('ETC'); /**/
    queryParams += '&' + encodeURIComponent('MobileApp') + '=' + encodeURIComponent('AppTest'); /**/
    queryParams += '&' + encodeURIComponent('are') + '=' + encodeURIComponent('1'); /**/
    queryParams += '&' + encodeURIComponent('contentId') + '=' + encodeURIComponent(a);
    queryParams += '&' + encodeURIComponent('contentTypeId') + '=' + encodeURIComponent(b);
    queryParams += '&' + encodeURIComponent('detailYN') + '=' + encodeURIComponent("Y");
    xhr.open('GET', url + queryParams);
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            var xml = this.responseXML;
            var infoname = xml.getElementsByTagName('infoname');
            var infotext = xml.getElementsByTagName('infotext');
            var contenttype = b;
            if( contenttype != 32){
                for(var i=0; i<infotext.length; i++){
                    Dspan = document.createElement('span');
                    Ddiv = document.createElement('dl');
                    Dspan.innerHTML = infoname[i].innerHTML;
                    Ddiv.innerHTML = infotext[i].textContent;
                    document.querySelector('.main_inner').appendChild(Dspan);
                    document.querySelector('.main_inner').appendChild(Ddiv);
                }
                var title = document.querySelector('.main_name').innerHTML;
                mapapi(addr,title);
            }
            else if( contenttype== 32){
                stayapi(a,contenttype);
            }
        }
    };

    xhr.send('');
}
function stayapi(a,b){
        var xhr = new XMLHttpRequest();
        var url = 'http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailIntro'; /*URL*/
        var queryParams = '?' + encodeURIComponent('serviceKey') + '='+'yX8wx5nzKb42wtBThegyX7gb6G3xUCPCMfbzNYF1Gf0p0nSUn9ZeynPzokq9GNLvrFLmqQVbU9%2FQz9LckJpQLw%3D%3D'; /*Service Key*/
        queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /**/
        queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
        queryParams += '&' + encodeURIComponent('MobileOS') + '=' + encodeURIComponent('ETC'); /**/
        queryParams += '&' + encodeURIComponent('MobileApp') + '=' + encodeURIComponent('AppTest'); /**/
        queryParams += '&' + encodeURIComponent('are') + '=' + encodeURIComponent('1'); /**/
        queryParams += '&' + encodeURIComponent('contentId') + '=' + encodeURIComponent(a);
        queryParams += '&' + encodeURIComponent('contentTypeId') + '=' + encodeURIComponent(b);
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
                        document.querySelector('.main_inner').appendChild(Dspan);
                        document.querySelector('.main_inner').appendChild(Ddiv);
                    }
                    var dspan = document.querySelectorAll('.main_inner span');
                    var ddiv = document.querySelectorAll('.main_inner dl');
                    dspan[0].innerHTML = "전화번호";
                    dspan[1].innerHTML = "방 타입";
                    dspan[2].innerHTML = "구비시설";
                    ddiv[0].innerHTML = infotext[0].innerHTML;
                    ddiv[1].innerHTML = intype[0].innerHTML;
                    ddiv[2].innerHTML = infoplace[0].innerHTML;
                    
                }
                var title = document.querySelector('.main_name').innerHTML;
                mapapi(addr,title);
            }
        };
    
        xhr.send('');
    }


function mapapi(ddr,title){
    var rh3 = document.createElement('h3');
    rh3.innerHTML ="위치";
    var map = document.createElement('div');
    map.setAttribute('id','map');
    document.querySelector('.main_inner').appendChild(rh3);
    document.querySelector('.main_inner').appendChild(map);
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



var imgurl = "";
var iwidth = 0;
document.querySelectorAll('.navi_btn')[0].addEventListener('click',function(){
    var imgcon = imgurl;
    iwidth = iwidth + 1;
    if (iwidth > imgurl.length-1){
        iwidth = 0;
    }
    document.querySelector('.photo_container img').setAttribute("src",imgcon[iwidth].innerHTML);
});
document.querySelectorAll('.navi_btn')[1].addEventListener('click',function(){
    var imgcon = imgurl;
    iwidth = iwidth -1;
    if (iwidth < 0){
        iwidth = imgcon.length-1;
    }
    document.querySelector('.photo_container img').setAttribute("src",imgcon[iwidth].innerHTML);
});

document.querySelector('.background_overlay').addEventListener('click',function(){
    document.querySelector('.background_overlay').style.display= "none";  
    document.querySelector('.photo_detail').style.display= "none";  
});

document.querySelector('.photo_box').addEventListener('click',function(){
    document.querySelector('.background_overlay').style.display= "block";  
    document.querySelector('.photo_detail').style.display= "block";  
});

document.querySelector('.photo_btn').addEventListener('click',function(){
    document.querySelector('.background_overlay').style.display= "block";  
    document.querySelector('.photo_detail').style.display= "block";  
});


function areacode(a,b){
    var xhr = new XMLHttpRequest();
    var url = 'http://api.visitkorea.or.kr/openapi/service/rest/KorService/locationBasedList'; /*URL*/
    var queryParams = '?' + encodeURIComponent('serviceKey') + '='+'yX8wx5nzKb42wtBThegyX7gb6G3xUCPCMfbzNYF1Gf0p0nSUn9ZeynPzokq9GNLvrFLmqQVbU9%2FQz9LckJpQLw%3D%3D'; /*Service Key*/
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('5'); /**/
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
    queryParams += '&' + encodeURIComponent('MobileOS') + '=' + encodeURIComponent('ETC'); /**/
    queryParams += '&' + encodeURIComponent('MobileApp') + '=' + encodeURIComponent('AppTest'); /**/
    queryParams += '&' + encodeURIComponent('arrange') + '=' + encodeURIComponent('s'); /**/
    queryParams += '&' + encodeURIComponent('contentTypeId') + '=' + encodeURIComponent('12'); /**/
    queryParams += '&' + encodeURIComponent('mapX') + '=' + encodeURIComponent(a); /**/
    queryParams += '&' + encodeURIComponent('mapY') + '=' + encodeURIComponent(b); /**/
    queryParams += '&' + encodeURIComponent('radius') + '=' + encodeURIComponent('10000'); /**/
    queryParams += '&' + encodeURIComponent('listYN') + '=' + encodeURIComponent('Y'); /**/
    queryParams += '&' + encodeURIComponent('modifiedtime') + '=' + encodeURIComponent(''); /**/
    xhr.open('GET', url + queryParams);
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            var xml = this.responseXML;
            var image = xml.getElementsByTagName('firstimage');
            var title = xml.getElementsByTagName('title');
            var contentid = xml.getElementsByTagName('contentid');
            for(var i=0; i<image.length-1; i++){
                rhref = document.createElement('a');
                rdiv = document.createElement('div');
                document.querySelector(".recommend_box").appendChild(rdiv);
                document.querySelectorAll(".recommend_box div")[i].appendChild(rhref);
            }
            for(var i=1; i<image.length; i++){
                rh = document.createElement('span');
                rdiv = document.createElement('span');
                dimage = document.createElement('img');
                rh.innerHTML = title[i].innerHTML;
                rdiv.innerHTML = i;
                document.querySelectorAll(".recommend_box div a")[i-1].setAttribute('href',"./result.html?" + contentid[i].innerHTML);
                document.querySelectorAll(".recommend_box div")[i-1].appendChild(dimage);
                document.querySelectorAll(".recommend_box div img")[i-1].setAttribute('src',image[i].innerHTML);
                document.querySelectorAll(".recommend_box div")[i-1].appendChild(rh);
                document.querySelectorAll(".recommend_box div")[i-1].appendChild(rdiv);
            }
        }
    };

    xhr.send('');
}