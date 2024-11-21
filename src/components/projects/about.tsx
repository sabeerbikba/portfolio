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
         implementation. My vision for the future is to expand the toolset, improve UI/UX, and potentially make the
         platform open-source for other developers to contribute and benefit.
      </p>
      <p>
         Dev.Tools is not just a project—it&apos;s a solution for developers like me, by developers like me.
      </p>
   </>
);

const Rickshaw = () => (
   <>
      <h3>Rickshaw</h3>
      {/* <h4><strong>Project Overview</strong></h4> */}
      <p>
         The Rickshaw Project is an open-source initiative designed to provide contact information for tourists riding
         rickshaws. This unique project is hosted in the GitHub repository{" "}
         <a href="https://github.com/sabeerbikba/rickshaw" target="_blank" rel="noopener">sabeerbikba/rickshaw</a>.
         While the
         project was originally created as a favor to a family member, it incorporates creative design and functionality
         to elevate its utility and appeal, especially for tourists seeking seamless access to rickshaw contact details.
      </p>
      <p>The website features four key pages:</p>
      <ul>
         <li>
            <strong>Home Page</strong>: Styled creatively to resemble the back of a rickshaw, complete with interactive
            elements like a CTA button that mimics a number plate and navigation buttons resembling indicators.
         </li>
         <li>
            <strong>About Me</strong>: Provides an overview of the creator&aposs journey and purpose for the project.
         </li>
         <li>
            <strong>Gallery</strong>: Showcases images with modern features like image placeholders and infinite scroll.
         </li>
         <li>
            <strong>Contact</strong>: Allows easy submission of queries or feedback.
         </li>
      </ul>
      <hr />
      <h4><strong>Motivation and Challenges</strong></h4>
      <p>
         This project began as a simple request from my uncle, but it turned into a valuable learning opportunity. The
         primary motivation was to deliver a website that was not just functional but also aesthetically engaging.
         Additionally, I wanted to challenge myself by building the same project using three different approaches:
      </p>
      <ol>
         <li><strong>Vanilla Technologies (Frontend-only)</strong></li>
         <li><strong>Node.js Backend</strong></li>
         <li><strong>Next.js Full-Stack Implementation</strong></li>
      </ol>
      <p>
         Each iteration presented its own challenges, particularly when implementing the <strong>/gallery</strong>
         section. Handling image uploads, creating placeholders, and managing infinite scrolling were difficult tasks,
         especially as I was exploring backend development for the first time. I incorporated innovative solutions like
         <strong>SQIP</strong> (SVG-based image placeholders) and other techniques such as <strong>blurhash</strong> and
         <strong>LQIP</strong> to improve the user experience while images were loading.
      </p>
      <hr />
      <h4><strong>Features and Technical Highlights</strong></h4>
      <ol>
         <li>
            <p><strong>Gallery Page</strong>:</p>
            <ul>
               <li>
                  <strong>Image Uploads</strong>: Visitors can upload images without logging in.
               </li>
               <li>
                  <strong>SQIP Placeholders</strong>: Background-blurred placeholders display while images load.
               </li>
               <li>
                  <strong>Infinite Scroll</strong>: Seamless browsing for a better user experience.
               </li>
            </ul>
         </li>
         <li>
            <p><strong>Home Page Creativity</strong>:</p>
            <ul>
               <li>
                  The home page replicates the look of a rickshaw&apos;s back, incorporating interactive elements:
                  <ul>
                     <li><strong>Number Plate</strong>: Functions as a CTA button.
                     </li>
                     <li>
                        <strong>Brake Lights and Indicators</strong>: React to hover effects, enhancing the page&apos;s
                        engagement.
                     </li>
                  </ul>
               </li>
            </ul>
         </li>
         <li>
            <p><strong>Open Source Repository</strong>:</p>
            <ul>
               <li>Available for the community under different branches:<ul>
                  <li><strong>Main</strong>: Frontend-only using vanilla technologies.</li>
                  <li><strong>Vanilla Backend</strong>: Vanilla technologies with a Node.js backend.</li>
                  <li><strong>Next.js Backend</strong>: Full-stack implementation using Next.js.</li>
               </ul>
               </li>
            </ul>
         </li>
      </ol>
      <hr />
      <h4><strong>Personal Reflection and Future Plans</strong></h4>
      <p>
         This project holds personal significance as it pushed me to explore multiple technologies and solve real-world
         challenges. The repetitive effort of building it three times was both frustrating and rewarding, as it
         solidified my understanding of frontend, backend, and full-stack development.
      </p>
      <p>
         While there are no immediate plans for new features, I remain open to adding functionality upon request. For
         example, I recently added a <strong>/contact</strong> page to meet a new requirement. This adaptability ensures
         the project remains practical and evolves as needed.
      </p>
      <p>
         The Rickshaw Project is not just a website—it&apos;s a testament to creative problem-solving and the ability to
         translate simple ideas into engaging, functional solutions.
      </p>
   </>
);

export default About;
