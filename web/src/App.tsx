import { Typography } from "@maxhub/max-ui";
import { parseInitData } from "./lib/parser";
import NavBar from "./components/NavBar";

const App = () => {
  const webApp = (window as any).WebApp;
  console.log(webApp)

  const initData = parseInitData(webApp.initDataManager.rawInitData);

  return (
    <main>
        <Typography.Headline>Субсидии</Typography.Headline>
        <NavBar/>
    </main>
  );
};

export default App;
