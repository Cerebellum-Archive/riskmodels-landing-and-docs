import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Database, LineChart, Clock, CheckCircle } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="pt-32 pb-20 hero-gradient">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
              Enhancing Portfolio Management with Hedge Fund Grade Equity Risk
              Models
            </h1>

            <p className="text-lg text-muted-foreground mb-10 animate-fade-in animate-delay-100">
              RiskModels offers sophisticated U.S. equity risk models tailored
              for traders, hedge funds, mutual funds, registered investment
              advisors, and other institutional asset managers to optimize their
              portfolio management strategies. Built on high-quality FactSet
              data, our models incorporate adjustments for dividends, stock
              splits, and other corporate events such as spinoffs, institutional
              grade risk metrics.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in animate-delay-200">
              <Button asChild size="lg" className="metallic-blue-btn">
                <Link href="https://docs.riskmodels.net/docs/usecases/applications">
                  Get Started for Free
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="https://docs.riskmodels.net/docs/bundles-and-pricing/pricing-plans/index.html">
                  Pricing
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="py-24 bg-background" id="ourprocess">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center mb-4">
              <div className="h-[1px] w-12 bg-primary/50"></div>
              <span className="mx-4 text-sm font-semibold">OUR PROCESS</span>
              <div className="h-[1px] w-12 bg-primary/50"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">
              U.S. Equity Exposure and Factor Attribution Data
            </h2>
          </div>

          <p className="text-lg text-center text-muted-foreground max-w-3xl mx-auto mb-16">
            Our U.S. equity risk models provide comprehensive exposure and
            factor attribution data, enabling you to identify, measure, and
            mitigate risks effectively. Here&apos;s an overview of our approach:
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-lg border border-muted/20 hover:border-primary/50 transition-all duration-300">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary/10 mb-6">
                <LineChart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">
                Risk Factor Attribution
              </h3>
              <p className="text-muted-foreground">
                To assess each stock&#39;s sensitivity to movements in
                underlying factors—commonly referred to as beta—we run our
                proprietary regressions that evaluate exposures to market and
                other risk factors.
              </p>
            </div>

            <div className="bg-card p-8 rounded-lg border border-muted/20 hover:border-primary/50 transition-all duration-300">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary/10 mb-6">
                <Database className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">Variance Decomposition</h3>
              <p className="text-muted-foreground">
                Using factor exposures, we decompose risk along the following
                dimensions: 1. Market Risk - The portion of risk explained by
                the overall stock market. 2. Sector Risk - The portion of risk
                driven by sector-specific events. 3. Stock-Specific Risk -
                Unique risks not accounted for by market or sector movements.
              </p>
            </div>

            <div className="bg-card p-8 rounded-lg border border-muted/20 hover:border-primary/50 transition-all duration-300">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary/10 mb-6">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">
                Forecast Horizon Control
              </h3>
              <p className="text-muted-foreground">
                Customize your forecast horizon by extending training windows
                for longer-term predictions, offering more accurate risk
                projections over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Universe Packages Section */}
      <section className="py-24 bg-card" id="packages">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Universe Packages
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              RiskModels provides the essential data for your portfolio
              optimization and performance reporting needs. Begin with a free
              trial of our Testing package or select from one of the packages
              below, customized to fit the size of your U.S. equity universe:
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <Image
                src="/images/nvda_variance_histogram.png"
                alt="NVDA Risk Analysis Upper"
                width={600}
                height={350}
                className="rounded-lg shadow-lg mb-8"
              />
              <Image
                src="/images/fang_residuals.png"
                alt="NVDA Risk Analysis Lower"
                width={600}
                height={350}
                className="rounded-lg shadow-lg"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-background p-6 rounded-lg border border-muted/20 hover:shadow-lg hover:border-primary/20 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 mr-3">
                    <Database className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold">Sandbox</h3>
                </div>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-primary mt-1 mr-2 flex-shrink-0" />
                    <span>
                      NVDA, AMZN, GOOG, META, NFLX, JPM, XOM, JNJ, PG, UNH
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-primary mt-1 mr-2 flex-shrink-0" />
                    <span>1 year history</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-primary mt-1 mr-2 flex-shrink-0" />
                    <span>Trial Access</span>
                  </li>
                </ul>
              </div>

              <div className="bg-background p-6 rounded-lg border border-muted/20 hover:shadow-lg hover:border-primary/20 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 mr-3">
                    <Database className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold">Beta 500</h3>
                </div>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-primary mt-1 mr-2 flex-shrink-0" />
                    <span>Top 500 U.S. equities</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-primary mt-1 mr-2 flex-shrink-0" />
                    <span>2 year history</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-primary mt-1 mr-2 flex-shrink-0" />
                    <span>Market & Sector Betas & Factor Returns</span>
                  </li>
                </ul>
              </div>

              <div className="bg-background p-6 rounded-lg border border-muted/20 hover:shadow-lg hover:border-primary/20 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 mr-3">
                    <Database className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold">Simulation 1500</h3>
                </div>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-primary mt-1 mr-2 flex-shrink-0" />
                    <span>Top 1500 U.S equities</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-primary mt-1 mr-2 flex-shrink-0" />
                    <span>10 year history</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-primary mt-1 mr-2 flex-shrink-0" />
                    <span>
                      Betas, Factor Returns, Residual Returns, Universe Mask
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-primary mt-1 mr-2 flex-shrink-0" />
                    <span>Simulation capabilities</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-primary mt-1 mr-2 flex-shrink-0" />
                    <span>Nightly bucket delivery</span>
                  </li>
                </ul>
              </div>

              <div className="bg-background p-6 rounded-lg border border-muted/20 hover:shadow-lg hover:border-primary/20 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 mr-3">
                    <Database className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold">Simulation 3000</h3>
                </div>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-primary mt-1 mr-2 flex-shrink-0" />
                    <span>Top 3000 U.S. equities</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-primary mt-1 mr-2 flex-shrink-0" />
                    <span>15 year history</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-primary mt-1 mr-2 flex-shrink-0" />
                    <span>
                      Betas, Factor Returns, Residual Returns, Universe Mask
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-primary mt-1 mr-2 flex-shrink-0" />
                    <span>Full Simulation capabilities</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-primary mt-1 mr-2 flex-shrink-0" />
                    <span>Nightly bucket delivery</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-background" id="about">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <span className="text-sm font-semibold tracking-wider">
                    ABOUT US
                  </span>
                  <div className="ml-4 h-[1px] w-10 bg-muted-foreground/50"></div>
                </div>
                <p className="text-xl text-muted-foreground">
                  RiskModels is an offering of Blue Water Macro Corp, a
                  data-driven quant firm founded in 2021. RiskModels empowers
                  finance professionals from traders to institutional asset
                  managers with precise, actionable insights to optimize their
                  portfolio management processes.
                </p>
              </div>
            </div>

            <div className="relative pl-8 border-l border-muted/20">
              <div className="absolute left-[-5px] top-[60px] w-[10px] h-[10px] rounded-full bg-primary"></div>

              <div>
                <h3 className="text-sm font-semibold tracking-wider mb-2">
                  INNOVATIVE LEADERSHIP IN RISK MANAGEMENT
                </h3>
                <h2 className="text-3xl font-bold mb-4">
                  Experienced Leadership
                </h2>
                <p className="text-muted-foreground mb-8">
                  Our mission is to make risk modeling more accessible and
                  actionable for investment professionals, empowering them with
                  the tools to make better-informed portfolio decisions.
                </p>

                <div className="space-y-8">
                  <div>
                    <h4 className="text-xl font-bold mb-2">Team:</h4>
                    <a
                      href="https://www.linkedin.com/in/conrad-gann/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-semibold hover:text-primary transition-colors"
                    >
                      Conrad Gann
                    </a>
                    <p className="text-muted-foreground mt-2">
                      Conrad Gann is a seasoned financial executive with
                      extensive experience in investment management and fintech.
                      As the founder of RiskModels and Blue Water Macro, LLC,
                      Conrad brings over 30 years of industry expertise to help
                      investors make more informed decisions. His background
                      includes leadership roles across asset management firms
                      where he developed innovative approaches to risk modeling
                      and portfolio construction.
                    </p>
                  </div>

                  <div>
                    <a
                      href="https://www.linkedin.com/in/richardzling/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-semibold hover:text-primary transition-colors"
                    >
                      Richard Ling
                    </a>
                    <p className="text-muted-foreground mt-2">
                      Richard is a Data Software Engineer with over 11 years of
                      industry experience, including a background in Mechanical
                      Engineering where he contributed to designing helicopter
                      hardware for NASA. Driven by a passion for investment and
                      finance, he transitioned into data science and software
                      engineering to combine analytical and technical expertise,
                      delivering innovative and unique solutions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 text-center">
          <Button asChild size="lg" className="metallic-blue-btn">
            <Link href="/auth">Join RiskModels Today</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
