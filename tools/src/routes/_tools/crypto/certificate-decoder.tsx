import { createFileRoute } from "@tanstack/react-router";
import CertificateDecoderPage from "../../../pages/tools/crypto/CertificateDecoderPage";

export const Route = createFileRoute("/_tools/crypto/certificate-decoder")({
  component: CertificateDecoderPage,
});
