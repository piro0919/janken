import { useRouter } from "next/router";
import { useCallback } from "react";
import { Button } from "reactstrap";
import styles from "./style.module.scss";
import Toggle from "react-toggle";
import { useTranslation } from "next-i18next";
import usePwa from "use-pwa";

function Top(): JSX.Element {
  const { asPath, locale, pathname, query, ...router } = useRouter();
  const handleTransition = useCallback(() => {
    router.push("/game");
  }, [router]);
  const { t } = useTranslation("common");
  const handleChange = useCallback(() => {
    router.push({ pathname, query }, asPath, {
      locale: locale === "ja" ? "en" : "ja",
    });
  }, [asPath, locale, pathname, query, router]);
  const {
    appinstalled,
    canInstallprompt,
    enabledPwa,
    enabledUpdate,
    isPwa,
    showInstallPrompt,
    unregister,
  } = usePwa();
  const handleUpdate = useCallback(async () => {
    await unregister();

    window.location.reload();
  }, [unregister]);

  return (
    <div className={styles.wrapper}>
      <h1>{t("じゃんけん")}</h1>
      <div className={styles.buttonsWrapper}>
        <Button color="primary" onClick={handleTransition}>
          {t("スタート!")}
        </Button>
        {!appinstalled && canInstallprompt && enabledPwa && !isPwa ? (
          <Button color="primary" onClick={showInstallPrompt}>
            {t("インストール")}
          </Button>
        ) : null}
        {enabledUpdate && isPwa ? (
          <Button color="primary" onClick={handleUpdate}>
            {t("アップデート")}
          </Button>
        ) : null}
      </div>
      <div className={styles.toggleWrapper}>
        <Toggle
          checked={locale === "ja"}
          icons={{
            checked: <div className={styles.icon}>JP</div>,
            unchecked: <div className={styles.icon}>EN</div>,
          }}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default Top;
