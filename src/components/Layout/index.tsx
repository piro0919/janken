import { CSSProperties, ReactNode, useEffect, useState } from "react";
import { useWindowSize } from "usehooks-ts";
import styles from "./style.module.scss";

export type LayoutProps = {
  children: ReactNode;
};

function Layout({ children }: LayoutProps): JSX.Element {
  const { height } = useWindowSize();
  const [style, setStyle] = useState<CSSProperties>();

  useEffect(() => {
    setStyle({ height });
  }, [height]);

  return (
    <div style={style}>
      <main className={styles.main}>{children}</main>
    </div>
  );
}

export default Layout;
