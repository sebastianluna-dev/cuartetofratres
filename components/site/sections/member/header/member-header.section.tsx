import Link from "next/link";
import { Logo } from "@/components/site/shared/logo.comp";
import { MEMBER_PAGE_COPY } from "@/constants/members.const";
import "./member-header.section.css";

// The bar of a musician's page: only the monogram, which leads to the home
// page, and an arrow on the right back to the members' row. No section menu:
// the page reads as a sheet opened from the home page.
export function MemberHeader() {
  return (
    <header className="member-header">
      <div className="member-header__inner">
        <Logo theme="lime" height={42} href="/" />
        <Link href="/#integrantes" className="member-header__back" aria-label={MEMBER_PAGE_COPY.back}>
          <svg className="member-header__back-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path
              d="M20 12H5M11 6l-6 6 6 6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </header>
  );
}
