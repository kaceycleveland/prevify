import { useEffect, useRef } from "react";
import { debounce } from "../../debounce";

export default function App() {
  const hoveredRef = useRef<HTMLElement>();
  useEffect(() => {
    console.log("content view loaded");

    const cb = debounce((e: MouseEvent) => {
      const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement;
      if (hoveredRef.current) {
        console.log('existing el', hoveredRef.current);
        hoveredRef.current.style.border = null;
      }
      hoveredRef.current = el;
      hoveredRef.current['data-prevify']= 'hover';
      hoveredRef.current.style.border = '2px solid red';
      console.log(el);
    }, 200);

    window.addEventListener('mousemove', cb);

    return () => {
      window.removeEventListener('mousemove', cb);
    }
  }, []);

  return <div className="content-view">content view</div>;
}
