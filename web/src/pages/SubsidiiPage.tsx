import { Typography } from "@maxhub/max-ui";
import { parseInitData } from "../lib/parser";

export default function SubsiddiPage() {
  const webApp = (window as any).WebApp;
  console.log(webApp)

  const initData = parseInitData(webApp.initDataManager.rawInitData);

  const _user = initData?.user;

  return (
    <Typography.Headline>Субсидии</Typography.Headline>
  );
};
