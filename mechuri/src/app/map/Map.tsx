'use client';

import { useEffect, useState } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

export default function Map() {
  const [map, setMap] = useState<any>(null);
  const [marker, setMarker] = useState<any>(null);

  useEffect(() => {
    const mapScript = document.createElement('script');
    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_APIKEY}&autoload=false&libraries=services,clusterer,drawing`;
    document.head.appendChild(mapScript);

    mapScript.onload = () => {
      window.kakao.maps.load(() => {
        setCurrentLocation();
      });
    };

    return () => {
      document.head.removeChild(mapScript);
    };
  }, []);

  const setCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latlng = new window.kakao.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude,
          );

          if (!map) {
            // 지도 생성
            const mapContainer = document.getElementById('map'); // 지도를 표시할 div
            const mapOption = {
              center: latlng, // 지도의 중심 좌표
              level: 3, // 지도의 확대 레벨
            };
            const newMap = new window.kakao.maps.Map(mapContainer, mapOption);
            setMap(newMap);
            // 결과값을 마커로 표시
            const newMarker = new window.kakao.maps.Marker({
              position: latlng,
            });
            // 지도의 중심을 결과값으로 받은 위치로 이동
            newMarker.setMap(newMap);
          } else {
            map.setCenter(latlng);
            if (marker) {
              marker.setPosition(latlng);
            } else {
              const newMarker = new window.kakao.maps.Marker({
                position: latlng,
              });
              newMarker.setMap(map);
              setMarker(newMarker);
            }
          }
        },
        (error) => {
          console.log(`${error.message}`);
        },
        {
          maximumAge: 60000,
          timeout: 5000,
          enableHighAccuracy: true,
        },
      );
    } else {
      console.log('geolocation을 사용할수 없어요');
    }
  };

  return (
    <div>
      <div id="map" style={{ width: '500px', height: '400px' }}></div>
      <button onClick={setCurrentLocation} className="mt-2 p-2 bg-blue-500 text-white">
        현재위치
      </button>
    </div>
  );
}
