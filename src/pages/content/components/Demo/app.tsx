import { useEffect, useRef, useState } from "react";
import { debounce } from "../../debounce";
import { supabase } from "../../../../utils/supabase.client";
import { Session } from "@supabase/supabase-js";

function messageReceived(msg: any) {
  console.log(msg);
  // Do your work here
  if (msg.session) {
    supabase.auth.setSession(msg.session as Session);
  }

  if (msg.session === null) {
    console.log("signing out...");
    supabase.auth.signOut();
  }
}
//for listening any message which comes from runtime
console.log("adding listener");
chrome.runtime.onMessage.addListener(messageReceived);

export default function App() {
  const hoveredRef = useRef<HTMLElement>();
  const [isEnabled, setIsEnabled] = useState(false);

  const [session, setSession] = useState<Session | null>(null);

  console.log(session);
  useEffect(() => {
    supabase.auth.onAuthStateChange((e, session) => {
      setSession(session);
    });
  }, []);

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
      console.log("removing event listener");
      if (hoveredRef.current) {
        console.log("existing el", hoveredRef.current);
        hoveredRef.current.style.border = null;
      }
      window.removeEventListener("mousemove", cb);
    }
  }, [isEnabled]);

  return <div className="content-view">content view</div>;
}
