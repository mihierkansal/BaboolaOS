import { JSX } from "solid-js/jsx-runtime";

export function ContextMenu(props: {
  x: number;
  y: number;
  children: string | Element | JSX.Element;
}) {
  return (
    <>
      <div
        style={{
          left: `${props.x}px`,
          top: `${props.y}px`,
          position: "fixed",
          background:
            "linear-gradient(to bottom, #333333, #333333 10%, #555555 13%, #555555 20%, #333333 25%)",
        }}
      >
        {props.children}
      </div>
    </>
  );
}

export function ContextMenuOption(props: {
  children: string | Element | JSX.Element;
}) {
  return (
    <>
      <div>{props.children}</div>
    </>
  );
}
