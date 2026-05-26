import { motion } from "framer-motion";

const explorations = [
  {
    topic: "Causal Inference",
    description: "Moving beyond correlation to understand why things happen",
    status: "researching",
    progress: 65,
  },
  {
    topic: "Graph Neural Networks",
    description: "Learning representations on non-Euclidean data structures",
    status: "experimenting",
    progress: 40,
  },
  {
    topic: "Federated Learning",
    description: "Privacy-preserving ML across distributed datasets",
    status: "reading",
    progress: 25,
  },
  {
    topic: "Interpretable ML",
    description: "Making black-box models explain their decisions",
    status: "applying",
    progress: 80,
  },
];

export const ExploringSection = () => {
  return (
    <div className="space-y-6">
      {explorations.map((item, index) => (
        <motion.div
          key={item.topic}
          className="relative"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <div className="flex items-start justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h4 className="font-heading text-lg text-foreground">
                  {item.topic}
                </h4>
                <span className="font-mono text-[10px] px-2 py-0.5 bg-secondary text-primary uppercase">
                  {item.status}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
            
            {/* Progress visualization */}
            <div className="w-32 flex-shrink-0">
              <div className="h-1 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.progress}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                />
              </div>
              <span className="font-mono text-[10px] text-muted-foreground mt-1 block text-right">
                {item.progress}% explored
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
