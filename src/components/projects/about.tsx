import ExternalLink from "../ui/link";
// TODO: content need to be added


const About = ({ number }: { number: [number, number] }) => {
  const [project, app] = number;

  return (
    <div className="text-black bg-[#191919]" hidden={app !== 4}>
      <div className="notes-body max-w-prose mx-auto p-6">
        {project === 1 ? <DevTools /> : <Rickshaw />}
      </div>
    </div>
  );
};



// Mention this webiste designed to bigger screen that's why look ui not correct
const DevTools = () => (
  <>
    <h3>Dev.Tools</h3>
    {/* <h4><strong>Project Overview</strong></h4> */}
    <p>
      Dev.Tools is a comprehensive suite of utilities designed specifically for developers to streamline their workflow
      and boost productivity. This application includes over 20 essential tools, such as live HTML preview, a diff
      viewer, and other utilities that simplify everyday development tasks. With a focus on usability, Dev.Tools is
      tailored to developers who value efficiency and a seamless experience.
    </p>
    <p>
      The project targets developers looking for quick, accessible, and efficient solutions without needing to juggle
      multiple applications or write additional code for common tasks.
    </p>
    <hr />
    <h4><strong>Motivation and Goals</strong></h4>
    <p>
      The idea behind Dev.Tools was to create a project that wasn&apos;t just another practice application but something
      that could serve a real purpose in the long term. My goal was to develop a platform that simplifies frequent
      developer activities, helping users save time while coding. By focusing on a single-page application (SPA)
      approach, I wanted to ensure smooth navigation and an intuitive user experience.
    </p>
    <p>
      This project was not just about creating tools—it was about solving problems I faced as a developer. For
      instance, the Live HTML Preview tool eliminates the need to create, save, and open files repeatedly in a
      browser, offering instant feedback to the user. Each tool was designed to either enhance productivity or fill a
      gap I encountered during development.
    </p>
    <hr />
    <h4><strong>Features and Technical Implementation</strong></h4>
    <p>Dev.Tools boasts an impressive array of utilities, including:</p>
    <ul>
      <li>
        <strong>Live Previews</strong>: Instant feedback for HTML, React, and Markdown code without needing to save
        or reload.
      </li>
      <li>
        <strong>Color Code Converter</strong>: Quickly switch between HEX, RGB, and HSL formats.
      </li>
      <li>
        <strong>QR Code Generator</strong>: Create QR codes effortlessly for any URL or text.
      </li>
      <li>
        <strong>CSS Autoprefixer</strong>: Add vendor prefixes to CSS properties with ease.
      </li>
      <li>
        <strong>Meta Tags Generator</strong>: Simplify SEO optimization for websites.
      </li>
    </ul>
    <p>
      The platform is built using <strong>React</strong> for its speed and interactivity, creating a smooth SPA
      experience. Tools like localStorage are integrated to retain user inputs and settings, ensuring a personalized
      experience every time they return. Despite being my first project, I was able to solve most challenges
      independently while experimenting with React libraries and best practices.
    </p>
    <hr />
    <h4><strong>Personal Reflection and Future Plans</strong></h4>
    <p>
      Dev.Tools started as a personal practice project, but it has grown into something that significantly boosts my
      own productivity. The tools not only make daily development tasks easier but also inspire new ideas for future
      improvements.
    </p>
    <p>
      While working alone, I had the opportunity to guide a contributor on GitHub workflows, which was a rewarding
      experience. However, creating each tool is time-intensive, and a long list of ideas is still pending
      implementation. My vision for the future is to expand the toolset, improve UI/UX.
    </p>
    <p>
      Dev.Tools is not just a project—it&apos;s a solution for developers like me, by developers like me.
    </p>
  </>
);

