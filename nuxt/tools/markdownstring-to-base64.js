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

// const btoaa = btoa(unescape(encodeURIComponent(string)));
const btoaa = btoa(string);
console.log('btoaa: ', btoaa);

const atobb = atob(btoaa);
console.log('atobb: ', atobb);
console.log('string: ', string);