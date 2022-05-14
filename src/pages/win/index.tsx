import ResultTop from "components/ResultTop";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

function Win(): JSX.Element {
  return <ResultTop isWin={true} />;
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale || "", ["common"])),
  },
});

export default Win;
