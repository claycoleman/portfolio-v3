import { useEffect, useCallback, useRef } from "react";

// React hook for delaying calls with time
// returns callback to use for cancelling

export const useTimeout = (
  callback, // function to call. No args passed.
  // if you create a new callback each render, then previous callback will be cancelled on render.
  timeout = 0, // delay, ms (default: immediately put into JS Event Queue)
) => {
  const timeoutIdRef = useRef();
  const cancel = useCallback(() => {
    const timeoutId = timeoutIdRef.current;
    if (timeoutId) {
      timeoutIdRef.current = undefined;
      clearTimeout(timeoutId);
    }
  }, [timeoutIdRef]);

  useEffect(() => {
    timeoutIdRef.current = setTimeout(callback, timeout);
    return cancel;
  }, [callback, timeout, cancel]);

  return cancel;
};

export const useEffectOnce = (func) => {
  useEffect(func, []);
};
