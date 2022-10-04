import Image from "next/image";

interface LogoProps {
  width?: string;
  height?: string;
}

const Logo = (props?: LogoProps): JSX.Element => {
  return (
    <Image
      priority
      alt="logo"
      src={"/imgs/logo.svg"}
      width={props?.width || "100%"}
      height={props?.height || "100%"}
    />
  );
};

export default Logo;
