import React from 'react';

const page = () => {
  return (
    <div className="max-w-6xl mx-auto p-6  shadow-sm rounded-lg pt-28 lg:pt-32">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">Terms and Conditions</h1>
      <p className="mb-4 text-gray-600">Welcome to Tikimonk. By using our platform to create, sell, or purchase tickets, you agree to the following terms and conditions. Please read them carefully before proceeding.</p>
      
      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">1. Introduction</h2>
        <p className="text-gray-600">These terms govern your use of our platform, including event creation, ticket sales, and ticket purchases. By creating an account or purchasing a ticket, you agree to be bound by these terms and any other policies referenced here.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">2. Event Creation</h2>
        <ul className="list-disc list-inside text-gray-600">
          <li>As an event organizer, you are responsible for providing accurate information about your event, including dates, times, venue, ticket prices, and any special requirements or restrictions (e.g., age, dress code).</li>
          <li>You are solely responsible for managing your event, including any communication with attendees regarding changes, cancellations, or other matters.</li>
          <li>You agree that all events hosted on the platform comply with local laws and regulations.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">3. Ticket Sales</h2>
        <ul className="list-disc list-inside text-gray-600">
          <li>Event organizers may sell tickets for their events through the platform. Each ticket sale will be subject to a <strong>2% platform fee</strong> deducted from the ticket price, which is non-refundable.</li>
          <li>The platform fee will be automatically deducted at the time of purchase.</li>
          <li>Event organizers are responsible for delivering the service or event as described in the ticket listing.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">4. Ticket Purchases</h2>
        <ul className="list-disc list-inside text-gray-600">
          <li>When you purchase a ticket, you agree to the price and terms set by the event organizer.</li>
          <li>All ticket sales are <strong>final and non-refundable</strong>. Please ensure all event details are correct before completing your purchase.</li>
          <li>The platform is not responsible for any changes to the event made by the organizer, including but not limited to cancellations, reschedules, or modifications.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">5. Platform Fees</h2>
        <p className="text-gray-600">A <strong>2% platform fee</strong> will be applied to every ticket sold, which will be automatically deducted from the sale price at the time of purchase. The platform fee is non-refundable under any circumstances.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">6. Cancellations and Refunds</h2>
        <ul className="list-disc list-inside text-gray-600">
          <li>Event organizers may cancel or reschedule events at their discretion. In the event of a cancellation or change, it is the responsibility of the organizer to notify all ticket holders.</li>
          <li>No refunds will be issued by the platform for ticket purchases, even in the event of cancellation or changes by the event organizer.</li>
          <li>Any disputes related to refunds must be handled directly between the organizer and the ticket purchaser.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">7. User Accounts</h2>
        <ul className="list-disc list-inside text-gray-600">
          <li>You are responsible for maintaining the security of your account and for all activities that occur under your account.</li>
          <li>Misuse of the platform, such as creating fraudulent events, unauthorized sales, or abuse of ticket purchasing, may result in the suspension or termination of your account.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">8. Liability</h2>
        <ul className="list-disc list-inside text-gray-600">
          <li>The platform is not liable for any issues related to the event, including cancellations, delays, or failure to meet expectations. Event organizers bear full responsibility for the delivery and quality of their events.</li>
          <li>The platform will not be liable for any losses or damages resulting from ticket sales, purchases, or event attendance.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">9. Amendments</h2>
        <p className="text-gray-600">We reserve the right to modify these terms at any time. Any changes will be effective immediately upon posting. Your continued use of the platform after changes have been made constitutes your acceptance of the revised terms.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">10. Governing Law</h2>
        <p className="text-gray-600">These terms shall be governed by and construed in accordance with the laws of [your country/region], without regard to conflict of law principles.</p>
      </section>
    </div>
  );
};

export default page;
