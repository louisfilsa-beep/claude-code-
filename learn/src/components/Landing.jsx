import Nav from './Nav.jsx';
import Hero from './Hero.jsx';
import Features from './Features.jsx';
import HowItWorks from './HowItWorks.jsx';
import Topics from './Topics.jsx';
import Gamification from './Gamification.jsx';
import FinalCTA from './FinalCTA.jsx';
import Footer from './Footer.jsx';

export default function Landing() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Topics />
        <Gamification />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
