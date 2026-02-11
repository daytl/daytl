import { useRedirect } from "@/utils/redirect";
import Head from "next/head";

const Redirect = () => {
  useRedirect();
  return (
    <Head>
      <meta name="robots" content="noindex, nofollow" />
    </Head>
  );
};

export default Redirect;
