// To convert html to markdown: https://codebeautify.org/html-to-markdown 
// Code: private repo: https://github.com/sabeerbikba/codeblocks/blob/main/node/markdownstring-to-base64.js

const string = `### Rickshaw

Rickshaw is an open-source project designed to provide contact details for tourists traveling in rickshaws. The project was initially created as a request from a family member, blending utility with creative design. Available in the GitHub repository [sabeerbikba/rickshaw](http://github.com/sabeerbikba/rickshaw), this project aims to deliver a simple yet effective solution tailored to a tourist audience.

With features like a gallery for uploading and viewing images and a creatively designed home page resembling the back of a rickshaw, the project showcases both functionality and visual flair. It's accessible, user-friendly, and built to demonstrate creativity while meeting practical needs.

* * *

#### **Motivation and Goals**

The primary motivation behind the project was a request from a family member to create a website for tourists. This prompted me to take a simple idea and add creative touches to make it visually engaging while maintaining its utility.

* * *

#### **Features**

Rickshaw includes four primary pages:

1.  [**Home Page**](https://honnavarrickshawservice.vercel.app/)
2.  [**About Me Page**](https://honnavarrickshawservice.vercel.app/about-me)
3.  [**Gallery Page**](https://honnavarrickshawservice.vercel.app/gallery)
4.  [**Contact Page**](https://honnavarrickshawservice.vercel.app/contact)`;

const devToolsStr = `# Dev.Tools

Dev.Tools is a comprehensive suite of utilities designed specifically for developers to streamline their workflow and boost productivity. This application includes over 20 essential tools, such as live HTML preview, a diff viewer, and other utilities that simplify everyday development tasks. With a focus on usability, Dev.Tools is tailored to developers who value efficiency and a seamless experience.

The project targets developers looking for quick, accessible, and efficient solutions without needing to juggle multiple applications or write additional code for common tasks.

* * *

## **Motivation and Goals**

The idea behind Dev.Tools was to create a project that wasn't just another practice application but something that could serve a real purpose in the long term. My goal was to develop a platform that simplifies frequent developer activities, helping users save time while coding. By focusing on a single-page application (SPA) approach, I wanted to ensure smooth navigation and an intuitive user experience.

This project was not just about creating tools. It was about solving problems I faced as a developer. For instance, the Live HTML Preview tool eliminates the need to create, save, and open files repeatedly in a browser, offering instant feedback to the user. Each tool was designed to either enhance productivity or fill a gap I encountered during development.

* * *

## **Features and Technical Implementation**

Dev.Tools boasts an impressive array of utilities, including:

*   **Live Previews**: Instant feedback for HTML, React, and Markdown code without needing to save or reload.
*   **Color Code Converter**: Quickly switch between HEX, RGB, and HSL formats.
*   **QR Code Generator**: Create QR codes effortlessly for any URL or text.
*   **CSS Autoprefixer**: Add vendor prefixes to CSS properties with ease.
*   **Meta Tags Generator**: Simplify SEO optimization for websites.

The platform is built using **React** for its speed and interactivity, creating a smooth SPA experience. Tools like localStorage are integrated to retain user inputs and settings, ensuring a personalized experience every time they return. Despite being my first project, I was able to solve most challenges independently while experimenting with React libraries and best practices.

* * *

## **Community Reception**

Even as a solo-built project, Dev.Tools has gained traction-earning over 30+ GitHub stars, which tells me other developers see the value in it too. It is always rewarding to know that something built to solve your own problems ends up helping others as well.

* * *

## **Personal Reflection and Future Plans**

Dev.Tools started as a personal practice project, but it has grown into something that significantly boosts my own productivity. The tools not only make daily development tasks easier but also inspire new ideas for future improvements.

Dev.Tools is not just a project. It's a solution for developers like me, by developers like me.`;

// const btoaa = btoa(unescape(encodeURIComponent(string)));
const btoaa = btoa(devToolsStr);
// const btoaa = Buffer.from(devToolsStr, 'utf-8').toString('base64');
console.log('btoaa: ', btoaa);

const atobb = atob(btoaa);
console.log('atobb: ', atobb);
console.log('devToolsStr: ', devToolsStr);
