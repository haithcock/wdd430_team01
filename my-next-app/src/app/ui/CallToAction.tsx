import Button from '@/app/ui/Button';

export default function CallToAction() {
  return (
    <section id="learn-more" className="px-6 py-20 bg-gray-50 text-center border-t">
      <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to get started?</h2>
      <p className="text-gray-600 mb-8 max-w-xl mx-auto">
        Join thousands of developers building with Next.js and Tailwind CSS.
      </p>
      <Button>
        Start Now
      </Button>
    </section>
  );
}