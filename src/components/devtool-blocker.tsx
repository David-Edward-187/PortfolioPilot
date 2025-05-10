"use client";

import * as React from 'react';

export function DevtoolBlocker() {
  React.useEffect(() => {
    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      // Disable F12
      if (event.key === "F12") {
        event.preventDefault();
      }

      // Disable Ctrl+Shift+I (Windows/Linux) or Cmd+Option+I (Mac)
      if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === "I") {
        event.preventDefault();
      }
      
      // Disable Ctrl+Shift+J (Windows/Linux) or Cmd+Option+J (Mac)
      if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === "J") {
        event.preventDefault();
      }

      // Disable Ctrl+Shift+C (Windows/Linux) or Cmd+Option+C (Mac)
       if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === "C") {
        event.preventDefault();
      }

      // Disable Ctrl+U
      if (event.ctrlKey && event.key === "U") {
        event.preventDefault();
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    // Optional: A more aggressive (and often annoying) approach to detect dev tools opening
    // This is generally not recommended due to false positives and user frustration.
    // const interval = setInterval(() => {
    //   const before = new Date().getTime();
    //   // eslint-disable-next-line no-debugger
    //   debugger;
    //   const after = new Date().getTime();
    //   if (after - before > 100) {
    //     // DevTools are open
    //     // You could redirect, show a message, etc.
    //     // This example just logs, but be careful with user experience here.
    //     console.warn("Developer tools detected. Please close them to continue.");
    //     // document.body.innerHTML = "Developer tools are not allowed on this page."; 
    //   }
    // }, 1000);


    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
      // clearInterval(interval);
    };
  }, []);

  return null; // This component does not render anything
}
