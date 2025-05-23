"use client";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { DialogTitle } from "@headlessui/react";
import { AlertSquareIcon } from "hugeicons-react";
import { IS_MAIN_PRODUCTION_DOMAIN } from "../utils";
import { AnimatedModal } from "./AnimatedComponents";

export const Disclaimer = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (IS_MAIN_PRODUCTION_DOMAIN) {
      return;
    }

    const hasAcceptedDisclaimer = localStorage.getItem("hasAcceptedDisclaimer");
    if (!hasAcceptedDisclaimer) {
      setIsOpen(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("hasAcceptedDisclaimer", "true");
    setIsOpen(false);
  };

  const handleClose = () => {
    toast.error("Consent declined. Redirecting to production site...");
    window.location.href = "https://noblocks.xyz";
  };

  return (
    <AnimatedModal isOpen={isOpen} onClose={() => {}} maxWidth="28.5rem">
      <div className="space-y-4">
        <AlertSquareIcon className="size-6 text-icon-outline-secondary dark:text-white/50" />

        <DialogTitle className="text-lg font-semibold text-text-body dark:text-white">
          Disclaimer Notice
        </DialogTitle>

        <div className="flex flex-col gap-4">
          <div className="space-y-4 text-sm text-text-secondary dark:text-white/50">
            <p>
              This is the beta version of Noblocks. For the stable production
              release, please visit{" "}
              <a
                href="https://noblocks.xyz"
                target="_blank"
                rel="noreferrer noopener"
                className="underline underline-offset-1 hover:text-lavender-500"
              >
                noblocks.xyz
              </a>
              .
            </p>
            <p>
              Warning: This beta application may contain experimental features
              and bugs. While functional, it is intended for testing new
              features and may be unstable. Use at your own risk.
            </p>
          </div>

          <div className="mt-2 flex flex-col-reverse gap-3 xsm:flex-row">
            <button
              type="button"
              onClick={handleClose}
              className="min-h-11 w-full rounded-xl bg-accent-gray py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-accent-gray/90 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 xsm:w-auto xsm:px-6"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleAccept}
              className="min-h-11 w-full flex-grow rounded-xl bg-lavender-500 py-2 text-sm font-medium text-white transition-colors hover:bg-lavender-600 xsm:w-auto xsm:px-6"
            >
              I understand
            </button>
          </div>
        </div>
      </div>
    </AnimatedModal>
  );
};
