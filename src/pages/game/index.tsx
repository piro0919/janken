import GameTop from "components/GameTop";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

function Game(): JSX.Element {
  return <GameTop />;
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale || "", ["common"])),
  },
});

export default Game;
