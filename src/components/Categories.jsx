import {
  Code,
  HeartPulse,
  BrainCircuit,
  GraduationCap,
  HardHat,
  ShieldCheck,
} from "lucide-react";

const categories = [
  {
    name: "Artificial Intelligence",
    count: "142 Ideas",
    icon: BrainCircuit,
    color: "text-purple-500 bg-purple-500/10",
  },
  {
    name: "FinTech & Blockchain",
    count: "98 Ideas",
    icon: Code,
    color: "text-blue-500 bg-blue-500/10",
  },
  {
    name: "Health & BioTech",
    count: "76 Ideas",
    icon: HeartPulse,
    color: "text-rose-500 bg-rose-500/10",
  },
  {
    name: "EduTech Solutions",
    count: "114 Ideas",
    icon: GraduationCap,
    color: "text-amber-500 bg-amber-500/10",
  },
  {
    name: "SaaS Platforms",
    count: "135 Ideas",
    icon: ShieldCheck,
    color: "text-emerald-500 bg-emerald-500/10",
  },
  {
    name: "Green Tech & Energy",
    count: "53 Ideas",
    icon: HardHat,
    color: "text-cyan-500 bg-cyan-500/10",
  },
];

export default function Categories() {
  return (
    <section className="py-20 max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
          Browse by High-Growth Categories
        </h2>
        <p className="text-neutral-500 dark:text-neutral-400 mt-3 max-w-xl mx-auto text-sm md:text-base">
          Target markets that are ripe for disruption and new visionaries.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat, idx) => {
          const IconComponent = cat.icon;
          return (
            <div
              key={idx}
              className="cursor-pointer border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 hover:border-blue-500/50 dark:hover:border-blue-500/40 transition-all duration-300 rounded-2xl shadow-sm p-6 flex items-center gap-5 group"
            >
              {/* Icon Wrapper */}
              <div
                className={`p-4 rounded-xl shrink-0 transition-transform duration-300 group-hover:scale-110 ${cat.color}`}
              >
                <IconComponent size={26} />
              </div>

              {/* Text Info */}
              <div className="text-left">
                <h3 className="font-bold text-lg text-neutral-800 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-500 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-neutral-400 dark:text-neutral-500 text-sm mt-0.5 font-medium">
                  {cat.count}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
