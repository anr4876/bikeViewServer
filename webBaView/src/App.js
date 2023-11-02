/*global kakao*/
import React, { useState,useEffect } from "react";
import { Map, MapMarker, MapTypeId, } from "react-kakao-maps-sdk";
import PopupView from "./PopupView";
import axios from 'axios';

//분리
import { positions } from "./data"

const App = () => {
  
  const mapTypeIds = [kakao.maps.MapTypeId.BICYCLE];
  const [mapAddress, setMapAddress] = useState(null);
  const [mapText, setMapText] = useState(null);
  // const [mapWidth, setMapWidth] = useState("0");
  const [mapCenterLat, setMapCenterLat] = useState(null);
  const [mapCenterLng, setMapCenterLng] = useState(null);
  const [mapTitle, setMapTitle] = useState(null);
  const [mapImgs, setMapImgs] = useState(null);
  // 클릭한 마커 정보를 저장할 상태 추가

  const [latPosition, setLatPosition] = useState(null);
  const [lngPosition, setLngPosition] = useState(null);

  //팝업 화면 보임/숨김 여부
  const [isPopupVisible, setPopupVisible] = useState(false);

  // 타슈
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatPosition(latitude);
          setLngPosition(longitude);
        },
        (error) => {
          console.error("현재 위치를 가져오는 중 에러 발생:", error);
        }
      );
    } else {
      console.error("이 브라우저에서는 Geolocation을 지원하지 않습니다.");
    }
    const fetchData = async () => {
      try {
        // API 엔드포인트 URL
        const apiUrl = "http://localhost:3000"; // 여기에 백엔드 서버의 URL을 넣어주세요.

        // Axios를 사용하여 데이터 가져오기
        const response = await axios.get(apiUrl);

        // 가져온 데이터 설정
        setData(response.data.data);
        
        // 로딩 상태 업데이트
        setLoading(false);
        
      } catch (error) {
        // 에러 발생 시 처리
        setError(error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }



  // 마커를 클릭할 때 호출되는 함수
  const handleMarkerClick = (mlat, mlng, title, imgs, address, text) => {
    // 클릭한 마커의 정보를 상단에 표시하고, 해당 마커의 좌표로 지도의 중심 좌표를 설정
    setMapCenterLat(mlat);
    setMapCenterLng(mlng);
    setMapTitle(title);
    setMapAddress(address);
    setMapText(text);
    // setMapWidth("95%");
    setMapImgs(imgs.split("@"));
    setPopupVisible(true);
  };



  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        position: "relative",
      }}
    >
      <Map
        center={{ lat: mapCenterLat === null ? latPosition : mapCenterLat , lng : mapCenterLng === null ? lngPosition : mapCenterLng}}
        style={{ width: "100%", height: "100%", zIndex: 0 }}
        level={3}
      >
        {latPosition !== null && lngPosition !== null && (
          <MapMarker position={{ lat: latPosition, lng: lngPosition }} />
        )}

        {data.map((item,index) => {

          return (<MapMarker
          key = {index}
          position={{lat: item.x_pos, lng: item.y_pos}}
          image = {{
            src: "https://upload.wikimedia.org/wikipedia/commons/5/55/BicycleMarkerSymbol.png",
            size: {
              width: 36,
              height: 47,
            },
          }}/> );
        })}
      
        {positions.map((position, index) => (
          <MapMarker
          key={`${position.title}-${position.latlng}-${position.img}-${position.imgs}`}
          position={position.latlng}
          image={{
            src: position.img,
            size: {
              width: 250,
              height: 139,
            },
            
          }}
          onClick={() =>
            handleMarkerClick(
              position.latlng.lat,
              position.latlng.lng,
              position.title,
              position.imgs,
              position.address,
              position.text
              )
            }
            title={position.title}
            ></MapMarker>
            ))}

        {mapTypeIds.map((mapTypeId) => (
          <MapTypeId key={mapTypeId} type={mapTypeId} />
          ))}
      </Map>

      <PopupView
        style={{
          position: "absolute",
          bottom: "1.5rem",
          width: "94%",
          left: "3%",
          height: "43%"
        }}
        title={mapTitle}
        images={mapImgs}
        address={mapAddress}
        description={mapText}
        isVisible={isPopupVisible}
        onCloseClicked={() => setPopupVisible(s => !s)}
       />
    </div>
  );
};

export default App;
