'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

export default function Map() {
  useEffect(() => {
    const mapScript = document.createElement('script');
    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_APIKEY}&autoload=false&libraries=services,clusterer,drawing`;
    document.head.appendChild(mapScript);

    const onLoadKaKaoMap = () => {
      window.kakao.maps.load(() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              // 지도 생성
              const mapContainer = document.getElementById('map'), // 지도를 표시할 div
                mapOption = {
                  center: new window.kakao.maps.LatLng(
                    position.coords.latitude,
                    position.coords.longitude,
                  ), // 지도의 중심 좌표
                  level: 3, // 지도의 확대 레벨
                };

              const map = new window.kakao.maps.Map(mapContainer, mapOption);
              const markerPosition = new window.kakao.maps.LatLng(
                position.coords.latitude,
                position.coords.longitude,
              );

              // 결과값을 마커로 표시
              const marker = new window.kakao.maps.Marker({
                // map: map,
                position: markerPosition,
              });
              // 지도의 중심을 결과값으로 받은 위치로 이동
              marker.setMap(map);
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
      });
    };
    mapScript.addEventListener('load', onLoadKaKaoMap);

    return () => mapScript.removeEventListener('load', onLoadKaKaoMap);
  }, []);

  return <div id="map" className="w-[500px] h-[400px]"></div>;
}
