import { useState } from "react";

const useLocalStorage = (item, initialValue = null) => {
  const itemValue =
    initialValue !== null ? initialValue : window.localStorage.getItem(item);
  const [value, setValue] = useState(itemValue);

  const set = (newValue) => {
    setValue(() => {
      window.localStorage.setItem(item, newValue);
      return newValue;
    });
  };
  return [value, set];
};

export default useLocalStorage;
