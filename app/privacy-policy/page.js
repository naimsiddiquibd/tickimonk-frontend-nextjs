import React from 'react';

const page = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 shadow-sm rounded-lg pt-28 lg:pt-32">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">Privacy Policy</h1>
      <p className="mb-4 text-gray-600">At Tikimonk, we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and protect your data when you use our platform.</p>
      
      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">1. Information Collection</h2>
        <p className="text-gray-600">We collect personal information you provide to us directly when you create an account, purchase tickets, or interact with our platform. This may include your name, email address, phone number, and payment information.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">2. Use of Information</h2>
        <ul className="list-disc list-inside text-gray-600">
          <li>We use your information to provide and improve our services, process transactions, and communicate with you regarding events, updates, and promotions.</li>
          <li>We may also use your information for internal analytics to enhance the user experience.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">3. Data Sharing</h2>
        <p className="text-gray-600">We do not sell or share your personal information with third parties for marketing purposes. However, we may share your data with trusted partners to facilitate services, such as payment processors, or when required by law.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">4. Security of Your Information</h2>
        <p className="text-gray-600">We take reasonable measures to protect your personal data from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">5. Cookies</h2>
        <ul className="list-disc list-inside text-gray-600">
          <li>We use cookies and similar tracking technologies to track activity on our platform and hold certain information. You can instruct your browser to refuse all cookies or indicate when a cookie is being sent.</li>
          <li>If you do not accept cookies, some parts of our platform may not function properly.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">6. Data Retention</h2>
        <p className="text-gray-600">We will retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">7. Your Rights</h2>
        <ul className="list-disc list-inside text-gray-600">
          <li>You have the right to access, correct, or delete your personal information at any time by contacting us through your account settings or customer support.</li>
          <li>You may also object to the processing of your personal information or request a restriction on processing in certain cases.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">8. Changes to the Privacy Policy</h2>
        <p className="text-gray-600">We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically to stay informed about how we are protecting your information.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">9. Contact Us</h2>
        <p className="text-gray-600">If you have any questions or concerns about this Privacy Policy, please contact us at support@tikimonk.com.</p>
      </section>
    </div>
  );
};

export default page;
