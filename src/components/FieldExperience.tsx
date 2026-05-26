import { motion } from "framer-motion";
import { useState } from "react";
import { ExternalLink, ChevronRight } from "lucide-react";
import { AnnotationTooltip } from "./AnnotationTooltip";

interface FieldEntry {
  label: string;
  timestamp: string;
  location: string;
  context: string;
  problemExposure: string;
  dataInteraction: string;
  thinkingEvolution: string;
  practicalImpact: string;
  reflection: string;
  snippet?: { lang: string; code: string };
  link?: { url: string; label: string };
}

const fieldLog: FieldEntry[] = [
  {
    label: "Academic Research Simulation",
    timestamp: "2019–2020",
    location: "University Research Lab",
    context:
      "Embedded in a computational biology lab studying gene expression patterns across tissue types. First sustained exposure to high-dimensional data where domain knowledge mattered more than model complexity.",
    problemExposure:
      "Dimensionality reduction that preserves biological meaning, not just variance. PCA explained the math but lost the biology.",
    dataInteraction:
      "RNA-seq count matrices, gene ontology annotations, clinical metadata. Learned to distrust clean datasets — the cleaning choices shaped every downstream result.",
    thinkingEvolution:
      "Shifted from 'find the best model' to 'understand the data generation process.' Started asking what the numbers actually represent before modeling them.",
    practicalImpact:
      "Co-authored analysis pipeline adopted by three other lab groups. Built reproducible workflows that outlasted my time there.",
    reflection:
      "The most important skill I developed wasn't statistical — it was learning to ask domain experts the right questions.",
    snippet: {
      lang: "python",
      code: "# the moment I stopped trusting defaults\nscaler = StandardScaler()  # why center genes differently expressed?",
    },
  },
  {
    label: "E-commerce Data Exploration",
    timestamp: "2020–2021",
    location: "Mid-size Retail Company",
    context:
      "Joined a growing e-commerce operation where data existed in abundance but insight was scarce. Dashboards everywhere, decisions nowhere.",
    problemExposure:
      "Customer behavior prediction when the pandemic reshuffled every historical pattern. Models trained on 2019 data became liabilities in 2020.",
    dataInteraction:
      "Clickstream logs, transaction histories, A/B test results, inventory feeds. Dealt with real missing data — not textbook MCAR, but data that was missing because of system failures and business decisions.",
    thinkingEvolution:
      "Learned that model accuracy on a test set means nothing if the business can't act on the prediction. Started designing models around decision thresholds, not loss functions.",
    practicalImpact:
      "Built a demand sensing system that reduced overstock by 18%. More importantly, taught the merchandising team to interpret uncertainty intervals.",
    reflection:
      "Production ML is 20% modeling and 80% convincing stakeholders that uncertainty is not weakness.",
    snippet: {
      lang: "sql",
      code: "-- when 'active users' meant 5 different things\nSELECT definition FROM metrics WHERE name = 'active' -- 23 rows",
    },
    link: {
      url: "#",
      label: "related experiment: CLV under uncertainty",
    },
  },
  {
    label: "Freelance Data Visualization Work",
    timestamp: "2021–2022",
    location: "Various Clients · Remote",
    context:
      "Worked with nonprofits and journalists to turn complex datasets into understandable visual narratives. Every project had a different audience and a different definition of 'clear.'",
    problemExposure:
      "Communicating statistical nuance to non-technical audiences without dumbing it down. The challenge wasn't the visualization — it was choosing what to leave out.",
    dataInteraction:
      "Census data, environmental monitoring, public health records, survey results. Each dataset came with its own political context and potential for misinterpretation.",
    thinkingEvolution:
      "Realized that a misleading accurate chart is worse than an approximate honest one. Started treating visualization as an ethical practice, not just a technical one.",
    practicalImpact:
      "Visualizations published in two regional outlets. One project influenced local policy discussion on housing affordability.",
    reflection:
      "The best visualization I made was one where I convinced the client to show less data, not more.",
  },
  {
    label: "Self-Directed Machine Learning Project",
    timestamp: "2022–2023",
    location: "Independent Research",
    context:
      "Spent six months deeply studying causal inference methods after repeatedly encountering correlation-as-causation thinking in business settings. Built a personal research agenda around practical causal ML.",
    problemExposure:
      "Estimating treatment effects from observational data where randomized experiments are impossible or unethical. The gap between 'what correlates' and 'what causes' in real decision-making.",
    dataInteraction:
      "Synthetic datasets for method validation, public health observational studies, economic panel data. Deliberately chose messy, realistic data over benchmark datasets.",
    thinkingEvolution:
      "Moved from predictive thinking to causal thinking. Started asking 'would this prediction change if we intervened?' before building any model.",
    practicalImpact:
      "Developed a reusable causal analysis toolkit. Applied double ML methods to a real pricing problem, identifying a $400K/year pricing inefficiency.",
    reflection:
      "The hardest part of causal inference isn't the math — it's defending your assumptions honestly.",
    snippet: {
      lang: "python",
      code: "# correlation ≠ causation, but also:\n# causation requires assumptions you can't test from data alone",
    },
    link: {
      url: "#",
      label: "notebook: causal ML experiments",
    },
  },
];

