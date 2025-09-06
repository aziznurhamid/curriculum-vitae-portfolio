export default function TimelineItem({ item }) {
  return (
    <div className="mb-fluid-base pl-fluid-sm border-l-4 border-primary">
        <h3 className="text-fluid-lg font-bold text-text-primary">{item.title}</h3>
        <p className="font-semibold text-primary text-fluid-base">{item.company || item.institution}</p>
        <p className="text-fluid-sm text-text-secondary mb-2">{item.period}</p>
        <p className="text-text-secondary text-fluid-base">{item.description}</p>
    </div>
  );
}