import DashboardBreadcrumb from './DashboardBreadcrumb'
import DashboardActions from './DashboardActions'

export default function DashboardHeader() {
  const breadcrumbItems = [
    {
      text: "Home",
      href: "/",
      icon: (
        <svg className="mr-2" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.3334 5.33334L9.3334 1.82667C8.96671 1.4987 8.49202 1.31738 8.00006 1.31738C7.50811 1.31738 7.03341 1.4987 6.66673 1.82667L2.66673 5.33334C2.45498 5.52272 2.286 5.75504 2.17104 6.01483C2.05609 6.27463 1.9978 6.55592 2.00006 6.84V12.6667C2.00006 13.1971 2.21078 13.7058 2.58585 14.0809C2.96092 14.456 3.46963 14.6667 4.00006 14.6667H12.0001C12.5305 14.6667 13.0392 14.456 13.4143 14.0809C13.7894 13.7058 14.0001 13.1971 14.0001 12.6667V6.83334C14.0014 6.55038 13.9426 6.27036 13.8277 6.01179C13.7128 5.75322 13.5443 5.52197 13.3334 5.33334Z" fill="#BBC3CF" />
        </svg>
      )
    },
    { text: "Products", href: "/products" },
    { text: "Lorem Ipsum", href: "/lorem-ipsum" }
  ]

  return (
    <section className="bg-white p-8">
      <div className="flex flex-wrap items-center -m-2">
        <DashboardBreadcrumb items={breadcrumbItems} title="Page heading name" />
        <DashboardActions />
      </div>
    </section>
  )
} 