import { parseInitData } from "./lib/parser";

const App = () => {
  const webApp = (window as any).WebApp;
  console.log(webApp)

  const initData = parseInitData(webApp.initDataManager.rawInitData);

  const user = initData?.user;

  return (
    <>
        {user && (
            <div>
                <h1>Hello {user?.first_name} {user?.last_name}</h1>
                <img src={user.photo_url} alt="your avatar" />
            </div>
        )}
    </>
  );
};

export default App;
