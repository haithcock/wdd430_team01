export default function Features() {
  const featureList = [
    {
      title: "Fast Performance",
      desc: "Next.js optimizes your app for speed and great user experience.",
    },
    {
      title: "Beautiful UI",
      desc: "Tailwind CSS helps you create responsive designs quickly.",
    },
    {
      title: "Scalable",
      desc: "Build apps that scale easily with modern best practices.",
    },
  ];

  return (
    <section id="features" className="px-6 py-20 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">Features You’ll Love</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {featureList.map((feature) => (
            <div
              key={feature.title}
              className="p-6 border rounded-lg shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}