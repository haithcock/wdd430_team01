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
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5V4H2v16h5m10-8a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold">200+</h3>
            <p className="text-gray-600">Active Artisans</p>
          </div>
          {/* Handcrafted Items */}
          <div>
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-full bg-[#F97316]/10 text-[#F97316]">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8l3 3-3 3-3-3 3-3zm0 8h.01" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold">1,200+</h3>
            <p className="text-gray-600">Handcrafted Items</p>
          </div>
          {/* Sustainable Materials */}
          <div>
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-full bg-[#EA580C]/10 text-[#EA580C]">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2l4 7h7l-5.5 4.5L19 21l-7-4-7 4 2.5-7.5L2 9h7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold">95%</h3>
            <p className="text-gray-600">Sustainable Materials</p>
          </div>
          {/* Customer Satisfaction */}
          <div>
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-full bg-[#EF4444]/10 text-[#EF4444]">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.356 7.265h7.634c.97 0 1.372 1.24.588 1.81l-6.173 4.486 2.357 7.266c.3.92-.755 1.688-1.54 1.117L12 18.896l-6.173 4.486c-.785.57-1.84-.197-1.54-1.117l2.357-7.266-6.173-4.486c-.784-.57-.382-1.81.588-1.81h7.634l2.356-7.265z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold">4.9★</h3>
            <p className="text-gray-600">Customer Satisfaction</p>
          </div>
        </div>
      </div>
    </section>
  );
}