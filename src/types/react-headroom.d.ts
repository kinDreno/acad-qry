declare module "react-headroom" {
  import { ComponentType, ReactNode } from "react";

  interface HeadroomProps {
    upTolerance?: number;
    downTolerance?: number;
    onPin?: () => void;
    onUnpin?: () => void;
    style?: React.CSSProperties;
    children?: ReactNode;
  }

  const Headroom: ComponentType<HeadroomProps>;
  export default Headroom;
}
