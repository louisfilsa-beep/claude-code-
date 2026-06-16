import { useProgress } from '../../state/progress.jsx';
import TopBar from './TopBar.jsx';
import TabBar from './TabBar.jsx';
import LearnPath from './LearnPath.jsx';
import Practice from './Practice.jsx';
import Profile from './Profile.jsx';
import Onboarding from './Onboarding.jsx';

export default function AppShell({ path }) {
  const { onboarded } = useProgress();

  // First visit → name prompt before anything else.
  if (!onboarded) return <Onboarding />;

  let screen;
  if (path === '/practice') screen = <Practice />;
  else if (path === '/profile') screen = <Profile />;
  else screen = <LearnPath />;

  return (
    <div className="app">
      <TopBar />
      <main className="app__content">{screen}</main>
      <TabBar path={path} />
    </div>
  );
}
