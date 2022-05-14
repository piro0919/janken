import styles from "./style.module.scss";
import { Button } from "reactstrap";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

export type ResultTopProps = {
  isWin: boolean;
};

function ResultTop({ isWin }: ResultTopProps): JSX.Element {
  const router = useRouter();
  const { t } = useTranslation("common");

  return (
    <div className={styles.wrapper}>
      <h1>{isWin ? t("あなたの勝ちです！") : t("あなたの負けです…")}</h1>
      <div className={styles.buttonsWrapper}>
        <Button
          color="primary"
          onClick={() => {
            router.push("/game");
          }}
        >
          {t("再戦する")}
        </Button>
        <Button
          color="primary"
          onClick={() => {
            router.push("/");
          }}
        >
          {t("トップページへ")}
        </Button>
      </div>
    </div>
  );
}

export default ResultTop;
