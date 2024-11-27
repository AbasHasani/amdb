import { useState, useEffect } from "react";
// {
//   type = "page",
//   touch = true,
//   resetOnWindowBlur = false,
// }: {
//   type?: string;
//   touch?: boolean;
//   resetOnWindowBlur?: boolean;
// }

export function useMouse(options: {
  type?: string;
  touch?: boolean;
  resetOnWindowBlur?: boolean;
}) {
  // const { type = "page" } = options;
  // console.log(type);

  const { type = "page", touch = true, resetOnWindowBlur = false } = options;

  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [sourceType, setSourceType] = useState("mouse");

  useEffect(() => {
    const handleMouseMove = (event: any) => {
      const { pageX, pageY, clientX, clientY } = event;

      setCoords({
        x: type === "page" ? pageX : clientX,
        y: type === "page" ? pageY : clientY,
      });
      setSourceType("mouse");
    };

    const handleTouchMove = (event: any) => {
      if (!touch) return;

      const { pageX, pageY, clientX, clientY } = event.touches[0];

      setCoords({
        x: type === "page" ? pageX : clientX,
        y: type === "page" ? pageY : clientY,
      });
      setSourceType("touch");
    };

    const handleWindowBlur = () => {
      if (resetOnWindowBlur) {
        setCoords({ x: 0, y: 0 });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);

    if (resetOnWindowBlur) {
      window.addEventListener("blur", handleWindowBlur);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);

      if (resetOnWindowBlur) {
        window.removeEventListener("blur", handleWindowBlur);
      }
    };
  }, [type, touch, resetOnWindowBlur]);

  return {
    x: coords.x,
    y: coords.y,
    sourceType,
  };
}
