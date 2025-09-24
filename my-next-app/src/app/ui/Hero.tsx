import Button from '@/app/ui/Button';
import Search from '@/app/ui/Search';


export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center flex-1 text-center px-6 py-20 bg-gradient-to-br from-white via-orange-100 to-red-50 text-gray-900">
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
          Discover Unique{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FB923C] to-[#EF4444]">
            Handcrafted Treasures
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-2xl mx-auto">
          Sample text
        </p>

        {/* Search bar with button */}
        <div className="flex w-full max-w-xl mx-auto mb-16">
          <Search placeholder="Search for handcrafted items..." />
          <Button className="rounded-l-none">Explore</Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {/* Active Artisans */}
          <div>
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-full bg-[#FB923C]/10 text-[#FB923C]">
              <i className="fa-solid fa-user"></i>
            </div>
            <h3 className="text-2xl font-bold">200+</h3>
            <p className="text-gray-600">Active Artisans</p>
          </div>
          {/* Handcrafted Items */}
          <div>
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-full bg-[#F97316]/10 text-[#F97316]">
              <i className="fa-solid fa-hands-holding-circle"></i>
            </div>
            <h3 className="text-2xl font-bold">1,200+</h3>
            <p className="text-gray-600">Handcrafted Items</p>
          </div>
          {/* Sustainable Materials */}
          <div>
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-full bg-[#EA580C]/10 text-[#EA580C]">
              <i className="fa-solid fa-leaf"></i>
            </div>
            <h3 className="text-2xl font-bold">95%</h3>
            <p className="text-gray-600">Sustainable Materials</p>
          </div>
          {/* Customer Satisfaction */}
          <div>
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-full bg-[#EF4444]/10 text-[#EF4444]">
              <i className="fa-solid fa-hand-sparkles"></i>
            </div>
            <h3 className="text-2xl font-bold">4.9★</h3>
            <p className="text-gray-600">Customer Satisfaction</p>
          </div>
        </div>
      </div>
    </section>
  );
}