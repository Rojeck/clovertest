import { FC, ReactNode } from "react";
import ReactDOM from "react-dom";

interface PortalProps {
  children: ReactNode;
}

const Portal: FC<PortalProps> = ({ children }) => {
  const node = document.createElement("div") as HTMLElement;
  document.body.appendChild(node);
  return ReactDOM.createPortal(children, node);
};

export default Portal;
