import React from 'react';

const FAQ: React.FC = () => {
  return (
    <div className="faq-container">
      <h2>FAQ</h2>
      <ul>
        <li>
          <strong>How do I create a new participant and question?</strong>
          <p>You can create as many participants as you want by assigning each a unique frame for every question. Ensure the frame title follows the format <em>PersonId: QuestionId</em>.</p>
        </li>
        <li>
          <strong>What objects are analyzed in DigDeeper?</strong>
          <p>Only sticky notes are analyzed. Other objects like shapes, images, or textboxes can be added to the frame but will not be included in the analysis.</p>
        </li>
        <li>
          <strong>How do I export the data?</strong>
          <p>After completing the participant responses, you can export the data as a JSON file directly from DigDeeper.</p>
        </li>
        <li>
          <strong>What is the best way to use DigDeeper in brainstorming sessions?</strong>
          <p>Encourage participants to express their ideas using sticky notes on the two-axis plane. The spatial positioning helps visualize and connect their thoughts more effectively.</p>
        </li>
      </ul>
    </div>
  );
};

export default FAQ;
