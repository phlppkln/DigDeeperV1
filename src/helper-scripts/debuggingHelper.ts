
const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

export const printAppMetaDataToConsole = async () => {
    //await getData();
    const appData = JSON.parse(await miro.board.getAppData("data"));
    await sleep(1000);
    console.log("print data state in app.tsx after AppData get: ", appData);
    console.log("print AppData in app.tsx: ", await miro.board.getAppData());
  };

export const printSelectionToConsole = async () => {
    const selection = await miro.board.getSelection();
    console.log("printSelection App: ", selection);
  };