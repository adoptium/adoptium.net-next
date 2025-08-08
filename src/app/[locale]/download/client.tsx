"use client";

import { useSearchParams, redirect } from "next/navigation"
import { capitalize } from "@/utils/capitalize"
import PageHeader from "@/components/Common/PageHeader"
import ImageText from "@/components/ImageText"
import Cta from "@/components/Cta"
import Support from "@/components/WorkingGroup/Support"
import Link from "next/link"
import { useTranslations } from "next-intl"

export default function DownloadPageClient() {
    const t = useTranslations("HomePage")
    const searchParams = useSearchParams()
    const link = searchParams.get("link") || "";
    const vendor = searchParams.get("vendor") || "Adoptium";

    if (!link) {
        redirect("/temurin/releases");
    }

    // Validate allowed download link origins for security
    const allowedOrigins = [
        "https://github.com/adoptium/temurin",
        "https://cdn.azul.com/zulu/",
        "https://aka.ms/download-jdk/",
        "https://github.com/ibmruntimes/",
        "https://github.com/dragonwell-project/",
        "https://developers.redhat.com/"
    ];

    // Use Array.some for efficient matching and avoid prototype pollution
    const isValidLink = allowedOrigins.some(origin => link.startsWith(origin));
    if (!isValidLink) {
        console.error("Invalid download link:", link);
        redirect("/temurin/releases");
    }

    return (
        <div>
            <PageHeader
                title="Thank you for your download!"
                subtitle="Download Success"
                description={
                    <>
                        {link && (
                            <>
                                <meta httpEquiv="refresh" content={`0; url=${link}`} />
                                {vendor === "Adoptium" ? (
                                    <>
                                        You are downloading an Eclipse Temurin build, the open-source
                                        community build from the Eclipse Adoptium Working Group. If the
                                        download doesn&apos;t start in a few seconds, please{" "}
                                        <span className="text-primary underline !underline-offset-[1px]">
                                            <a href={link}>click here</a>
                                        </span>{" "}
                                        to start the download.
                                    </>
                                ) : (
                                    <>
                                        You are downloading a build from <strong>{capitalize(vendor)}</strong>,
                                        a member of the Eclipse Adoptium Working Group. If the download
                                        doesn&apos;t start in a few seconds, please{" "}
                                        <span className="text-primary underline !underline-offset-[1px]">
                                            <a href={link}>click here</a>
                                        </span>{" "}
                                        to start the download.
                                    </>
                                )}
            
            <Cta
                title="Millions Rely on Eclipse Temurin. Your Support Keeps It Going"
                description={t("sustainer-cta-description")}
                linkText={t("sustainer-cta-button")}
                link="https://adoptium.net/sustainers/"
            />
                            </>
                        )}
                    </>
                }
            />

            <ImageText
                title="What to do now?"
                description="You have successfully downloaded Temurin. For more details on usage and configuration, please take a look at our Installation Guide."
                linkText="Installation Guide"
                link="/installation"
            />
            <Support />
        </div>
    )
}
