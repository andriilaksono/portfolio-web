import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { AnimatedDataPoints } from "@/components/AnimatedDataPoints";
import { SectionLabel } from "@/components/SectionLabel";
import { AnnotationTooltip } from "@/components/AnnotationTooltip";
import { ProjectCard } from "@/components/ProjectCard";
import { MLPipelineVisual } from "@/components/MLPipelineVisual";
import { ExploringSection } from "@/components/ExploringSection";
import { FieldExperience } from "@/components/FieldExperience";

const projects = [
  {
    title: "Predictive Maintenance: Turbofan RUL Prediction & Interpretability",
    problem: "Aircraft engines require accurate Remaining Useful Life (RUL) prediction to prevent unexpected failures and optimize maintenance scheduling across diverse operational conditions.",
    data: "NASA C-MAPSS dataset (FD001-FD004) consisting of multivariate time-series sensor data with varying fault modes and operating conditions.",
    approach: "Developed an end-to-end pipeline comparing attention-based Bi-LSTM and XGBoost. Engineered features using condition-aware K-Means normalization and sliding windows. Applied Explainable AI (SHAP & Integrated Gradients) for model transparency.",
    insight: "Bi-LSTM excels in simpler conditions, but XGBoost shows superior stability in highly complex, multi-fault scenarios (FD004). XAI consensus analysis identified Ps30, NRc, Nc, and BPR as the most reliable degradation indicators.",
    impact: "Bi-LSTM achieved an R² of 0.864 (NASA Score: 392.02) on FD001. XGBoost maintained a robust RMSE of 30.22 on FD004. Delivered a transparent, research-grade decision-support system.",
    tags: ["Machine Learning", "Deep Learning", "Predictive Maintenance", "XGBoost", "Bi-LSTM", "Explainable AI"],
    links: [
      { type: "journal draft" as const, url: "https://drive.google.com/file/d/1WqibQyV3kCuO7nOlzH5IYHqSA7HHUee4/view?usp=sharing", label: "journal draft" },
      { type: "repository" as const, url: "https://github.com/andriilaksono/rul-prediction-turbofan-cmapss.git" },
    ],
  },
  {
    title: "Multimodal Fake News Detection using Deep Learning",
    problem: "Political fake news spreads rapidly across multiple modalities (text, image, audio), making it difficult to detect using traditional single-modality models.",
    data: "Multimodal dataset consisting of political news content including text, images, and audio, enhanced using pseudo-labeling for semi-supervised learning.",
    approach: "Developed an end-to-end multimodal deep learning system using IndoBERT for text, MobileNetV3-Small for images, and Wav2Vec2 for audio. Applied late-fusion techniques to combine predictions from each modality.",
    insight: "Combining multiple modalities significantly improves robustness compared to single-modality models. Semi-supervised pseudo-labeling effectively expands training data.",
    impact: "Achieved 96% accuracy and 95.72% multimodal accuracy. Won 2nd Runner-Up in AI Research/Data Mining Competition.",
    tags: ["Deep Learning", "NLP", "Computer Vision", "Audio Processing", "Transformers", "PyTorch"],
    links: [
      { type: "live demo" as const, url: "https://app-multimodal.streamlit.app/", label: "live demo" },
      { type: "repository" as const, url: "https://github.com/reynaldaryansyah25/multimodal-hoax-detection.git" },
    ],
  },
  {
    title: "Image Super-Resolution using SRGAN",
    problem: "Low-resolution images often lack detail and clarity, limiting their usability in real-world applications.",
    data: "DIV2K dataset with preprocessing including patch extraction, normalization, and downsampling.",
    approach: "Implemented Super-Resolution GAN (SRGAN) to reconstruct high-resolution images and built an inference module for real-world testing.",
    insight: "GAN-based approaches significantly improve perceptual quality compared to traditional interpolation methods.",
    impact: "Achieved up to 36.50 dB PSNR with strong perceptual image quality.",
    tags: ["Deep Learning", "GAN", "Computer Vision", "PyTorch"],
    links: [
      { type: "case-study" as const, url: "#" },
      { type: "repository" as const, url: "https://github.com/reynaldaryansyah25/super-resolution-gan.git" },
    ],
  },
  {
    title: "Data Science Project – ID/X Partners Internship",
    problem: "Businesses need data-driven insights to support risk analysis and decision-making.",
    data: "Real-world business datasets in risk and analytics domain.",
    approach: "Performed data preprocessing, EDA, and applied machine learning models for insight generation.",
    insight: "Feature engineering and data quality significantly influence model performance and business insights.",
    impact: "Delivered actionable insights for decision-making during internship.",
    tags: ["Machine Learning", "Data Analysis", "Business Analytics", "Python", "SQL"],
    links: [
      { type: "case-study" as const, url: "https://drive.google.com/file/d/139A-5UvOe7B8vz3o-dvAPLO97PiuhnRT/view?usp=sharing" },
    ],
  },
];


