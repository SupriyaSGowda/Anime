import { useEffect } from "react";

export default function ChatbotLoader() {
  useEffect(() => {
    const s = document.createElement("script");
    s.src = "https://buildmyagent.io/widget/68fa207badd1ed8670375604/widget-professional.js?widgetId=68fa207badd1ed8670375604";
    s.async = true;
    document.body.appendChild(s);
    return () => { s.remove(); };
  }, []);
  return null;
}
