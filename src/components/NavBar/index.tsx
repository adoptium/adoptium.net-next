'use client'

import React, { useState, useEffect, Fragment } from "react"
import { Link, usePathname } from "@/i18n/navigation"
import Image from "next/image"
import {
  Dialog,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react"
import { FaChevronDown, FaRegBell } from "react-icons/fa"
import { BsXLg, BsList } from "react-icons/bs"

import IconSocial from "@/components/IconSocial"
import LanguageSelector from "@/components/LanguageSelector"
import Announcements from "@/components/Announcements"

interface NavItem {
  name: string
  href?: string
  children?: NavItem[]
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

const navigation: NavItem[] = [
  { name: "Join Us", href: "/support-us" },
  { name: "Latest Releases", href: "/temurin/releases" },
  { name: "Marketplace", href: "/marketplace" },
  {
    name: "Projects",
    children: [
      { name: "Eclipse Temurin", href: "/temurin" },
      { name: "Eclipse AQAvit", href: "/aqavit" },
      { name: "Eclipse Mission Control", href: "/jmc" },
      { name: "Eclipse Migration Toolkit", href: "/emt" },
    ],
  },
  {
    name: "Resources",
    children: [
      { name: "Status", href: "https://status.adoptium.net" },
      { name: "Release Notes", href: "/temurin/release-notes" },
      { name: "Installation Guide", href: "/installation" },
      { name: "Documentation", href: "/docs" },
      { name: "FAQs", href: "/docs/faq" },
      { name: "Brand & Promotion", href: "/docs/logo-styleguide" },
    ],
  },
  {
    name: "Community",
    children: [
      { name: "Support", href: "/support" },
      { name: "News", href: "/news" },
      { name: "Events", href: "/events" },
      { name: "Slack", href: "/slack" },
    ],
  },
]

/**
 * A reusable mobile link component that renders a Link (if the href starts with "/")
 * or a regular <a> element. Both get the same classes.
 */
const MobileLink: React.FC<{
  href?: string
  name: string
  activePaths: Set<string>
  onClick?: () => void
}> = ({ href, name, activePaths, onClick }) => {
  const commonClasses = classNames(
    "-mx-3 block rounded-lg px-3 py-2 text-[20px] font-normal leading-7 text-white-900 hover:bg-white-50",
    href && activePaths.has(href) ? "text-rose-600" : "",
  )

  if (href && href.startsWith("/")) {
    return (
      <Link href={href} className={commonClasses} onClick={onClick}>
        {name}
      </Link>
    )
  }
  return (
    <a href={href} className={commonClasses} onClick={onClick}>
      {name}
    </a>
  )
}

/**
 * A tiny divider used between mobile nav items.
 */
const MobileDivider: React.FC = () => (
  <div className="w-full px-3 bg-[#3E3355] h-[1px]"></div>
)

function calculateActivePaths(currentPath: string): Set<string> {
  if (!currentPath) return new Set();

  // Remove locale prefix from current path (e.g., /en-GB/docs/faq -> /docs/faq)
  const removeLocalePrefix = (pathname: string): string => {
    // Match patterns like /en-GB/, /de/, /es/, /fr/, /zh-CN/, etc.
    const localePattern = /^\/[a-z]{2}(-[A-Z]{2})?\//
    return pathname.replace(localePattern, '/')
  }

  const pathWithoutLocale = removeLocalePrefix(currentPath);
  const normalizedCurrentPath = pathWithoutLocale.endsWith('/') ? pathWithoutLocale.slice(0, -1) : pathWithoutLocale;

  // Get all navigation paths to find the most specific match
  const allPaths: { path: string, normalizedPath: string }[] = [];

  navigation.forEach(item => {
    if (item.href) {
      const normalizedPath = item.href.endsWith('/') ? item.href.slice(0, -1) : item.href;
      allPaths.push({ path: item.href, normalizedPath });
    }
    if (item.children) {
      item.children.forEach(child => {
        if (child.href) {
          const normalizedPath = child.href.endsWith('/') ? child.href.slice(0, -1) : child.href;
          allPaths.push({ path: child.href, normalizedPath });
        }
      })
    }
  });

  // Find all matching paths
  const matchingPaths = allPaths.filter(({ normalizedPath }) =>
    normalizedCurrentPath === normalizedPath || normalizedCurrentPath.startsWith(normalizedPath + '/')
  );

  // If no matches, return empty set
  if (matchingPaths.length === 0) return new Set();

  // Find the longest (most specific) matching path
  const longestMatch = matchingPaths.reduce((longest, current) =>
    current.normalizedPath.length > longest.normalizedPath.length ? current : longest
  );

  // Only highlight the most specific match
  return new Set([longestMatch.path]);
}

const NavBar = ({ locale }: { locale: string }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showLastSlide, setShowLastSlide] = useState(false)
  const [showAnnouncement, setShowAnnouncement] = useState(false)
  const [activeLastSlide, setActiveLastSlide] = useState<NavItem | null>(null)
  // To prevent hydration mismatch, we'll start with no active paths
  const [activePaths, setActivePaths] = useState<Set<string>>(new Set())
  const pathname = usePathname();

  useEffect(() => {
    if (!mobileMenuOpen) {
      setShowLastSlide(false)
    }
  }, [mobileMenuOpen])

  // Calculate active paths on client-side only after initial render
  useEffect(() => {
    if (typeof window !== "undefined") {
      const paths = calculateActivePaths(pathname);
      setActivePaths(paths);
    }
  }, [pathname]);

  const openLastSlideHandler = (item: NavItem) => {
    setShowLastSlide(true)
    setActiveLastSlide(item)
  }

  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <header
      className={`sticky inset-x-0 top-0 z-50 ${scrolled
        ? "bg-[#200E46] border-b-2 border-[#3E3355]/85 backdrop-blur-xl"
        : ""
        }`}
    >
      {showAnnouncement && (
        <Announcements handleClose={() => setShowAnnouncement(false)} />
      )}
      {/* Container div to center the nav content */}
      <div className="max-w-[1288px] w-full mx-auto px-3">
        <nav
          className="flex items-center gap-5 justify-between py-6"
          aria-label="Global"
        >
          <Link href="/">
            <Image
              src="/images/adoptium-logo-dark.svg"
              alt="Adoptium Logo"
              width={0}
              height={0}
              className="h-10 w-auto"
            />
          </Link>
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex lg:gap-6 xl:gap-x-12">
              {navigation.map(item =>
                item.children ? (
                  <Menu
                    as="div"
                    key={`desktop-${item.name}`}
                    className="relative inline-block text-left"
                  >
                    <div>
                      <MenuButton className="inline-flex w-full gap-2 justify-center rounded-md text-sm font-semibold text-white-900 hover:bg-white-50">
                        {item.name}
                        <FaChevronDown
                          className="-mr-1 mt-1"
                          aria-hidden="true"
                        />
                      </MenuButton>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <MenuItems
                        className="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-[#0E002A] shadow-lg ring-1 ring-black/5 focus:outline-hidden"
                        style={{ minWidth: "max-content" }}
                      >
                        <div className="py-6 px-4">
                          {item.children.map(child => (
                            <MenuItem key={`mobile-${child.name}`} as="div">
                              {() => (
                                <MobileLink
                                  href={child.href}
                                  name={child.name}
                                  activePaths={activePaths}
                                />
                              )}
                            </MenuItem>
                          ))}
                        </div>
                      </MenuItems>
                    </Transition>
                  </Menu>
                ) : item.href ? (
                  <Link
                    key={`desktop-${item.name}`}
                    href={item.href}
                    className={classNames(
                      "text-sm font-semibold leading-6 text-white-900",
                      item.href && activePaths.has(item.href) ? "text-rose-600" : ""
                    )}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <a
                    key={`desktop-${item.name}`}
                    href={item.href}
                    className={classNames(
                      "text-sm font-semibold leading-6 text-white-900",
                      item.href && activePaths.has(item.href) ? "text-rose-600" : ""
                    )}
                  >
                    {item.name}
                  </a>
                ),
              )}
            </div>
            <div className="flex space-x-3 h-12">
              <div className="hidden sm:block">
                <LanguageSelector locale={locale} />
              </div>
              <div className="p-3 h-full rounded-3xl border-2 border-gray-700 justify-start items-center gap-3 inline-flex cursor-pointer">
                <div
                  aria-label="notifications"
                  onClick={() => setShowAnnouncement(!showAnnouncement)}
                  className="relative"
                >
                  <FaRegBell size={20} />
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white font-bold flex items-center justify-center">
                    1
                  </span>
                </div>
              </div>
            </div>
            <div className="flex lg:hidden ml-3">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md text-white-700"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open main menu</span>
                <div className="border-2 border-[#3e3355] p-3 rounded-full">
                  <BsList className="text-2xl" />
                </div>
              </button>
            </div>
          </div>
        </nav>
      </div>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed flex-col h-full flex inset-y-0 right-0 z-50 w-full overflow-y-auto bg-purple px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Eclipse Adoptium</span>
              <Image
                className="h-8 mb-0 w-auto"
                src="/images/adoptium-logo-dark.svg"
                alt="Adoptium Logo"
                width={0}
                height={0}
              />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-white-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <div className="border-2 border-[#3e3355] p-3 rounded-full">
                <BsXLg className="text-xl" />
              </div>
            </button>
          </div>
          <div className="mt-6 grow relative w-full h-full overflow-hidden flow-root">
            {/* Mobile menu – main navigation */}
            <div
              className={`-my-6 absolute duration-200 h-full left-0 w-full divide-y divide-white-500/10 ${showLastSlide ? "left-[-100%]" : ""
                }`}
            >
              <div className="space-y-2 py-6">
                {navigation.map((item, index) => (
                  <div key={item.name}>
                    {item.children ? (
                      <div
                        onClick={() => openLastSlideHandler(item)}
                        className="flex items-center justify-between"
                      >
                        <div className="-mx-3 block rounded-lg px-3 py-2 text-[20px] font-normal leading-7 text-white-900 hover:bg-white-50">
                          {item.name}
                        </div>
                        <svg
                          width="8"
                          height="12"
                          viewBox="0 0 8 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1.5 11L6.5 6L1.5 1"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    ) : (
                      <div className="flex justify-between">
                        <MobileLink
                          href={item.href}
                          name={item.name}
                          activePaths={activePaths}
                          onClick={() => setMobileMenuOpen(false)}
                        />
                      </div>
                    )}
                    {navigation.length !== index + 1 && <MobileDivider />}
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile menu – last slide (child links) */}
            <div
              className={`absolute duration-200 w-full h-full ${showLastSlide ? "left-0" : "left-full"
                }`}
            >
              <div
                onClick={() => setShowLastSlide(false)}
                className="flex items-center space-x-3"
              >
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="1"
                    y="1"
                    width="46"
                    height="46"
                    rx="23"
                    stroke="#3E3355"
                    strokeWidth="2"
                  />
                  <path
                    d="M31 24H17"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M24 31L17 24L24 17"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-[20px] text-white font-[400]">
                  {activeLastSlide && activeLastSlide.name}
                </span>
              </div>

              <div className="space-y-2 w-full py-6">
                {activeLastSlide &&
                  activeLastSlide.children?.map((item, index) => (
                    <div key={index}>
                      <div className="flex w-full justify-between">
                        <MobileLink
                          href={item.href}
                          name={item.name}
                          activePaths={activePaths}
                          onClick={() => setMobileMenuOpen(false)}
                        />
                      </div>
                      {activeLastSlide.children &&
                        index !== activeLastSlide.children.length - 1 && (
                          <MobileDivider />
                        )}
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Social media and announcement */}
          {!showLastSlide && (
            <div className="border-t-[1px] border-[#3E3355] space-y-3 pt-6">
              <div className="flex items-center justify-between">
                <IconSocial
                  link="https://twitter.com/adoptium"
                  className="text-2xl"
                  icon="twitter"
                />
                <IconSocial
                  link="https://www.linkedin.com/showcase/adoptium/"
                  className="text-2xl"
                  icon="linkedin"
                />
                <IconSocial
                  link="https://www.youtube.com/c/EclipseAdoptium"
                  className="text-2xl"
                  icon="youtube"
                />
                <IconSocial
                  link="https://github.com/adoptium"
                  className="text-2xl"
                  icon="github"
                />
                <IconSocial
                  link="https://adoptium.slack.com/"
                  className="text-2xl"
                  icon="slack"
                />
                <IconSocial
                  link="https://bsky.app/profile/adoptium.net"
                  className="text-2xl"
                  icon="bluesky"
                />
                <IconSocial
                  link="https://fosstodon.org/@adoptium"
                  className="text-2xl"
                  icon="mastodon"
                />
              </div>
              <div className="sm:hidden w-full mt-6">
                <LanguageSelector locale={locale} />
              </div>
            </div>
          )}
        </DialogPanel>
      </Dialog>
    </header>
  )
}

export default NavBar
