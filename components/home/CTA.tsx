import Link from "next/link";

const CTA = () => {
  return (
    <section className="py-20 bg-blue-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Ready to land your next big role?
        </h2>
        <p className="text-xl text-blue-100 mb-10">
          Start building your professional resume today and see the difference.
        </p>
        <Link 
          href="/signup" 
          className="inline-block bg-white text-blue-600 text-lg font-bold px-10 py-5 rounded-xl hover:bg-blue-50 transition-colors shadow-2xl"
        >
          Create My Resume Now
        </Link>
      </div>
    </section>
  );
};

export default CTA;