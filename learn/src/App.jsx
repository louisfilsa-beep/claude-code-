import { useHashRoute } from './lib/router.js';
import Landing from './components/Landing.jsx';
import AppShell from './components/app/AppShell.jsx';
import LessonPlayer from './components/app/LessonPlayer.jsx';

const LESSON_PREFIX = '/lesson/';

export default function App() {
  const path = useHashRoute();

  // Full-screen lesson player.
  if (path.startsWith(LESSON_PREFIX)) {
    const id = decodeURIComponent(path.slice(LESSON_PREFIX.length));
    return <LessonPlayer lessonId={id} />;
  }

  // The app tabs.
  if (path === '/learn' || path === '/practice' || path === '/profile') {
    return <AppShell path={path} />;
  }

  // Everything else (/, and landing section anchors like #features) = landing.
  return <Landing />;
}
