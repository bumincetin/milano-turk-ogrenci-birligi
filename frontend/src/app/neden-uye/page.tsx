import IndexSectionHeadersWhitePattern2 from "@/components/common/headers-white-pattern/IndexSectionHeadersWhitePattern2"
import IndexSectionFootersWhitePattern14 from '@/components/common/footers-white-pattern/IndexSectionFootersWhitePattern14'
import WhyMembershipSection from '@/components/membership/WhyMembershipSection'

export default function NedenUye() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
            <IndexSectionHeadersWhitePattern2 />
            <WhyMembershipSection />
            <IndexSectionFootersWhitePattern14 />
        </div>
    )
}