import React, { useState, useEffect } from "react";
// import { number } from "yargs";

/**
 * @param {number} endTime timestamp
 * @returns {
 *   onStart: ()=>void;
 *   onStop: ()=>void;
 *   value: string;
 *   isActive: boolean;
 * }
 */

// 小於 10 的數字補個 0 在前面 
// eg: 1 => '01'
function addZero(value) {
  return (value < 10) ? `0${value}` : value;
}

// 把 "dd:hh:mm:ss" 字串轉成 number
function valueToTimeString(timestamp) {
  let day = Math.floor(timestamp / 86400);
  let hour = Math.floor((timestamp % 86400) / 3600);
  let min = Math.floor((timestamp % 86400) % 3600 / 60);
  let sec = Math.floor(timestamp % 60);
  let stringFormat = `${addZero(day)}:${addZero(hour)}:${addZero(min)}:${addZero(sec)}`;

  return stringFormat
}

// number 轉成 "dd:hh:mm:ss" 格式
function timeStringToValue(timeString) {
  // split 方法 return => ["dd", "hh", "mm", "ss"]
  let timeArray = timeString.split(':');

  let day = timeArray[0] / 1;
  let hour = timeArray[1] / 1;
  let min = timeArray[2] / 1;
  let sec = timeArray[3] / 1;
  let timestamp = 86400 * day + 3600 * hour + 60 * min + sec;

  return timestamp
}

function useCountdown(endTime) {
  // 題目要求回傳的 value 是 string type
  // 在這邊把 endTime 與當前的時間差轉成 string type 再用 useState 設定初始值給 value
  let subTime = (endTime - Date.now()) / 1000;
  let timeString = valueToTimeString(subTime);

  const [value, setValue] = useState(timeString);
  const [isActive, setActive] = useState(true);

  useEffect(() => {
    let timeId = -1;

    if (isActive) {
      timeId = setInterval(() => {
        setValue((prev) => {
          // string 轉換成 number - 1 sec 後，再轉回 string
          return valueToTimeString(timeStringToValue(prev) - 1)
        })
      }, 1000);
    }

    return () => {
      clearInterval(timeId);
    }

  }, [isActive])

  const onStart = () => {
    setActive(true);
  };

  const onStop = () => {
    setActive(false);
  };

  return {
    value,
    onStart,
    onStop,
    isActive
  };
}

export default useCountdown
