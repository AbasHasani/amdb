import { useEffect } from "react";

const useBodyLock = (isOpen: boolean) => {
  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `120px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
  }, [isOpen]);
};


export default useBodyLock