import Link from "next/link";
import { Logo } from "@/components/site/shared/logo.comp";
import { MEMBER_PAGE_COPY } from "@/constants/members.const";
import "./member-header.section.css";

// The top of a musician's page, drawn like the home page's hero: the ivory
// monogram in the top-left corner, leading home, and an arrow in a ring on
// the right back to the members' row. No bar, no rule, no menu: the page reads
// as a sheet opened from the home page.
export function MemberHeader() {
  return (
    <header className="member-header">
      <div className="member-header__inner">
        <Logo theme="ivory" height={40} href="/" />
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
