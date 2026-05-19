export default function Stats() {
  const stats = [
    { value: "$4.2M+", label: "Estimated Budgets Listed" },
    { value: "1,800+", label: "Validations & Comments" },
    { value: "450+", label: "Startup Ideas Shared" },
    { value: "25+", label: "Venture Partnerships Formed" },
  ];

  return (
    <section className="bg-content1 py-16 border-y border-default-100">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
        {stats.map((stat, idx) => (
          <div key={idx} className="flex flex-col gap-2">
            <h2 className="text-4xl md:text-5xl font-black text-primary tracking-tight">
              {stat.value}
            </h2>
            <p className="text-default-500 font-medium text-sm md:text-base">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
