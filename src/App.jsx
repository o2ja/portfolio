import { useCallback, useEffect, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import { projects } from './data/projects';
import { scrollToId, startSmoothScroll } from './lib/smoothScroll';
import Nav from './sections/Nav';
import Hero from './sections/Hero';
import Intro from './sections/Intro';
import Work from './sections/Work';
import Capabilities from './sections/Capabilities';
import Archive from './sections/Archive';
import Background from './sections/Background';
import Contact from './sections/Contact';

export default function App() {
  const [activeId, setActiveId] = useState(projects[0].id);

  useEffect(startSmoothScroll, []);

  /** Hero bodies and capability evidence both route here: turn the orbit, then bring it into view. */
  const showProject = useCallback((id) => {
    setActiveId(id);
    scrollToId('work');
  }, []);

  return (
    // reducedMotion="user": Motion drops transform animations when the visitor asks for less motion
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero onShowProject={showProject} />
        <Intro />
        <Work activeId={activeId} onActiveChange={setActiveId} />
        <Capabilities onShowProject={showProject} />
        <Archive />
        <Background />
        <Contact />
      </main>
    </MotionConfig>
  );
}
