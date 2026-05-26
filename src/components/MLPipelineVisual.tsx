import { motion } from "framer-motion";
import { useState } from "react";
import { AlertTriangle, CheckCircle, HelpCircle } from "lucide-react";

interface ModelingDecision {
  id: string;
  question: string;
  context: string;
  choice: string;
  alternatives: string[];
  tradeoff: string;
  riskControl: string;
  status: "resolved" | "monitored" | "revisit";
}

const modelingDecisions: ModelingDecision[] = [
  {
    id: "data-quality",
    question: "How do we handle missing values without introducing bias?",
    context: "18% of records have incomplete features. Naive imputation would leak information from the target.",
    choice: "Multiple imputation with uncertainty propagation",
    alternatives: ["Mean imputation", "Drop incomplete rows", "Model-based imputation"],
    tradeoff: "Slower inference (3x) but maintains calibration. Worth it for high-stakes decisions.",
    riskControl: "Monitor imputation distribution drift weekly. Alert if KL divergence > 0.1",
    status: "monitored",
  },
  {
    id: "model-complexity",
    question: "When does added complexity stop paying off?",
    context: "Ensemble of 50 trees vs. single regularized model. Marginal accuracy gain: +0.8%",
    choice: "Single gradient boosted model with early stopping",
    alternatives: ["Deep ensemble", "Neural network", "Stacked generalization"],
    tradeoff: "Sacrificed 0.8% accuracy for 10x faster inference and interpretable feature importance.",
    riskControl: "A/B test quarterly. If lift degrades >2%, revisit architecture.",
    status: "resolved",
  },
  {
    id: "threshold",
    question: "How do we set decision thresholds when costs are asymmetric?",
    context: "False negatives cost 5x more than false positives. Standard 0.5 threshold is wrong.",
    choice: "Cost-sensitive threshold at 0.32, optimized on business metric",
    alternatives: ["ROC-optimal threshold", "Precision-recall tradeoff", "Fixed threshold"],
    tradeoff: "Higher false positive rate (+12%) but captures 94% of costly events vs 78% at default.",
    riskControl: "Recalibrate monthly using Platt scaling. Threshold review with stakeholders quarterly.",
    status: "monitored",
  },
  {
    id: "failure-modes",
    question: "What happens when the model encounters out-of-distribution inputs?",
    context: "Production data will drift. Model confidence on OOD samples is unreliable.",
    choice: "Conformal prediction with coverage guarantee + hard rejection rules",
    alternatives: ["Softmax temperature scaling", "Ensemble disagreement", "No safeguard"],
    tradeoff: "5% of predictions deferred to human review. Acceptable for critical decisions.",
    riskControl: "Track rejection rate. Spike above 15% triggers investigation and potential retraining.",
    status: "revisit",
  },
];

const statusConfig = {
  resolved: { icon: CheckCircle, color: "text-primary", label: "Resolved" },
  monitored: { icon: AlertTriangle, color: "text-amber-500", label: "Monitored" },
  revisit: { icon: HelpCircle, color: "text-accent", label: "Revisit" },
};

export const MLPipelineVisual = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
          Key Modeling Decisions
        </div>
        <div className="flex-1 h-px bg-border" />
        <div className="flex gap-4">
          {Object.entries(statusConfig).map(([key, config]) => (
            <div key={key} className="flex items-center gap-1.5">
              <config.icon className={`w-3 h-3 ${config.color}`} />
              <span className="font-mono text-[10px] text-muted-foreground">{config.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Decision cards */}
      <div className="space-y-4">
        {modelingDecisions.map((decision, index) => {
          const StatusIcon = statusConfig[decision.status].icon;
          const isExpanded = expandedId === decision.id;

          return (
            <motion.div
              key={decision.id}
              className="border border-border bg-card/30 hover:bg-card/50 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Question header */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : decision.id)}
                className="w-full text-left p-5 flex items-start gap-4"
              >
                <div className="flex-shrink-0 mt-1">
                  <StatusIcon className={`w-4 h-4 ${statusConfig[decision.status].color}`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-heading text-base text-foreground mb-2 leading-snug">
                    {decision.question}
                  </h4>
                  <p className="font-mono text-[11px] text-muted-foreground leading-relaxed">
                    {decision.context}
                  </p>
                </div>

                <div className="flex-shrink-0 font-mono text-[10px] text-muted-foreground/50">
                  {isExpanded ? "−" : "+"}
                </div>
              </button>

              {/* Expanded content */}
              <motion.div
                initial={false}
                animate={{ 
                  height: isExpanded ? "auto" : 0,
                  opacity: isExpanded ? 1 : 0 
                }}
                className="overflow-hidden"
              >
                <div className="px-5 pb-5 pt-0 border-t border-border/50">
                  <div className="grid md:grid-cols-2 gap-6 pt-5">
                    {/* Decision made */}
                    <div>
                      <span className="font-mono text-[10px] text-primary uppercase tracking-wider block mb-2">
                        Decision
                      </span>
                      <p className="text-sm text-foreground font-medium mb-3">
                        {decision.choice}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {decision.alternatives.map((alt) => (
                          <span
                            key={alt}
                            className="font-mono text-[9px] px-2 py-0.5 bg-muted text-muted-foreground line-through opacity-60"
                          >
                            {alt}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Trade-off */}
                    <div>
                      <span className="font-mono text-[10px] text-accent uppercase tracking-wider block mb-2">
                        Trade-off
                      </span>
                      <p className="text-sm text-secondary-foreground leading-relaxed">
                        {decision.tradeoff}
                      </p>
                    </div>
                  </div>

                  {/* Risk control */}
                  <div className="mt-5 pt-4 border-t border-border/30">
                    <span className="font-mono text-[10px] text-amber-500/80 uppercase tracking-wider block mb-2">
                      Risk Control
                    </span>
                    <p className="font-mono text-[11px] text-muted-foreground leading-relaxed">
                      {decision.riskControl}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Philosophy note */}
      <motion.div
        className="mt-8 pl-4 border-l-2 border-primary/30"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <p className="font-mono text-[11px] text-muted-foreground italic leading-relaxed">
          Every model is a set of decisions. The art isn't finding the "best" model—it's making 
          defensible choices that remain robust when assumptions break.
        </p>
      </motion.div>
    </div>
  );
};
