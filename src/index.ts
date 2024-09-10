/**
 * starts the application by opening the panel
 */
async function init() {
  miro.board.ui.on('icon:click', async () => {
    await miro.board.ui.openPanel({url: 'panel.html'});
  });
}

/**
 * opens the visualization modal
 */
export async function openVisModal() {
  await miro.board.ui.openModal({
    url: "vis-modal.html",
    fullscreen: true,
  });
}

/**
 * opens the help modal
 */
export async function openHelpModal() {
  await miro.board.ui.openModal({
    url: "help-modal.html",
    fullscreen: true,
  });
}


init();