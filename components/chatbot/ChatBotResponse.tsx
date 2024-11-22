import React, { useState, useEffect } from 'react';
import 'prismjs/themes/prism-tomorrow.css'; // Import a theme for syntax highlighting
import Prism from 'prismjs'; // Import Prism.js
import 'prismjs/components/prism-typescript'; // Import the language you need

interface FormattedResponseProps {
  rawResponse: string; // Prop to pass the raw response to be formatted
}

const FormattedResponse: React.FC<FormattedResponseProps> = ({ rawResponse }) => {
  const [formattedText, setFormattedText] = useState('');

  const formatResponse = (response: string) => {
    // Handle bold text: **text** -> <strong>text</strong>
    let formattedResponse = response.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Handle headings: ### Heading -> <h3>Heading</h3>, ## Heading -> <h2>Heading</h2>
    formattedResponse = formattedResponse.replace(
      /^(#{1,3})\s*(.*?)(?=\n|$)/gm,
      (_, hashes, text) => {
        const level = hashes.length; // Get the heading level based on the number of hashes
        return `<h${level} style="margin-bottom: 0.5rem; font-weight: bold;">${text}</h${level}>`;
      }
    );

    // Handle bullet points: - item -> <ul><li>item</li></ul>
    formattedResponse = formattedResponse.replace(
      /^[-*]\s+(.*?)(?=\n|$)/gm,
      '<ul><li>$1</li></ul>'
    );

    // Handle numbered lists: 1. item -> <ol><li>item</li></ol>
    formattedResponse = formattedResponse.replace(
      /^\d+\.\s+(.*?)(?=\n|$)/gm,
      '<ol><li>$1</li></ol>'
    );

    // Handle line breaks: \n -> <p></p>
    formattedResponse = formattedResponse.replace(/\n/g, '</p><p style="margin-bottom: 1rem;">'); // Add space after each paragraph

    // Handle code blocks: ```code``` -> <pre><code class="language-typescript">code</code></pre>
    formattedResponse = formattedResponse.replace(
      /```(.*?)```/gs, 
      '<pre class="language-typescript" style="background-color: #f5f5f5; padding: 1rem; border-radius: 5px; white-space: pre-wrap;"><code class="language-typescript">$1</code></pre>'
    );

    // Add <p> tags around the entire response to start and end
    return `<p style="margin-bottom: 1rem;">${formattedResponse}</p>`;
  };

  useEffect(() => {
    setFormattedText(formatResponse(rawResponse));
    Prism.highlightAllUnder(document.querySelector('.formatted-response')); // Highlight code blocks after rendering
  }, [rawResponse]);

  return <div className="formatted-response" dangerouslySetInnerHTML={{ __html: formattedText }} />;
};

export default FormattedResponse;