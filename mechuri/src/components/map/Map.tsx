'use client';

import { useEffect, useState } from 'react';
import Search from './Search';
import SearchPlace from './SearchPlace';
import { useSetRecoilState } from 'recoil';
import { currentLatState, currentLngState } from '@/stores/atoms/mapState';
import Image from 'next/image';
import { Suspense } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

export default function Map() {
  const [map, setMap] = useState<any>(null);
  const [marker, setMarker] = useState<any>(null);
  const setCurrentLat = useSetRecoilState(currentLatState);
  const setCurrentLng = useSetRecoilState(currentLngState);
  const [isSearchFolder, setIsSearchFolder] = useState<boolean>(true);
  const [showSearch, setShowSearch] = useState<boolean>(false);

  // TODO: 서버와 카카오 맵 API가 통신할 수 있게 수정해서 클라이언트에서 API-KEY 숨기기
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
          setCurrentLat(position.coords.latitude);
          setCurrentLng(position.coords.longitude);

          const imageSrc =
            'https://velog.velcdn.com/images/cjjss11/post/ade41643-e7d0-4914-be5a-ac64d0d7f151/image.png';
          const imageSize = new window.kakao.maps.Size(64, 69);
          const imageOption = { offset: new window.kakao.maps.Point(27, 69) };
          const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

          if (map === null) {
            // 지도 생성
            const mapContainer = document.getElementById('map'); // 지도를 표시할 div
            const mapOption = {
              center: latlng, // 지도의 중심 좌표
              level: 3, // 지도의 확대 레벨
            };

            const newMap = new window.kakao.maps.Map(mapContainer, mapOption);
            setMap(newMap);
            // 결과값을 마커로 표시
            // 마커 처음 생성하는 곳
            const newMarker = new window.kakao.maps.Marker({
              position: latlng,
              image: markerImage,
            });
            // 지도의 중심을 결과값으로 받은 위치로 이동
            newMarker.setMap(newMap);
            setMarker(newMarker);
          } else {
            map.setCenter(latlng);

            if (marker) {
              marker.setMap(null);
            }
            // 현재 위치 버튼 클릭 시 마커 생성하는 곳
            const newMarker = new window.kakao.maps.Marker({
              position: latlng,
              image: markerImage,
            });
            newMarker.setMap(map);
            setMarker(newMarker);
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

  const searchAddress = (address: string) => {
    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.addressSearch(address, function (result: any, status: any) {
      if (status === window.kakao.maps.services.Status.OK) {
        const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
        map.setCenter(coords);

        if (marker) {
          marker.setMap(null);
        }
        const newMarker = new window.kakao.maps.Marker({
          position: coords,
        });
        newMarker.setMap(map);
        setMarker(newMarker);

        // const infowindow = new window.kakao.maps.InfoWindow({
        //   content: '<div style="width:150px;text-align:center;padding:6px 0;">검색 결과</div>',
        // });
        // infowindow.open(map, marker);
      } else {
        console.error('Geocode was not successful for the following reason: ' + status);
      }
    });
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const toggleSearchPlace = () => {
    setIsSearchFolder(!isSearchFolder);
  };

  return (
    <div className="relative w-screen h-[calc(100vh-4rem)]">
      <div id="map" className="w-full h-full overflow-hidden"></div>
      {isSearchFolder ? (
        <button
          onClick={toggleSearchPlace}
          className="absolute z-10 top-1/2 left-1/3 h-16 bg-white"
        >
          <Image src="/images/left.png" alt="접기" width={40} height={40}></Image>
        </button>
      ) : (
        <button onClick={toggleSearchPlace} className="absolute z-10 top-1/2 left-0 h-16 bg-white">
          <Image src="/images/right.png" alt="펼치기" width={40} height={40}></Image>
        </button>
      )}
      {/* </button> */}
      {/* {isSearchFolder && (
        <div className="bg-[#fff] w-1/3 h-full overflow-y-auto flex-grow absolute top-0 left-0 z-10 ">
          <SearchPlace map={map}></SearchPlace>
        </div>
      )} */}

      <div
        className={`bg-[#fff] w-1/3 h-full overflow-y-auto flex-grow absolute top-0 left-0 z-10 ${isSearchFolder ? '' : 'hidden'}`}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <SearchPlace map={map}></SearchPlace>
        </Suspense>
      </div>

      <div className="absolute bottom-16 right-6 z-10">
        <button onClick={toggleSearch} className="p-2 bg-white rounded-md shadow-lg">
          <Image src="/images/searchIcon.png" alt="아이콘 이미지" width={30} height={30}></Image>
        </button>
      </div>
      {showSearch && (
        <div className="absolute bottom-16 right-20 z-10">
          <Search onSearch={searchAddress}></Search>
        </div>
      )}
      <div className="absolute bottom-3 right-6 z-10 ">
        <button onClick={setCurrentLocation} className="p-2 bg-white rounded-md shadow-lg">
          <Image src="/images/current.png" alt="currentLocation" width={30} height={30}></Image>
        </button>
      </div>
    </div>
  );
}
