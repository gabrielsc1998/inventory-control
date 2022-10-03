import NextHead from "next/head";

interface HeadProps {
  title: string;
}

const Head = (props: HeadProps): JSX.Element => {
  return (
    <NextHead>
      <title>{props.title}</title>
      <link rel="icon" type="image/png" href="/imgs/favicon.png" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </NextHead>
  );
};

export default Head;
