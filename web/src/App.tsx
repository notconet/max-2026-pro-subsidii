const App = () => {
  const webApp = (window as any).WebApp;
  console.log(webApp)

  return (
    <div>
        <span>{webApp.initDataManager.rawInitData}</span>
    </div>
  );
};

export default App;
