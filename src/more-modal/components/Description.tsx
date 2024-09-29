import React from 'react';

const Description: React.FC = () => {
  return (
    <div className="description-container">
      <h1>DigDeeper</h1>
      <p>
        DigDeeper is an innovative application designed to harness the power of an
        infinite canvas for gathering insights from participants through spatial positioning
        of sticky notes. By placing notes on a two-axis plane, participants can visually express
        their thoughts and ideas, helping you analyze spatial relationships to uncover key insights and trends.
      </p>
      <h2>Instructions</h2>
      <ul>
        <li>Each question is represented by a frame and belongs to exactly one participant.</li>
        <li>You can create as many participants and questions as you want.</li>
        <li>Each response is represented by a sticky note.</li>
        <li>Only sticky notes and their placement on the plane will be included in the analysis.</li>
      </ul>
      <h3>Input Plane</h3>
      <p>
        Each plane is represented by a frame, titled in the format: <em>&lt;PersonId&gt;: &lt;QuestionId&gt;</em>.
        You can create a template frame to make things clearer, but remember that only sticky notes will be analyzed.
      </p>
      <h3>Analysis</h3>
      <p>
        After collecting responses, analyze the sticky note placements or export the data as a JSON file.
      </p>
    </div>
  );
};

export default Description;
