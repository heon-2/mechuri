'use client';

import { currentLatState, currentLngState } from '@/stores/atoms/mapState';
import React from 'react';
import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

// declare global {
//   interface Window {
//     kakao: any;
//   }
// }

interface PlaceSearchProps {
  map: any;
}

interface PlaceProps {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
}

export default function SearchPlace({ map }: PlaceSearchProps) {
  const [keywordInput, setKeywordInput] = useState<string>('');
  const [places, setPlaces] = useState<PlaceProps[]>([]);
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [markers, setMakrers] = useState<any[]>([]);
  const currentLat = useRecoilValue(currentLatState);
  const currentLng = useRecoilValue(currentLngState);
  const searchParams = useSearchParams();
  const search = searchParams.get('search');
  const [selectedMarker, setSelectedMarker] = useState<any>(null);
  const [infoWindow, setInfoWindow] = useState<any>(null);

  useEffect(() => {
    if (search && currentLat && currentLng) {
      setKeywordInput(search);
      handleSearch(search);
    }
  }, [search, currentLat, currentLng]);

  const handleSearch = async (keyword: string = keywordInput) => {
    const url = `https://dapi.kakao.com/v2/local/search/keyword?query=${keyword}&page=${currentPage}&size=${pageSize}&x=${currentLng}&y=${currentLat}&radius=${10000}`;
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_RESTAPI_APIKEY}`,
        },
      });
      if (!response.ok) {
        throw new Error('Data could not be fetched');
      }
      const jsonResponse = await response.json();
      const data: PlaceProps[] = jsonResponse.documents;
      setPlaces(data);
      console.log(jsonResponse);
      console.log(data);
      const totalItems = jsonResponse.meta.pageable_count;
      setTotalPage(Math.ceil(totalItems / pageSize));
    } catch (error) {
      console.log(error);
    }
    //   fetch(url, {
    //     method: 'GET',
    //     headers: {
    //       Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_RESTAPI_APIKEY}`,
    //     },
    //   })
    //     .then((response) => {
    //       if (response.ok) {
    //         return response.json();
    //       }
    //       throw new Error('Network response was not ok.');
    //     })
    //     .then((data) => {
    //       console.log(data.documents);
    //       setPlaces(data.documents);
    //     })
    //     .catch((error) => {
    //       console.error('에러', error);
    //     });
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    handleSearch();
  }, [search, currentPage]);

  useEffect(() => {
    displayMarkers();
  }, [places]);

  const resetMarkerAndInfoWindow = () => {
    if (selectedMarker) {
      selectedMarker.setImage(
        new window.kakao.maps.MarkerImage(
          'https://velog.velcdn.com/images/cjjss11/post/4f2f52d8-e6b8-4d14-a8d6-4ea2b0a73f67/image.png',
          new window.kakao.maps.Size(43, 45),
        ),
      );
    }
    if (infoWindow) {
      infoWindow.close();
    }
    setSelectedMarker(null);
    setInfoWindow(null);
  };

  const handlePlaceClick = (place: any) => {
    resetMarkerAndInfoWindow(); // 이전 마커와 인포윈도우를 초기화합니다.

    // 새로운 마커와 인포윈도우를 설정합니다.
    const selectedPlaceMarker = markers.find((m) => m.getTitle() === place.place_name);
    if (selectedPlaceMarker) {
      selectedPlaceMarker.setImage(
        new window.kakao.maps.MarkerImage(
          'https://velog.velcdn.com/images/cjjss11/post/4f2f52d8-e6b8-4d14-a8d6-4ea2b0a73f67/image.png',
          new window.kakao.maps.Size(60, 63),
        ),
      );

      const infoWindowContent = `
      <div style="padding:10px; white-space:nowrap;">
        <div style="font-size:16px; font-weight:bold;">${place.place_name}</div>
        <div style="font-size:12px; margin-top:4px;">${place.road_address_name || place.address_name}</div>
      </div>
    `;

      const newInfoWindow = new window.kakao.maps.InfoWindow({
        content: infoWindowContent,
      });
      newInfoWindow.open(map, selectedPlaceMarker);

      setSelectedMarker(selectedPlaceMarker);
      setInfoWindow(newInfoWindow);
    }
  };

  const displayMarkers = () => {
    markers.forEach((marker) => marker.setMap(null));
    if (infoWindow) {
      infoWindow.close();
    }

    const newMarkers = places.map((place) => {
      const position = new window.kakao.maps.LatLng(place.y, place.x);
      const imageSrc =
        'https://velog.velcdn.com/images/cjjss11/post/4f2f52d8-e6b8-4d14-a8d6-4ea2b0a73f67/image.png';
      const imageSize = new window.kakao.maps.Size(43, 45);
      const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);

      const marker = new window.kakao.maps.Marker({
        position: position,
        map: map,
        image: markerImage,
        title: place.place_name,
      });

      // window.kakao.maps.event.addListener(marker, 'click', () => {
      //   if (selectedMarker) {
      //     selectedMarker.setImage(markerImage);
      //   }

      //   marker.setImage(
      //     new window.kakao.maps.MarkerImage(imageSrc, new window.kakao.maps.Size(60, 63)),
      //   );

      //   const content = `<div style="padding:5px;font-size:12px;">${place.place_name}</div>`;
      //   if (!infoWindow) {
      //     const newInfoWindow = new window.kakao.maps.InfoWindow({
      //       content: content,
      //     });
      //     setInfoWindow(newInfoWindow);
      //     newInfoWindow.open(map, marker);
      //   } else {
      //     infoWindow.setContent(content);
      //     infoWindow.open(map, marker);
      //   }
      //   setSelectedMarker(marker);
      // });

      return marker;
    });

    setMakrers(newMarkers);

    if (newMarkers.length > 0) {
      const bounds = new window.kakao.maps.LatLngBounds();
      newMarkers.forEach((marker) => bounds.extend(marker.getPosition()));
      map.setBounds(bounds);
    }
  };

  // const [markers, setMarkers] = useState<any[]>([]);
  // const [pagination, setPagination] = useState<any>(null);

  // useEffect(() => {
  //   if (!map) return;

  //   const place = new window.kakao.maps.services.Places();
  //   // const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });

  //   const SearchPlace = () => {
  //     const keyword = (document.getElementById('keyword') as HTMLInputElement).value;

  //     if (!keyword.replace(/^\s+|\s+$/g, '')) {
  //       alert('키워드를 입력해주세요');
  //       return;
  //     }
  //     place.keywordSearch(keyword, placeSearchCB);
  //   };

  //   const placeSearchCB = (data: any, status: any, pagination: any) => {
  //     if (status === window.kakao.maps.services.Status.OK) {
  //       displayPlaces(data);
  //       setPagination(pagination);
  //       displayPagination(pagination);
  //     } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
  //       alert('검색 결과가 존재하지 않습니다.');
  //     } else if (status === window.kakao.maps.services.Status.ERROR) {
  //       alert('검색 결과 중 오류가 발생했습니다.');
  //     }
  //   };

  //   const displayPlaces = (places: any[]) => {
  //     const listElement = document.getElementById('placeList');
  //     //   const menuElement = document.getElementById('menu_wrap');
  //     const bounds = new window.kakao.maps.LatLngBounds();

  //     removeAllChildNodes(listElement);
  //     removeMarker();

  //     const newMarkers = places.map((place: any, i: number) => {
  //       const placePosition = new window.kakao.maps.LatLng(place.y, place.x);
  //       const marker = addMarker(placePosition, i, place.place_name);
  //       bounds.extend(placePosition);

  //       if (listElement) {
  //         const itemElement = document.createElement('li');
  //         itemElement.textContent = place.place_name;
  //         listElement.appendChild(itemElement);
  //       }
  //       return marker;
  //     });

  //     setMarkers(newMarkers);
  //     map.setBounds(bounds);
  //   };

  //   const addMarker = (position: any, idx: number, title: string) => {
  //     const imageSrc =
  //       'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png';
  //     const imageSize = new window.kakao.maps.Size(36, 37);
  //     const imgOptions = {
  //       spriteSize: new window.kakao.maps.Size(36, 691),
  //       spriteOrigin: new window.kakao.maps.Point(0, idx * 46 + 10),
  //       offset: new window.kakao.maps.Point(13, 37),
  //     };
  //     const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions);
  //     const marker = new window.kakao.maps.Marker({
  //       position,
  //       image: markerImage,
  //       title: title,
  //     });

  //     marker.setMap(map);
  //     return marker;
  //     // markers.push(marker);
  //   };

  //   const removeMarker = () => {
  //     markers.forEach((marker) => marker.setMap(null));
  //     setMarkers([]);
  //   };

  //   const removeAllChildNodes = (parent: Element | null) => {
  //     while (parent && parent.firstChild) {
  //       parent.removeChild(parent.firstChild);
  //     }
  //   };

  //   const displayPagination = (pagination: any) => {
  //     const paginationElement = document.getElementById('pagination');
  //     removeAllChildNodes(paginationElement);

  //     const divElement = document.createElement('div');
  //     divElement.className = 'join';

  //     for (let i = 1; i <= pagination.last; i++) {
  //       const buttonElement = document.createElement('button');
  //       buttonElement.textContent = i.toString();
  //       buttonElement.className = 'join-item btn btn-sm';

  //       if (i === pagination.current) {
  //         buttonElement.classList.add('btn-active');
  //       }

  //       buttonElement.onclick = (e) => {
  //         e.preventDefault();
  //         pagination.gotoPage(i);
  //       };
  //       paginationElement?.appendChild(buttonElement);
  //     }
  //   };

  //   document.getElementById('searchBtn')?.addEventListener('click', SearchPlace);

  //   return () => {
  //     document.getElementById('searchBtn')?.removeEventListener('click', SearchPlace);
  //   };
  // }, [map, markers]);

  return (
    <div className="flex flex-col h-full">
      {/* <div className="bg-gray-300 w-full h-full flex flex-col items-center"> */}
      <div className="flex justify-center mt-5 mb-5 sticky top-0 z-10">
        <label className="input input-bordered flex items-center gap-2 w-5/6 border-2 border-mainColor">
          <input
            type="text"
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="grow"
            placeholder="키워드를 입력해주세요"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-6 h-6 opacity-70 cursor-pointer"
            onClick={() => handleSearch}
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </div>

      <div className="flex-grow overflow-auto">
        <table className="table w-full">
          {/* head */}
          <tbody>
            {places.map((place, index) => (
              <tr
                key={index}
                className="align-top hover:bg-gray-200"
                onClick={() => handlePlaceClick(place)}
              >
                {/* <Link href={place.place_url}> */}
                <td className="py-3">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="text-2xl text-mainColor">{place.place_name}</div>
                    <div className="text-md mt-1">{place.category_name.split('>').pop()}</div>
                  </div>
                  <div className="flex gap-1">
                    <div>{place.road_address_name}</div>
                    <div className="font-bold">({place.distance}m)</div>
                  </div>
                  <div>(지번){place.address_name}</div>
                  <div>{place.phone}</div>
                </td>
                {/* </Link> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="join mt-5 mb-4 flex justify-center sticky bottom-0 z-10">
        {Array.from({ length: totalPage }, (_, i) => (
          <button
            key={i + 1}
            className={`join-item btn btn-sm ${currentPage === i + 1 ? 'bg-mainColor text-white' : ''}`}
            onClick={() => handleChangePage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        {/* </div> */}
      </div>
      {/* <ul>
        {places.map((place, index) => (
          <li key={index}>
            <div>{place.place_name}</div>
            <div>{place.address_name}</div>
          </li>
        ))}
      </ul> */}
      {/* <ul id="placeList" className="mt-2"></ul>
      <div id="pagination" className="mt-2"></div> */}
    </div>
  );
}
