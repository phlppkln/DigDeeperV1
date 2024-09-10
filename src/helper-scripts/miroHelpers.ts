export const showInfoNotification = async (notificationMessage: string) => {
    await miro.board.notifications.showInfo(notificationMessage);
  };
