export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 pt-24">
        <div className="bg-card py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold">Privacy Policy</h1>
            <p className="text-muted-foreground mt-2">
              Effective April 15, 2025
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-bold mt-8 mb-4">1. Introduction</h2>
            <p>
              RiskModels (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is
              committed to protecting your privacy. This Privacy Policy explains
              how we collect, use, disclose, and safeguard your information when
              you use our website and services.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">
              2. Information We Collect
            </h2>

            <h3 className="text-xl font-semibold mt-6 mb-3">
              2.1 Personal Information
            </h3>
            <p>
              We may collect personal information that you voluntarily provide
              to us when you:
            </p>
            <ul className="list-disc pl-6 my-4">
              <li>Create an account</li>
              <li>Sign up for our services</li>
              <li>Contact us for support</li>
              <li>Subscribe to our newsletter</li>
            </ul>
            <p>This information may include:</p>
            <ul className="list-disc pl-6 my-4">
              <li>Name and contact information</li>
              <li>Email address</li>
              <li>Company information</li>
              <li>Payment information</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">2.2 Usage Data</h3>
            <p>
              We automatically collect certain technical data when you use our
              site:
            </p>
            <ul className="list-disc pl-6 my-4">
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Pages visited</li>
              <li>Time spent on pages</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">
              3. How We Use Your Information
            </h2>
            <p>We use the collected information for purposes including:</p>
            <ul className="list-disc pl-6 my-4">
              <li>Providing and maintaining our services</li>
              <li>Notifying you about changes to our services</li>
              <li>Providing customer support</li>
              <li>
                Gathering insights and usage data to improve functionality
              </li>
              <li>Monitoring and preventing unauthorized access</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">4. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your
              personal information. However, no method of transmission over the
              Internet is 100% secure. While we strive to use commercially
              acceptable means to protect your information, we cannot guarantee
              its absolute security.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">
              5. Third-Party Services
            </h2>
            <p>
              We may use third-party services (such as analytics tools and email
              providers) to help operate our platform. These services may
              collect and use data according to their own privacy policies. We
              encourage you to review their terms before interacting with them.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 my-4">
              <li>Access the personal data we hold about you</li>
              <li>Correct any inaccuracies in your data</li>
              <li>Request deletion of your information</li>
              <li>Object to certain data processing activities</li>
              <li>Request a copy of your data in a portable format</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
