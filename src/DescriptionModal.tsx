import { useEffect } from "react";
import { createRoot } from "react-dom/client";

const DescriptionModal = () => {
  useEffect(() => {}, []);

  const closeModal = async () => {
    await miro.board.ui.closeModal();
  };

  return (
    <div className="description-modal-container">
      <div className="description-modal-content">
        <h1>DigDeeper</h1>
        <p>
          Traditional brainstorming, problem-solving, collaborating, or
          response-gathering techniques are often limited when truly expressing
          ourselves. In many situations words alone do not have the power to
          accurately describe our perspectives, thoughts, and ideas to others.
          DigDeeper lets you harness the potential of an infinite canvas,
          empowering individuals and teams to express themselves in new
          explorative way. It gives participants the freedom to articulate their
          perspectives using a two-axis plane that challenges conventional
          thinking. This approach encourages participants to express themselves
          by spatial positioning of notes. It helps individuals and groups find
          and visualize ideas, opinions, and perspectives with the infinite
          canvas.
        </p>
        <p>
          DigDeeper offers the ability to visualize and analyze spatial
          relationships on the plane, facilitating a deeper understanding of the most important
          areas. This creates a dynamic and immersive way to explore
          different perspectives and helps you to identify key insights,
          patterns, and trends. You can use DigDeeper to explore and quickly
          pinpoint the most crucial aspects of your discussions, interviews, or
          brainstorming sessions. Furthermore, DigDeeper enables you to export 
          the data, to explore it in your favorite tool as well.
        </p>
        <h2>Layout</h2>
        <p>
          <strong>
            The most important things summed up:
            <ul>
              <li>
                Each question is represented by a frame and belongs to exactly
                one participant.
              </li>
              <li>
                You can create as many participants and questions as you want.
              </li>
              <li>Each response is represented by a note.</li>
              <li>
                Only sticky notes and their placement on the plane will be
                included in the analysis.
              </li>
            </ul>
          </strong>
        </p>
        <h3>Question Plane</h3>
        <p>
          Each plane is represented by a frame. The title of the frame
          identifies the participant and the question. It must include a
          participant identifier, followed by a colon and the question
          identifier. The title must be in the format{" "}
          <em>&lt;PersonId&gt;: &lt;QuestionId&gt;</em>
        </p>
        <p>
          You can create a template frame with DigDeeper as well, to make things clearer. However, the most basic frame
          looks like this:
        </p>
        <div className="center-content">
          <img
            className="image-description"
            src={"./src/assets/setup-frame.png"}
          />
        </div>
        <p>
          It is possible to add other Miro items to the frame, such as
          rectangles, images, etc. to customize the frame and question. These
          items will be ignored and thus not included in the data analysis.{" "}
          <strong>
            BUT, use sticky notes only for peoples responses that you want to
            analyze.
          </strong>
        </p>

        <h2>Instructions</h2>
        <p>
          First you want to decide on the questions you want to ask. Then you
          create a frame for each question and participant.
        </p>
        <p>
          As the questioning begins, you may want to introduce the format to the participants.
          They should only use sticky notes to add an answer to the frames question. 
          Then they place the notes on the plane, to further express themselves along the two axis.
        </p>
        <p>
          After the questioning of all participants is done, you can start the analysis of the notes. You can explore the 
          perspective of participants directly in DigDeeper or export the data as a JSON file.
        </p>
        <button
          className="button button-primary button-right"
          type="button"
          onClick={closeModal}
        >
          Close Instructions
        </button>
      </div>
    </div>
  );
};

export default DescriptionModal;

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<DescriptionModal />);
}
