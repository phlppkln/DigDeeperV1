/**
 * starts the application
 */
async function init() {
  miro.board.ui.on('icon:click', async () => {
    await miro.board.ui.openPanel({url: 'app.html'});
  });
}

/**
 * opens the visualization modal
 */
export async function openModal() {
  await miro.board.ui.openModal({
    url: "modal.html",
    fullscreen: true,
  });
}

/**
 * opens the description modal
 */
export async function openDescriptionModal() {
  await miro.board.ui.openModal({
    url: "modal-description.html",
    fullscreen: true,
  });
}


init();