const Rickshaw = () => (
  <>
    <h3>Rickshaw</h3>
    <p>
      Rickshaw is an open-source project designed to provide contact details for tourists traveling in rickshaws.
      The project was initially created as a request from a family member, blending utility with creative design.
      Available in the GitHub repository{' '}
      <ExternalLink href="http://github.com/sabeerbikba/rickshaw">sabeerbikba/rickshaw</ExternalLink>,
      this project aims to deliver a simple yet effective solution tailored to a tourist audience.
    </p>
    <p>
      With features like a gallery for uploading and viewing images and a creatively designed home page
      resembling the back of a rickshaw, the project showcases both functionality and visual flair.
      It&apos;s accessible, user-friendly, and built to demonstrate creativity while meeting practical needs.
    </p>
    <hr />
    <h4><strong>Motivation and Goals</strong></h4>
    <p>
      The primary motivation behind the project was a request from a family member to create a website for tourists.
      This prompted me to take a simple idea and add creative touches to make it visually engaging while
      maintaining its utility. Additionally, this project served as an opportunity to learn and experiment with
      different technologies, especially backend development and modern web practices.
    </p>
    <p>
      One highlight of the project is the home page design, which mimics the back of a rickshaw.
      The navigation elements, such as a call-to-action (CTA) button styled as a number plate and a placeholder
      representing the back mirror, add a fun and immersive touch. Hover interactions further enhance the
      experience, with effects like red brake lights illuminating or indicators activating in response
      to user actions.
    </p>
    <hr />
    <h4><strong>Technical Implementation</strong></h4>
    <p>
      Rickshaw was implemented across three versions, each using different technologies:</p>
    <ol>
      {/* TODO:  lint error check  */}
      <li><strong>Vanilla Technologies</strong> (No backend) – Initial prototype, straightforward but limited.</li>
      <li><strong>Node.js Backend</strong> – Introduced APIs for the gallery and other features.</li>
      <li><strong>Next.js with MongoDB</strong> – Final version, hosted on Vercel, combining frontend and backend seamlessly.</li>
    </ol>
    <p>
      Key technologies used in the final version include{' '}
      <ExternalLink href="https://nextjs.org/"><strong>Next.js</strong></ExternalLink>,{' '}
      <ExternalLink href="https://www.mongodb.com/"><strong>MongoDB</strong>,</ExternalLink>{' '}and{' '}
      <ExternalLink href="https://imgbb.com/"><strong>imgbb</strong></ExternalLink>{' '}
      for image hosting. The gallery page posed a significant challenge,
      especially handling image uploads and storage. To address these, I implemented advanced techniques
      like blurred image placeholders using <strong>SQIP (SVG-based placeholders)</strong>{' '}
      for a better user experience during image loading. This effort even led to the creation of two tools integrated
      into my <ExternalLink href="http://github.com/sabeerbikba/dev.tools">Dev.Tools</ExternalLink> project:
    </p>
    <ul>
      <li>
        <ExternalLink href="https://devtools-sabeerbikba.vercel.app/image-placeholder-generator">
          <strong>/image-placeholder-generator</strong>
        </ExternalLink>
      </li>
      <li>
        <ExternalLink href="https://devtools-sabeerbikba.vercel.app/sqip-lqip-previewer">
          <strong>/sqip-lqip-previewer</strong>
        </ExternalLink>
      </li>
    </ul>
    <hr />
    <h4><strong>Features</strong></h4>
    <p>Rickshaw includes four primary pages:</p>
    <ol>
      <li>
        <ExternalLink href="https://honnavarrickshawservice.vercel.app/">
          <strong>Home Page</strong>
        </ExternalLink>
        : A creative design mimicking the back of a rickshaw with interactive hover effects.</li>
      <li>

        <ExternalLink href="https://honnavarrickshawservice.vercel.app/about-me">
          <strong>About Me Page</strong>
        </ExternalLink>
        : Provides a brief introduction and context about the project.</li>
      <li>
        <ExternalLink href="https://honnavarrickshawservice.vercel.app/gallery">
          <strong>Gallery Page</strong>
        </ExternalLink>
        :
        <ul>
          <li>Image upload functionality without requiring login.</li>
          <li>SQIP-based blurred image placeholders.</li>
          <li>Infinite scroll for seamless navigation through images.</li>
        </ul>
      </li>
      <li>
        <ExternalLink href="https://honnavarrickshawservice.vercel.app/contact">
          <strong>Contact Page</strong>
        </ExternalLink>
        : Offers contact details in a clean and accessible format.</li>
    </ol>
    <p>
      The gallery page stands out as the most feature-rich section, showcasing advanced frontend and backend integration.</p>
    <hr />
    <h4><strong>Future Plans</strong></h4>
    <p>
      The project currently fulfills its purpose, but I am open to adding new features or improvements upon request.
      For instance, the contact page was added later as a response to feedback. Any future updates will
      focus on maintaining the simplicity and usability that define Rickshaw.
    </p>
    <p>
      Rickshaw is a practical, creative, and open-source project that highlights my ability to
      combine technical skills with design thinking, making it an ideal solution for its target audience.
    </p>
  </>
);

export default About;
