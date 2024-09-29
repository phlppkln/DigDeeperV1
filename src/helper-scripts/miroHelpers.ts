export const showInfoNotification = async (notificationMessage: string) => {
    await miro.board.notifications.showInfo(notificationMessage);
  };


  export const saveQuestionsInAppData = async (questions: any) => {
    await miro.board.setAppData("appQuestions", JSON.stringify(questions));
  }

export const getQuestionsFromAppData = async () => {
  const questions = await miro.board.getAppData("appQuestions");
  return questions;
}