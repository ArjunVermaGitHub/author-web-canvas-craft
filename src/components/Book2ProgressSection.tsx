import BookButton from './BookButton';
import { BOOK2_PROGRESS, BOOK2_SIGNUP_PATH } from '@/config/book2Progress';

export default function Book2ProgressSection() {
  return <section id="book2-progress" className="band-section scroll-mt-44 border-b border-accent/35">
    <div className="site-container">
      <h2 className="page-heading">The Moonwell: Book 2 progress</h2>
      <p className="text-lg text-secondary mb-8">Follow along as Book 2 is written. Get the first look when it's ready.</p>
      <div className="max-w-3xl space-y-6">
        {BOOK2_PROGRESS.stages.map((stage, index) => <div key={stage.label}>
          <div className="flex justify-between gap-4 mb-2"><label htmlFor={`book2-stage-${index}`} className="font-semibold">{stage.label}</label><span className="text-accent tabular-nums">{stage.percent}%</span></div>
          <progress id={`book2-stage-${index}`} className="book2-progress-bar block w-full h-3" value={stage.percent} max={100}>{stage.percent}%</progress>
        </div>)}
      </div>
      <p className="text-sm text-muted-foreground mt-6 mb-6">Last updated: <time dateTime={BOOK2_PROGRESS.lastUpdated}>{BOOK2_PROGRESS.lastUpdated}</time></p>
      <BookButton href={BOOK2_SIGNUP_PATH} className="w-full sm:w-auto">Tell me when Book 2 is ready</BookButton>
    </div>
  </section>;
}
