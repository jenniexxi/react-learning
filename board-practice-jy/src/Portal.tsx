import ReactDom from "react-dom";

const Portal = ({ children }: { children: JSX.Element }) => {
  const el = document.getElementById("portal");

  return ReactDom.createPortal(children, el!);
};

export default Portal;
