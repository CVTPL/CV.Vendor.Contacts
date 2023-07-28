import * as React from "react";
import { ICommonLoaderProps } from "./ICommonLoaderProps";
import { RotatingLines } from "react-loader-spinner";
import { ITheme, getTheme } from "office-ui-fabric-react";

/* Sharepoint Theme Color Get & Set Color in Variable Relative Code Start */
const theme: ITheme = getTheme();
const themeColor = theme.palette.themePrimary;
/* Sharepoint Theme Color Get & Set Color in Variable Relative Code End */

const CommonLoader: React.FunctionComponent<ICommonLoaderProps> = (props) => {
  return (
    <>
      {/* <BallTriangle height={100} width={100} radius={5} color="#5F9BE7" ariaLabel="ball-triangle-loading" visible={visibleLoader} /> */}
      <RotatingLines strokeColor={themeColor} strokeWidth="5" animationDuration="0.75" width="100" visible={props.visibleLoader} />
    </>
  );
};

export default CommonLoader;
