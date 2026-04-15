import { Header2, Header3, Title } from "@/components/headers";

export default function LegalDisclosure() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 pb-20">
      <Title>Legal Disclosure</Title>
      <Header2>Act on Specified Commercial Transactions</Header2>
      <p className="mt-2">
        Japanese law requires certain information to be displayed for online
        businesses under the Act on Specified Commercial Transactions.
      </p>

      <Header3>Business Name</Header3>
      <p className="mt-2">TokyoAdventureTours</p>

      <Header3>Business Structure</Header3>
      <p className="mt-2">
        This website operates as a platform connecting travelers with
        independent tour guides operating as sole proprietors in Japan.
      </p>
      <p className="mt-3">
        Each guide independently provides the services listed for their
        respective tours.
      </p>

      <Header3>Representative Contact</Header3>
      <p className="mt-2">
        <strong>Email:</strong> contact@tokyoadventuretours.com
      </p>
      <p className="mt-2">
        <strong>Website:</strong> tokyoadventuretours.com
      </p>

      <Header3>Business Location</Header3>
      <p className="mt-2">Tokyo, Japan</p>
      <p className="mt-3">
        (Full address may be provided upon request if required for booking or
        billing purposes.)
      </p>

      <Header3>Services Offered</Header3>
      <p className="mt-2">
        Guided tours, cultural experiences, and travel assistance services
        provided by independent guides.
      </p>

      <Header3>Service Pricing</Header3>
      <p className="mt-2">
        Prices are displayed on each tour listing and are shown in Japanese Yen
        (JPY) unless otherwise stated.
      </p>

      <Header3>Additional Costs</Header3>
      <p className="mt-2">
        Unless explicitly stated in the tour description, customers are
        responsible for:
      </p>
      <ul className="mt-2 list-disc pl-8 space-y-1">
        <li>transportation</li>
        <li>accommodation</li>
        <li>meals</li>
        <li>entrance tickets</li>
        <li>personal expenses</li>
      </ul>

      <Header3>Payment Timing</Header3>
      <p className="mt-2">
        Payment may be required at the time of booking or prior to the start of
        the tour depending on the service.
      </p>

      <Header3>Payment Methods</Header3>
      <p className="mt-2">Accepted payment methods may include:</p>
      <ul className="mt-2 list-disc pl-8 space-y-1">
        <li>credit card</li>
        <li>bank transfer</li>
        <li>digital payment platforms</li>
        <li>cash payment (if arranged with the guide)</li>
      </ul>

      <Header3>Cancellation Policy</Header3>
      <p className="mt-2">
        Cancellation conditions are described in the Terms of Service and may
        vary depending on the specific tour.
      </p>

      <Header3>Service Delivery</Header3>
      <p className="mt-2">
        Tour services are delivered on the date and location agreed upon at the
        time of booking.
      </p>
    </div>
  );
}
