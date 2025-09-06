export default function Section({ id, title, children }) {
  return (
    <section id={id} className="py-fluid-lg scroll-mt-12">
        {title && <h2 className="text-fluid-2xl font-bold text-center mb-fluid-base text-text-primary">{title}</h2>}
        {children}
    </section>
  );
}