import { createSignal, JSX, onCleanup, Show } from "solid-js";
import { getColors as getStyles, getSettings } from "..";

export function Dock() {
  const settings = getSettings();
  const programsMenuOpen = createSignal(false);
  const datetime = createSignal(new Date());
  setInterval(() => {
    datetime[1](new Date());
  }, 1000);

  let programsmenu!: HTMLDivElement;
  const { metalBg, insetShadow, glass } = getStyles();
  return (
    <>
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100vw",
          background: metalBg,

          height: `${settings.dockHeight}px`,
          display: "flex",
          gap: "0.5rem",
        }}
      >
        <div
          style={{
            display: "grid",
            "place-items": "center",
            height: "100%",
            "aspect-ratio": "1",

            "box-shadow": programsMenuOpen[0]() ? "inset 0 0 9px black" : "",
          }}
          onClick={() => {
            programsMenuOpen[1]((v) => !v);
            if (programsMenuOpen[0]()) {
              programsmenu.focus();
            }
          }}
        >
          <img
            src="/src/assets/Icons/start.png"
            style={{
              height: `${settings.dockHeight * 0.6}px`,
            }}
          />
        </div>
        <div
          style={{
            "flex-grow": "1",
          }}
        ></div>
        <div
          style={{
            display: "grid",
            "place-items": "center",
            color: settings.darkMode ? "white" : "black",
            "padding-inline": "0.7rem",
          }}
        >
          <div>
            <div>
              {settings.timeSeconds
                ? datetime[0]().toLocaleTimeString()
                : datetime[0]().toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
            </div>
            <div
              style={{
                "text-align": "center",
                "font-size": "0.8rem",
              }}
            >
              {datetime[0]().toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
      <Show when={programsMenuOpen[0]()}>
        <div
          ref={programsmenu}
          tabIndex={0}
          onBlur={() => {
            programsMenuOpen[1](false);
          }}
          style={{
            position: "fixed",
            left: "5px",
            bottom: `${settings.dockHeight + 5}px`,
            height: "400px",
            width: "600px",
            outline: "none",
            "box-shadow": "0 0 9px #00000098",
            "border-radius": "9px",
            padding: "5px",
            display: "flex",
            gap: "5px",
            background: metalBg,
          }}
        >
          <div
            style={{
              "flex-grow": "1",
              "border-radius": "9px",
              "box-shadow": insetShadow,
            }}
          ></div>
          <div
            style={{
              "min-width": "150px",
              "border-radius": "9px",
              "box-shadow": insetShadow,
            }}
          >
            <div
              style={{
                display: "flex",
                width: "100%",
                "justify-content": "center",
                "margin-top": "-25px",
              }}
            >
              <div
                style={{
                  width: "fit-content",
                  height: "80px",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "80px",
                    "z-index": "1",
                    position: "relative",
                    ...glass,
                  }}
                ></div>
                <img
                  src={settings.avatar}
                  style={{
                    position: "relative",
                    height: "80px",
                    top: "-80px",
                    "z-index": "0",
                    "border-radius": "15px",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </Show>
    </>
  );
}
