import Link from 'next/link'

interface BreadcrumbItem {
  text: string
  href: string
  icon?: React.ReactNode
}

interface DashboardBreadcrumbProps {
  items: BreadcrumbItem[]
  title: string
}

export default function DashboardBreadcrumb({ items, title }: DashboardBreadcrumbProps) {
  return (
    <div className="w-full md:w-1/2 p-2">
      <ul className="flex flex-wrap items-center gap-x-3 mb-2">
        {items.map((item, index) => (
          <li key={index}>
            <Link href={item.href} className="flex font-medium text-xs text-coolGray-500 hover:text-coolGray-700">
              {item.icon}
              <p>{item.text}</p>
            </Link>
            {index < items.length - 1 && (
              <svg width="6" height="15" viewBox="0 0 6 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.34 0.671999L2.076 14.1H0.732L3.984 0.671999H5.34Z" fill="#BBC3CF" />
              </svg>
            )}
          </li>
        ))}
      </ul>
      <h2 className="font-semibold text-black text-3xl">{title}</h2>
    </div>
  )
} 