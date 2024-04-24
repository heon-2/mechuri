import React from 'react';
export default function BottomContent() {
  return (
    <div className="flex flex-col h-[30vh] w-screen bg-backGroundColor  text-center font-bold">
      <hr className="mb-5"></hr>
      <div className="text-lg lg:text-3xl">메뉴 추천 리스트, 메추리</div>
      <div className="text-sm lg:text-xl">
        메추리는 여러분들에게 가볍게 메뉴 추천을 해주고자 만들었습니다.
      </div>
      <div className="text-sm lg:text-xl">
        서비스를 이용하시다가 불편한 점이 있었다면,
        <br /> 아래 남겨진 메일 중 한 곳으로 피드백을 남겨주세요.
        <br /> 더욱 발전하는 메추리가 되겠습니다.
      </div>
      <div className="font-bold">[ E-mail ]</div>
      <div>
        개발자1 : heonxyz@gmail.com
        <br />
        개발자2 : cjjss11@naver.com
      </div>
    </div>
  );
}
