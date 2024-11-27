import { useState, useEffect } from "react";

function useDebounce(value: any, delay = 1000) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set up the timeout
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up the timeout if value changes
    return () => clearTimeout(timeoutId);
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
