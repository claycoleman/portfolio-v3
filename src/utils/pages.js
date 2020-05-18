const PAGE_BACKGROUNDS = {
  "/": `rgb(29, 153, 206)`,
  "/about": `rgb(16, 39, 59)`,
  // '/projects': `rgb(103, 196, 118)`,
  "/projects": `rgb(15, 56, 59)`,
  // '/travel': 'rgb(237, 181, 83)',
  // '/travel': 'rgb(48, 59, 15)',
  "/travel": "rgb(59, 51, 15)",
  "/spotify": "rgb(17, 60, 19)",
};

export const getPageBackground = (pageRoute) => {
  return PAGE_BACKGROUNDS[pageRoute] || "rgb(32, 118, 124)";
};

export const MAIN_MENU_LINKS = ["about", "projects", "spotify"]; // add travel back in later
