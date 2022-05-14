import { useEffect, useMemo, useState } from "react";
import { Button } from "reactstrap";
import styles from "./style.module.scss";
import { useBoolean, useCounter, useInterval } from "usehooks-ts";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

type Choice = "グー" | "チョキ" | "パー";

type Result = "勝ち" | "あいこ" | "負け";

function GameTop(): JSX.Element {
  const { locale, ...router } = useRouter();
  const { t } = useTranslation("common");
  const choices = useMemo<Choice[]>(
    () =>
      locale === "ja"
        ? [t("グー") as Choice, t("チョキ") as Choice, t("パー") as Choice]
        : [t("グー") as Choice, t("パー") as Choice, t("チョキ") as Choice],
    [locale, t]
  );
  const [myChoice, setMyChoise] = useState<Choice>();
  const [enemyChoice, setEnemyChoise] = useState<Choice>();
  const startWords = useMemo(
    () => t("startWords", { returnObjects: true }),
    [t]
  );
  const drawWords = useMemo(() => t("drawWords", { returnObjects: true }), [t]);
  const result = useMemo<Result | undefined>(() => {
    if (!myChoice || !enemyChoice) {
      return undefined;
    }

    if (myChoice === enemyChoice) {
      return "あいこ";
    }

    return (myChoice === t("グー") && enemyChoice === t("チョキ")) ||
      (myChoice === t("チョキ") && enemyChoice === t("パー")) ||
      (myChoice === t("パー") && enemyChoice === t("グー"))
      ? "勝ち"
      : "負け";
  }, [enemyChoice, myChoice, t]);
  const [words, setWords] = useState(startWords);
  const { count, increment, reset } = useCounter(0);
  const { value: isFirst, setFalse: offIsFirst } = useBoolean(true);

  useInterval(
    () => {
      increment();
    },
    words.length - 1 === count ? null : 2000
  );

  useEffect(() => {
    if (!result) {
      return;
    }

    if (result !== "あいこ") {
      setTimeout(() => {
        router.push(result === "勝ち" ? "/win" : "/lose");
      }, 2000);

      return;
    }

    setTimeout(() => {
      offIsFirst();
      setWords(drawWords);
      setMyChoise(undefined);
      setEnemyChoise(undefined);
      reset();
    }, 2000);
  }, [drawWords, offIsFirst, reset, result, router]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper2}>
        <span className={styles.player}>{t("相手")}</span>
        <div className={styles.buttonsWrapper}>
          {choices.map((choice) => (
            <Button
              color="primary"
              disabled={
                words.length - 1 !== count ||
                (enemyChoice && enemyChoice !== choice)
              }
              key={choice}
            >
              {choice}
            </Button>
          ))}
        </div>
      </div>
      <span>{result ? t(isFirst ? "ぽん！" : "しょ！") : words[count]}</span>
      <div className={styles.wrapper2}>
        <span className={styles.player}>{t("あなた")}</span>
        <div className={styles.buttonsWrapper}>
          {choices.map((choice) => (
            <Button
              color="primary"
              disabled={
                words.length - 1 !== count || (myChoice && myChoice !== choice)
              }
              key={choice}
              onClick={(): void => {
                setMyChoise(choice);
                setEnemyChoise(
                  choices[Math.floor(Math.random() * choices.length)]
                );
              }}
            >
              {choice}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GameTop;
