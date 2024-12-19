import { useEffect } from "react";

const useScrollToTop = ({ x = 0, y = 0, behavior = "smooth" } = {}) => {
  useEffect(() => {
    window.scrollTo({ top: y, left: x, behavior });
  }, [x, y, behavior]);
};

export default useScrollToTop;
