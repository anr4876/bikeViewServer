import React, { useEffect } from "react";
import "./tashuView.css"; // 팝업에 대한 스타일을 정의한 CSS 파일

export default function TashuView({ add, pk, onCloseClicked, isVisible }) {
  useEffect(() => {
    if (isVisible) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [isVisible]);

  console.log(add)
  const classList = {
      "tashu-view": true,
      "hidden": !isVisible,
  };
  return (
    <div className={toggleClassList(classList)}>
      <div className="tashu-view-title">자세히 알아보기</div>
      <img src="./img/bikeman.png" alt=""/>
      <div className="tashu-view-address">{add}</div>
      <div className="tashu-view-description">남은개수: {pk}</div>
      <button className="tashu-view-btn" onClick={onCloseClicked}>닫기</button>
    </div>
  )
}

function toggleClassList(list) {
  let classList = [];
  for(const [k, v] of Object.entries(list)) {
      if(!!v) {
          classList.push(k);
      }
  }
  return classList.join(" ");
}