export const FieldExperience = () => {
  return (
    <div className="relative">
      {/* Evolution line */}
      <div className="absolute left-0 md:left-4 top-0 bottom-0 w-px bg-border" />
      <motion.div
        className="absolute left-0 md:left-4 top-0 w-px bg-primary/40"
        initial={{ height: 0 }}
        whileInView={{ height: "100%" }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: "easeOut" }}
      />

      <div className="space-y-24 pl-8 md:pl-16">
        {fieldLog.map((entry, index) => (
          <FieldLogEntry key={entry.label} entry={entry} index={index} />
        ))}
      </div>

      {/* Evolution summary */}
      <motion.div
        className="mt-20 pl-8 md:pl-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        <div className="code-block text-[11px] max-w-lg">
          <span className="text-muted-foreground"># looking back</span>
          <br />
          <span className="text-primary">trajectory</span> = [
          <br />
          <span className="text-accent ml-4">
            "models → systems thinking"
          </span>
          ,
          <br />
          <span className="text-accent ml-4">
            "accuracy → decision quality"
          </span>
          ,
          <br />
          <span className="text-accent ml-4">
            "prediction → causal reasoning"
          </span>
          ,
          <br />
          <span className="text-accent ml-4">
            "solo analysis → collaborative sensemaking"
          </span>
          <br />]
        </div>
      </motion.div>
    </div>
  );
};

const FieldLogEntry = ({
  entry,
  index,
}: {
  entry: FieldEntry;
  index: number;
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      {/* Timeline node */}
      <div className="absolute -left-8 md:-left-16 top-1 flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-primary/60 ring-4 ring-background" />
      </div>

      {/* Header metadata */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span className="font-mono text-[10px] text-primary tracking-widest uppercase">
          {entry.timestamp}
        </span>
        <span className="text-muted-foreground/30 text-xs">·</span>
        <span className="font-mono text-[10px] text-muted-foreground">
          {entry.location}
        </span>
      </div>

      {/* Label */}
      <h3 className="font-heading text-lg md:text-xl text-foreground mb-3">
        {entry.label}
      </h3>

      {/* Context */}
      <p className="text-secondary-foreground text-sm leading-relaxed mb-6 max-w-2xl">
        {entry.context}
      </p>

      {/* Core fields - revealed on scroll */}
      <motion.div
        className="space-y-4 mb-6"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <FieldBlock
          label="problem exposure"
          content={entry.problemExposure}
        />
        <FieldBlock
          label="data interaction"
          content={entry.dataInteraction}
        />
      </motion.div>

      {/* Expandable deeper content */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="font-mono text-[11px] text-primary/70 hover:text-primary transition-colors flex items-center gap-1 mb-4"
      >
        <ChevronRight
          className={`w-3 h-3 transition-transform ${expanded ? "rotate-90" : ""}`}
        />
        {expanded ? "collapse" : "thinking evolution & impact"}
      </button>

      {expanded && (
        <motion.div
          className="space-y-4 mb-6"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
        >
          <FieldBlock
            label="thinking evolution"
            content={entry.thinkingEvolution}
          />
          <FieldBlock
            label="practical impact"
            content={entry.practicalImpact}
          />
        </motion.div>
      )}

      {/* Reflection annotation */}
      <div className="mb-4">
        <AnnotationTooltip annotation={entry.reflection}>
          <span className="font-mono text-[10px] text-accent/60 hover:text-accent transition-colors">
            ✦ hover for reflection
          </span>
        </AnnotationTooltip>
      </div>

      {/* Optional snippet */}
      {entry.snippet && (
        <motion.div
          className="code-block text-[11px] max-w-md mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <span className="text-muted-foreground whitespace-pre-wrap">
            {entry.snippet.code}
          </span>
        </motion.div>
      )}

      {/* Optional link */}
      {entry.link && (
        <a
          href={entry.link.url}
          className="inline-flex items-center gap-1.5 font-mono text-[11px] text-primary/50 hover:text-primary transition-colors"
        >
          <ExternalLink className="w-3 h-3" />
          {entry.link.label}
        </a>
      )}
    </motion.div>
  );
};

const FieldBlock = ({
  label,
  content,
}: {
  label: string;
  content: string;
}) => (
  <div className="border-l border-border/60 pl-4">
    <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest block mb-1">
      {label}
    </span>
    <p className="text-secondary-foreground text-sm leading-relaxed max-w-2xl">
      {content}
    </p>
  </div>
);
