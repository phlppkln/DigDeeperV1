async function init() {
  miro.board.ui.on('icon:click', async () => {
    await miro.board.ui.openPanel({url: 'app.html'});
  });
}

export async function openModal() {
  console.log("openModal")
  await miro.board.ui.openModal({
    url: "modal.html",
    fullscreen: true,
  });
}

init();
