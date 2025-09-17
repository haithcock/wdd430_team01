import Button from '@/app/ui/Button';

export default function Contact() {
  return (
    <section id="contact" className="px-6 py-20 bg-white border-t">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Contact Us</h2>
        <p className="text-gray-600 mb-8">
          Have questions? Reach out and we’ll be happy to help.
        </p>
        <Button>
          Email Us
        </Button>
      </div>
    </section>
  );
}