"use client";
import { AnimatePresence, anticipate, motion } from "motion/react";
import CrosshairCorners from "../Graphics/CrosshairCorners";
import { useTranslations } from "next-intl";
import Icon from "../Icon/Icon";
import Button from "../Button/Button";
import { usePersistentStore } from "@/stores/store";
import DepletingHeart from "../Icon/icons/DepletingHeart";
import { useState } from "react";

export default function MarketingBanner() {
  const t = useTranslations();
  const { setMarketingBannerViewed, _hasHydrated, marketingBannerViewed } =
    usePersistentStore();

  const [closeHeart, setCloseHeart] = useState(false);

  function handleCloseBanner() {
    setCloseHeart(true);
    setTimeout(() => {
      setMarketingBannerViewed(true);
    }, 500);
  }
  return (
    <AnimatePresence>
      {_hasHydrated && !marketingBannerViewed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: [0.8, 0, 0.6, 0, 0.4, 0, 0.2, 0], height: 40 }}
          transition={{ duration: 1, ease: anticipate }}
          className="h-[60px] sm:h-[40px] relative items-center justify-center w-full bg-[#102127] border-y border-brand-primary/15 backdrop-blur-xl"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.2, 1, 0.4, 1, 0.6, 1, 0.8, 1] }}
            transition={{ duration: 1, ease: anticipate, delay: 0.3 }}
            className="h-full px-4 sm:px-0 sm:pl-[28px] sm:pr-6 bg-background/40 w-full sm:w-max gap-y-1 sm:gap-y-0 gap-x-4 flex flex-col sm:flex-row md:items-center justify-center mx-auto relative"
          >
            <div className="flex sm:items-center gap-x-1.5 sm:gap-x-2 relative">
              <DepletingHeart
                closeHeart={closeHeart}
                className="mt-[3px] sm:mt-0"
              />
              <span className="text-sm font-medium text-brand-primary sm:block hidden">
                {t("marketing_banner.title")}
              </span>
              <span className="relative z-10 text-sm font-medium text-brand-primary inline-block sm:hidden max-w-[50%]">
                Consider{" "}
                <a
                  href={process.env.NEXT_PUBLIC_STAKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-primary underline"
                >
                  staking
                </a>{" "}
                to help improve Blueshift
              </span>
            </div>

            <a
              href={process.env.NEXT_PUBLIC_STAKING_URL}
              target="_blank"
              className="hidden sm:block"
            >
              <Button size="xs" label={t("marketing_banner.button")} />
            </a>

            <CrosshairCorners
              className="text-brand-primary hidden sm:flex"
              size={6}
              thickness={1.25}
              baseDelay={0.3}
            />
          </motion.div>
          <button
            onClick={() => handleCloseBanner()}
            className="z-10 text-brand-secondary transition hover:text-brand-primary hover:cursor-pointer h-[32px] w-[32px] flex items-center justify-center absolute right-3 top-1/2 -translate-y-1/2 bg-background/60 sm:bg-transparent hover:bg-background/60"
          >
            <Icon name="Close" size={16 as 18} />
          </button>
          <motion.div
            className="pointer-events-none w-full h-full absolute inset-0 flex items-center justify-center mx-auto"
            initial={{ width: "0%", opacity: 0 }}
            animate={{ width: "100%", opacity: 1 }}
            transition={{ duration: 0.3, ease: anticipate }}
          >
            <CrosshairCorners
              thickness={1.5}
              size={6}
              animationDuration={0}
              baseDelay={0}
              variant="bordered"
              className="text-brand-primary"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
