const TOPICS = [
  'Traffic signs',
  'Right-of-way rules',
  'Roundabouts',
  'Speed limits',
  'Road markings',
  'Pedestrians & cyclists',
  'Alcohol & safety',
  'Parking rules',
  'Night & rain driving',
  'Vehicle documents',
  'Licensing in Aruba',
  'Emergency procedures',
];

export default function Topics() {
  return (
    <section className="section section--tint" id="topics">
      <div className="section__head">
        <p className="eyebrow">What you'll master</p>
        <h2 className="section__title">The full Aruba theory syllabus</h2>
        <p className="section__sub">
          Every topic on the official exam — broken into lessons you can finish
          on a coffee break.
        </p>
      </div>

      <ul className="topics" aria-label="Topics covered">
        {TOPICS.map((t) => (
          <li className="topic" key={t}>
            <span className="topic__check" aria-hidden="true">✓</span>
            {t}
          </li>
        ))}
      </ul>
    </section>
  );
}
