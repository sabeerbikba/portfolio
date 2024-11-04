
const About = ({ number }: { hidden?: boolean, number: [number, number] }) => {
   const [project, app] = number;

   return (
      <div className="text-black" hidden={app !== 6}>
         {/* TODO: need improvement unesseary chnages */}
         {project === 1 ? <DevTools /> : <Rickshaw />}
      </div>
   )
}

const DevTools = () => (
   <>
      <div>Dev.tools</div>
      <div>Dev.tools</div>
      <div>Dev.tools</div>
      <div>Dev.tools</div>
      <div>Dev.tools</div>
      <div>Dev.tools</div>
      <div>Dev.tools</div>
   </>
);

const Rickshaw = () => (
   <>
      <div>Rickshaw</div>
      <div>Rickshaw</div>
      <div>Rickshaw</div>
      <div>Rickshaw</div>
      <div>Rickshaw</div>
      <div>Rickshaw</div>
      <div>Rickshaw</div>
   </>
);

export default About;