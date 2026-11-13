import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/site/sections/shell/footer/footer.section";
import { MemberHeader } from "@/components/site/sections/member/header/member-header.section";
import { MemberOthersSection } from "@/components/site/sections/member/others/member-others.section";
import { MemberProfileSection } from "@/components/site/sections/member/profile/member-profile.section";
import { memberPath } from "@/constants/members.const";
import { SITE_NAME } from "@/constants/site.const";
import { excerpt } from "@/lib/text-blocks";
import { getMemberPage, getMembers } from "@/services/members/members.service";

/** Length of the description search engines show. */
const DESCRIPTION_LENGTH = 160;

// One page per musician, prerendered at build time. A musician added in the
// CMS later is rendered on the first visit and cached; a save in /admin
// expires these pages through the collections' hooks.
export async function generateStaticParams() {
  const members = await getMembers();
  return members.map((member) => ({ slug: member.slug }));
}

export async function generateMetadata({ params }: PageProps<"/integrantes/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const page = await getMemberPage(slug);
  if (!page) return {};
  const { member } = page;
  return {
    title: `${member.shortName} · ${member.instrument} | ${SITE_NAME}`,
    description: excerpt(member.bio, DESCRIPTION_LENGTH),
    alternates: { canonical: memberPath(member.slug) },
  };
}

export default async function MemberPage({ params }: PageProps<"/integrantes/[slug]">) {
  const { slug } = await params;
  const page = await getMemberPage(slug);
  if (!page) notFound();

  return (
    <div className="member-page">
      <MemberHeader />
      <main id="contenido">
        <MemberProfileSection member={page.member} />
        <MemberOthersSection members={page.others} />
      </main>
      <Footer />
    </div>
  );
}
