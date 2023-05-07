import { useEffect, useRef, useState } from "react";
import { debounce } from "../../debounce";

export default function App() {
  const hoveredRef = useRef<HTMLElement>();
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    console.log("content view loaded");
    function messageReceived(msg) {
      console.log(msg);
      // Do your work here
        setIsEnabled(msg.commenting);
    }
    //for listening any message which comes from runtime
    console.log("adding listener");
    chrome.runtime.onMessage.addListener(messageReceived);

    const cb = debounce((e: MouseEvent) => {
      const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement;
      if (hoveredRef.current) {
        console.log("existing el", hoveredRef.current);
        hoveredRef.current.style.border = null;
      }
      hoveredRef.current = el;
      hoveredRef.current["data-prevify"] = "hover";
      hoveredRef.current.style.border = "2px solid red";
      console.log(el);
    }, 200);

    if (isEnabled) {
      window.addEventListener("mousemove", cb);

      return () => {
        window.removeEventListener("mousemove", cb);
      };
    } else {
      console.log('removing event listener');
      if (hoveredRef.current) {
        console.log("existing el", hoveredRef.current);
        hoveredRef.current.style.border = null;
      }
      window.removeEventListener("mousemove", cb);
    }
  }, [isEnabled]);

  return <div className="content-view">content view</div>;
}
