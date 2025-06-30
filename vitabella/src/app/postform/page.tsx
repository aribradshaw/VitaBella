
import StatesMap from "@/components/common/StatesMap";
import VitaBellaButton from "@/components/common/VitaBellaButton";
import Link from "next/link";

export default function Page() {
  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "32px 16px", textAlign: "center" }}>
      <h1 style={{ fontWeight: 600, fontSize: "2rem", marginBottom: 16 }}>
        Shoot! We’re not in your state just yet, but working on it!
      </h1>
      <div style={{ width: "100%", margin: "0 auto 24px", maxWidth: 480 }}>
        <StatesMap style={{ width: "100%", height: "auto" }} />
      </div>
      <div style={{ margin: "32px 0 24px", fontSize: 18, color: "#1a3b2a", textAlign: "left" }}>
        <p style={{ marginBottom: 16 }}>
          We appreciate your interest in <b>Vita Bella!</b> At this time, we are not servicing your state.
        </p>
        <p style={{ marginBottom: 16 }}>
          The good news? We’ve got your information, and we’re excited to reach out to you as soon as we can offer our services in your area. Stay tuned—we’ll be in touch!
        </p>
        <p style={{ marginBottom: 16 }}>
          If you have any questions in the meantime, feel free to browse our{' '}
          <Link href="/faq" style={{ color: "var(--e-global-color-dark-green)", textDecoration: "underline" }}>Frequently Asked Questions</Link>.
          Thank you for your patience, and we look forward to connecting with you soon!
        </p>
      </div>
      <div style={{ marginTop: 32, display: "flex", justifyContent: "center" }}>
        <VitaBellaButton
          label="Return Home"
          href="/"
          bg="var(--e-global-color-lightgreen)"
              bgHover="var(--e-global-color-green)"
              text="var(--e-global-color-dark-green)"
              textHover="var(--e-global-color-dark-green)"
              arrowCircleColor="var(--e-global-color-dark-green)"
              arrowCircleColorHover="var(--e-global-color-dark-green)"
              arrowPathColor="var(--e-global-color-lightgreen)"
              arrowPathColorHover="var(--e-global-color-green)"
          style={{ minWidth: 160, fontSize: 18 }}
        />
      </div>
    </div>
  );
}

