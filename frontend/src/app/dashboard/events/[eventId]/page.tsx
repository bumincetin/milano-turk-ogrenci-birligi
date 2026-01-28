import eventsData from '@/data/events.json';
import EventContent from './EventContent';

// Generate static params for all event IDs at build time
export async function generateStaticParams() {
  return eventsData.data.map((event) => ({
    eventId: String(event.id),
  }));
}

export default async function EventDetailPage({ params }: { params: Promise<{ eventId: string }> }) {
  const resolvedParams = await params;
  return <EventContent eventId={resolvedParams.eventId} />;
}
