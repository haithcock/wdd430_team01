import Link from "next/link";

export default function Features() {
  const featureList = [
    { title: "Pottery", desc: "Pottery & Ceramics description" },
    { title: "Jewelry", desc: "Jewelry description" },
    { title: "Textiles", desc: "Textiles & Fiber description" },
    { title: "Woodworking", desc: "Woodworking description" },
    { title: "Metalwork", desc: "Metalwork description" },
    { title: "Glass-art", desc: "Glass Art description" },
  ];

  return (
    <section id="features" className="px-6 py-20 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FB923C] to-[#EF4444] mb-12">
          Browse by Category
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {featureList.map((feature) => (
            <Link
              href={`/catalog/${feature.title.toLowerCase().replace(/\s+/g, '-')}`}
              key={feature.title}
              className="block"
            >
              <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition">
                <h3 className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-[#FB923C] to-[#EF4444] mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}