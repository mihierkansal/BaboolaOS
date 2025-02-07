import { JSX } from "solid-js/jsx-runtime";
import { Dock } from "./Dock";

const LOCAL_STORAGE_KEY = "-bab-settings";

interface Settings {
  /**Relative URL like /src/assets/Wallpapers/AbstractBlue1.webp or DataURL */
  wallpaper: string;
  dockHeight: number;
  timeSeconds: boolean;
  darkMode: boolean;
  avatar: string;
}

const DEFAULT_SETTINGS: Settings = {
  wallpaper: "/src/assets/Wallpapers/AbstractBlue1.webp",
  dockHeight: 50,
  timeSeconds: false,
  darkMode: false,
  avatar: "/src/assets/UserImages/purpleflower.jpg",
};
export function getSettings(): Settings {
  const fromLS = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) ?? "{}");
  let final: any = {};
  Object.keys(DEFAULT_SETTINGS).forEach((key) => {
    DEFAULT_SETTINGS["wallpaper"];
    if (fromLS[key]) {
      final[key] = fromLS[key];
    } else {
      final[key] = DEFAULT_SETTINGS[key as keyof typeof DEFAULT_SETTINGS];
    }
  });

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(final));
  return final as Settings;
}
export function getColors() {
  const settings = getSettings();
  const metalBg = settings.darkMode
    ? "linear-gradient(to bottom, #222222, #555555,  #555555, #222222, #222222)"
    : "linear-gradient(to bottom, #dddddd, #aaaaaa,  #aaaaaa, #dddddd, #dddddd)";
  const insetShadow =
    "inset -4px -4px 9px #bbbbbb, inset 4px 4px 9px #00000084";
  const glass: Partial<JSX.CSSProperties> = {
    "box-shadow":
      "0 5px 9px #00000045, inset 0 0 9px grey, inset 0 6px 0 #ffffff48",
    "border-radius": "15px",
  };

  return {
    metalBg,
    insetShadow,
    glass,
  };
}
export function setSettings(newSettings: Partial<Settings>) {
  const existingSettings = getSettings();
  localStorage.setItem(
    LOCAL_STORAGE_KEY,
    JSON.stringify({
      ...existingSettings,
      ...newSettings,
    })
  );
}

export function Desktop() {
  const settings = getSettings();
  return (
    <>
      <img
        style={{
          "object-fit": "cover",
        }}
        src={settings.wallpaper}
      />
      <Dock />
    </>
  );
}
