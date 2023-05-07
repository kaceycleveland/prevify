import React, { useCallback, useEffect, useState } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../../utils/supabase.client";
import { Session } from "@supabase/supabase-js";

const Options: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null);

  const handleLogout = useCallback(() => {
    supabase.auth.signOut();
  }, []);

  useEffect(() => {
    supabase.auth.onAuthStateChange((e, session) => {
      console.log(e, session);

      setSession(session);
      chrome.tabs.query({}, function (tabs) {
        tabs.forEach((tab) => {
          if (tab.id) {
            chrome.tabs.sendMessage(tab.id, { session }, function (response) {
              console.log("response", response);
            });
          }
        });
      });
    });
  }, []);

  return (
    <div>
      {session?.user.email ? (
        <div>
          Logged in as {session.user.email}{" "}
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
        />
      )}
    </div>
  );
};

export default Options;
