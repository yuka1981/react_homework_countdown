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

function addZero(value) {
  if (value < 10) {
    // 小於 10 的數字補個 0 在前面
    return `0${value}`
  }

  return value
}

// 把 "dd:hh:mm:ss" 字串轉成 second, second 轉成 "dd:hh:mm:ss" 格式
function timeFormat(timestamp) {
  if (typeof (timestamp) === 'string') {
    // split 方法 return => ["dd", "hh", "mm", "ss"]
    let timeArray = timestamp.split(':')

    let day = timeArray[0] / 1
    let hour = timeArray[1] / 1
    let min = timeArray[2] / 1
    let sec = timeArray[3] / 1
    let value = 86400 * day + 3600 * hour + 60 * min + sec

    return value
  }

  let day = Math.floor(timestamp / 86400)
  let hour = Math.floor((timestamp % 86400) / 3600)
  let min = Math.floor((timestamp % 86400) % 3600 / 60)
  let sec = Math.floor((timestamp % 86400) % 60)
  let value = `${addZero(day)}:${addZero(hour)}:${addZero(min)}:${addZero(sec)}`

  return value
}

function useCountdown(endTime) {
  // 題目要求回傳的 value 是 string type
  // 在這邊把 endTime 與當前的時間差轉成 string type 再用 useState 設定初始值給 value
  let subTime = (endTime - Date.now()) / 1000;
  let timeString = timeFormat(subTime)

  const [value, setValue] = useState(timeString);
  const [isActive, setActive] = useState(true);
  let timeId = -1;

  useEffect(() => {
    if (isActive) {
      timeId = setInterval(() => {
        setValue((prev) => {
          // string 轉換成 number - 1 sec 後，再轉回 string
          return timeFormat(timeFormat(prev) - 1)
        })
      }, 1000);
    }

    return () => {
      clearInterval(timeId);
    }

  }, [isActive])

  const onStart = () => {
    setActive(!isActive);
  };

  const onStop = () => {
    setActive(!isActive);
  };

  return {
    value,
    onStart,
    onStop,
    isActive
  };
}

export default useCountdown
