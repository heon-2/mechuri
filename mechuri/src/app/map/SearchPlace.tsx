'use client';

import React from 'react';
import { useState, useEffect } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

interface PlaceSearchProps {
  map: any;
}

export default function ({ map }: PlaceSearchProps) {
  const [markers, setMarkers] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>(null);

  useEffect(() => {
    if (!map) return;

    const place = new window.kakao.maps.services.Places();
    // const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });

    const SearchPlace = () => {
      const keyword = (document.getElementById('keyword') as HTMLInputElement).value;

      if (!keyword.replace(/^\s+|\s+$/g, '')) {
        alert('키워드를 입력해주세요');
        return;
      }
      place.keywordSearch(keyword, placeSearchCB);
    };

    const placeSearchCB = (data: any, status: any, pagination: any) => {
      if (status === window.kakao.maps.services.Status.OK) {
        displayPlaces(data);
        setPagination(pagination);
        displayPagination(pagination);
      } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
        alert('검색 결과가 존재하지 않습니다.');
      } else if (status === window.kakao.maps.services.Status.ERROR) {
        alert('검색 결과 중 오류가 발생했습니다.');
      }
    };

    const displayPlaces = (places: any[]) => {
      const listElement = document.getElementById('placeList');
      //   const menuElement = document.getElementById('menu_wrap');
      const bounds = new window.kakao.maps.LatLngBounds();

      removeAllChildNodes(listElement);
      removeMarker();

      const newMarkers = places.map((place: any, i: number) => {
        const placePosition = new window.kakao.maps.LatLng(place.y, place.x);
        const marker = addMarker(placePosition, i, place.place_name);
        bounds.extend(placePosition);

        if (listElement) {
          const itemElement = document.createElement('li');
          itemElement.textContent = place.place_name;
          listElement.appendChild(itemElement);
        }
        return marker;
      });

      setMarkers(newMarkers);
      map.setBounds(bounds);
    };

    const addMarker = (position: any, idx: number, title: string) => {
      const imageSrc =
        'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png';
      const imageSize = new window.kakao.maps.Size(36, 37);
      const imgOptions = {
        spriteSize: new window.kakao.maps.Size(36, 691),
        spriteOrigin: new window.kakao.maps.Point(0, idx * 46 + 10),
        offset: new window.kakao.maps.Point(13, 37),
      };
      const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions);
      const marker = new window.kakao.maps.Marker({
        position,
        image: markerImage,
      });

      marker.setMap(map);
      //   return marker;
      markers.push(marker);
    };

    const removeMarker = () => {
      markers.forEach((marker) => marker.setMap(null));
      setMarkers([]);
    };

    const removeAllChildNodes = (parent: Element | null) => {
      while (parent && parent.firstChild) {
        parent.removeChild(parent.firstChild);
      }
    };

    const displayPagination = (pagination: any) => {
      const paginationElement = document.getElementById('pagination');
      removeAllChildNodes(paginationElement);

      const divElement = document.createElement('div');
      divElement.className = 'join';

      for (let i = 1; i <= pagination.last; i++) {
        const buttonElement = document.createElement('button');
        buttonElement.textContent = i.toString();
        buttonElement.className = 'join-item btn btn-sm';

        if (i === pagination.current) {
          buttonElement.classList.add('btn-active');
        }

        buttonElement.onclick = (e) => {
          e.preventDefault();
          pagination.gotoPage(i);
        };
        paginationElement?.appendChild(buttonElement);
      }
    };

    document.getElementById('searchBtn')?.addEventListener('click', SearchPlace);

    return () => {
      document.getElementById('searchBtn')?.removeEventListener('click', SearchPlace);
    };
  }, [map, markers]);

  return (
    <div>
      <label className="input input-bordered flex items-center gap-2 w-[500px]">
        <input type="text" id="keyword" className="grow" placeholder="키워드를 입력해주세요" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          id="searchBtn"
          className="w-4 h-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </label>
      <ul id="placeList"></ul>
      <div id="pagination"></div>
    </div>
  );
}