const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-background noise-overlay">
      <AnimatedDataPoints />
      
      {/* Vertical scroll progress line */}
      <motion.div
        className="fixed left-8 top-0 w-px bg-primary/20 h-full hidden lg:block z-10"
        style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 right-0 p-8 z-50 hidden md:block">
        <ul className="font-mono text-xs text-muted-foreground space-y-2">
          {["thinking", "experiments", "models", "field", "exploring", "contact"].map((item, i) => (
            <li key={item}>
              <a
                href={`#${item}`}
                className="hover:text-primary transition-colors flex items-center gap-2"
              >
                <span className="text-primary/50">{String(i + 1).padStart(2, "0")}</span>
                <span>{item}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <main className="relative z-10 px-6 md:px-12 lg:px-24 xl:px-32 max-w-6xl">
        
        {/* Hero - Asymmetric */}
        <section className="min-h-screen flex flex-col justify-center py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse-glow" />
              <span className="font-mono text-xs text-muted-foreground">
                data scientist / ai engineer / data analyst
              </span>
            </div>
            
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl text-foreground leading-tight mb-8 max-w-4xl">
              Transform{" "}
              <span className="italic text-primary">messy data</span>{" "}
              into{" "}
              <span className="italic">clear insights</span>{" "}
              and{" "}
              <span className="italic text-accent">actionable systems</span>
            </h1>

            <div className="flex flex-col md:flex-row gap-8 mt-12">
              <div className="border-l border-border pl-6">
                <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">Focus</span>
                <p className="text-secondary-foreground mt-2 text-sm max-w-xs">
                  Building predictive models, engineering deep learning architectures, and translating complex datasets into actionable business insights.
                </p>
              </div>
              <div className="border-l border-primary/50 pl-6">
                <span className="font-mono text-[10px] text-primary uppercase tracking-widest">Currently</span>
                <p className="text-secondary-foreground mt-2 text-sm max-w-xs">
                  Developing robust AI applications and expanding my expertise in advanced machine learning algorithms.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-12 left-6 md:left-12 font-mono text-xs text-muted-foreground"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="block rotate-90 origin-left">scroll to explore</span>
          </motion.div>
        </section>

        {/* Section 1: How I Think */}
        <section id="thinking" className="py-32">
          <SectionLabel number="01" label="How I Think with Data" />
          
          <div className="grid md:grid-cols-12 gap-8">
            <div className="md:col-span-7 md:col-start-2">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <p className="font-heading text-2xl md:text-3xl text-foreground leading-relaxed mb-8">
                  Every dataset tells a story. My job is to find the{" "}
                  <AnnotationTooltip 
                    annotation="The question that, once answered, changes the decision"
                    code="signal / noise > threshold"
                  >
                    right questions
                  </AnnotationTooltip>{" "}
                  before looking for answers.
                </p>

                <div className="space-y-6 text-secondary-foreground">
                  <p className="leading-relaxed">
                    I approach problems as{" "}
                    <AnnotationTooltip annotation="Iterative experiments with measurable outcomes">
                      hypotheses to test
                    </AnnotationTooltip>
                    , not puzzles to solve. This means starting with the simplest model that could work, understanding its failures, and building complexity only where the data demands it.
                  </p>

                  <p className="leading-relaxed">
                    Uncertainty isn't a limitation—it's{" "}
                    <AnnotationTooltip 
                      annotation="Quantified uncertainty enables better decisions than false precision"
                      code="P(θ|D) ∝ P(D|θ)P(θ)"
                    >
                      information
                    </AnnotationTooltip>
                    . I build systems that communicate confidence intervals alongside predictions, because knowing what you don't know is often more valuable than a point estimate.
                  </p>

                  <div className="code-block mt-8">
                    <span className="text-muted-foreground"># core principles</span>
                    <br />
                    <span className="text-primary">principles</span> = [
                    <br />
                    <span className="text-accent ml-4">"question first, model second"</span>,
                    <br />
                    <span className="text-accent ml-4">"simple until proven insufficient"</span>,
                    <br />
                    <span className="text-accent ml-4">"uncertainty is a feature"</span>,
                    <br />
                    <span className="text-accent ml-4">"reproducibility by default"</span>
                    <br />
                    ]
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section 2: Experiments & Research */}
        <section id="experiments" className="py-32">
          <SectionLabel number="02" label="Experiments & Research" />
          
          <div className="md:ml-16">
            <motion.p
              className="font-heading text-xl text-muted-foreground italic mb-12 max-w-2xl"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Selected projects presented as research abstracts. Each represents a question I found worth pursuing.
            </motion.p>

            <div className="space-y-16">
              {projects.map((project) => (
                <ProjectCard key={project.title} {...project} />
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Models in Action */}
        <section id="models" className="py-32">
          <SectionLabel number="03" label="Models in Action" />
          
          <div className="md:ml-16">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-secondary-foreground mb-8 max-w-2xl">
                Building reliable models isn't about chasing accuracy metrics. It's about making principled decisions at every stage and knowing when those decisions might fail.
              </p>

              <MLPipelineVisual />
            </motion.div>
          </div>
        </section>

        {/* Section 4: Field Experience */}
        <section id="field" className="py-32">
          <SectionLabel number="04" label="Field Experience" />
          
          <div className="md:ml-16">
            <motion.p
              className="font-heading text-xl text-muted-foreground italic mb-12 max-w-2xl"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Not a résumé. A log of problems encountered, data touched, and ways of thinking that evolved along the way.
            </motion.p>

            <FieldExperience />
          </div>
        </section>

        {/* Section 5: What I'm Exploring */}
        <section id="exploring" className="py-32">
          <SectionLabel number="05" label="What I'm Exploring Next" />
          
          <div className="md:ml-16">
            <motion.p
              className="text-secondary-foreground mb-12 max-w-2xl"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Learning is never finished. These are the areas I'm actively researching, experimenting with, or applying in current work.
            </motion.p>

            <ExploringSection />
          </div>
        </section>

        {/* Section 5: Let's Collaborate */}
        <section id="contact" className="py-32 pb-48">
          <SectionLabel number="06" label="Let's Collaborate" />
          
          <div className="md:ml-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-heading text-2xl md:text-3xl text-foreground mb-8 max-w-2xl">
                Interested in working together on a problem worth solving?
              </p>

              <div className="flex flex-col md:flex-row gap-6">
                <a
                  href="mailto:hello@datalab.dev"
                  className="font-mono text-sm text-primary hover:text-accent transition-colors flex items-center gap-2"
                >
                  <span className="text-muted-foreground">[</span>
                  hello@datalab.dev
                  <span className="text-muted-foreground">]</span>
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm text-primary hover:text-accent transition-colors flex items-center gap-2"
                >
                  <span className="text-muted-foreground">[</span>
                  github
                  <span className="text-muted-foreground">]</span>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm text-primary hover:text-accent transition-colors flex items-center gap-2"
                >
                  <span className="text-muted-foreground">[</span>
                  linkedin
                  <span className="text-muted-foreground">]</span>
                </a>
              </div>

              <p className="text-xs text-muted-foreground mt-12 font-mono">
                Based in Daerah Istimewa Yogyakarta. Open to remote collaboration.
              </p>
            </motion.div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border py-8 px-6 md:px-12 lg:px-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <span className="font-mono text-xs text-muted-foreground">
            © 2024 — Built with curiosity and caffeine
          </span>
          <span className="font-mono text-[10px] text-muted-foreground/50">
            last_updated = "2024.12"
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
