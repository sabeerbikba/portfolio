// TODO: content need to be added

const About = ({ number }: { number: [number, number] }) => {
   const [project, app] = number;

   return (
      <div className="text-black bg-[#191919]" hidden={app !== 4}>
         {project === 1 ? <DevTools /> : <Rickshaw />}
      </div>
   )
}

// Mention this webiste designed to bigger screen that's why look ui not correct
const DevTools = () => (
   <div className="notes-body max-w-prose mx-auto p-6">
      <h1>Dev.tools</h1>

      <h3>List of Features</h3>
      <ul>
         <li>Responsive design with Tailwind CSS</li>
         <li>Minimalist look and feel, inspired by Notion</li>
         <li>Support for lists, code blocks, and tables</li>
      </ul>
      <p>
         This is a paragraph demonstrating the <strong>typography styles</strong> applied
         to text within the <code>.notes-body</code> class. Tailwind CSS makes it easy to
         build beautiful, minimalist designs inspired by Notion.
      </p>

      <h2>Features of Our Styles</h2>
      <p>
         You can add <a href="https://tailwindcss.com">links</a> that stand out, along with
         styled elements such as lists and blockquotes.
      </p>


      <h2>Code Example</h2>
      <p>Below is a code snippet showing how to create a React component:</p>
      <pre>
         <code>{`function MyComponent() {
  return <div>Hello, world!</div>;
}`}</code>
      </pre>

      <h3>Numbered Steps</h3>
      <ol>
         <li>Set up Tailwind CSS</li>
         <li>Create your component</li>
         <li>Apply the custom styles</li>
      </ol>

      <h2>Blockquote Example</h2>
      <blockquote>
         "Notion is a powerful tool for organizing thoughts and collaborating on projects. Let's build something similar!"
      </blockquote>

      <h2>Table Example</h2>
      <table>
         <thead>
            <tr>
               <th>Feature</th>
               <th>Description</th>
            </tr>
         </thead>
         <tbody>
            <tr>
               <td>Heading Styles</td>
               <td>Styled headers for different levels (h1, h2, etc.)</td>
            </tr>
            <tr>
               <td>Lists</td>
               <td>Supports both ordered and unordered lists</td>
            </tr>
            <tr>
               <td>Code Blocks</td>
               <td>Formatted inline code and block code examples</td>
            </tr>
         </tbody>
      </table>
   </div>
);

const Rickshaw = () => (
   <div className="notes-body max-w-prose mx-auto p-6">
      <h1>Rickshaw</h1>
      <p>
         This is a paragraph demonstrating the <strong>typography styles</strong> applied
         to text within the <code>.notes-body</code> class. Tailwind CSS makes it easy to
         build beautiful, minimalist designs inspired by Notion.
      </p>

      <h2>Features of Our Styles</h2>
      <p>
         You can add <a href="https://tailwindcss.com">links</a> that stand out, along with
         styled elements such as lists and blockquotes.
      </p>

      <h3>List of Features</h3>
      <ul>
         <li>Responsive design with Tailwind CSS</li>
         <li>Minimalist look and feel, inspired by Notion</li>
         <li>Support for lists, code blocks, and tables</li>
      </ul>

      <h3>Numbered Steps</h3>
      <ol>
         <li>Set up Tailwind CSS</li>
         <li>Create your component</li>
         <li>Apply the custom styles</li>
      </ol>

      <h2>Code Example</h2>
      <p>Below is a code snippet showing how to create a React component:</p>
      <pre>
         <code>{`function MyComponent() {
  return <div>Hello, world!</div>;
}`}</code>
      </pre>

      <h2>Blockquote Example</h2>
      <blockquote>
         "Notion is a powerful tool for organizing thoughts and collaborating on projects. Let's build something similar!"
      </blockquote>

      <h2>Table Example</h2>
      <table>
         <thead>
            <tr>
               <th>Feature</th>
               <th>Description</th>
            </tr>
         </thead>
         <tbody>
            <tr>
               <td>Heading Styles</td>
               <td>Styled headers for different levels (h1, h2, etc.)</td>
            </tr>
            <tr>
               <td>Lists</td>
               <td>Supports both ordered and unordered lists</td>
            </tr>
            <tr>
               <td>Code Blocks</td>
               <td>Formatted inline code and block code examples</td>
            </tr>
         </tbody>
      </table>
   </div>
);

export default About;
