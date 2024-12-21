'use client'
import { FC } from 'react';
import { Card, Typography, List, ListItem, Button } from '@mui/material'; // veya kullandığınız UI kütüphanesi

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
}

const DashboardRegisteredEvents: FC = () => {
  // Bu kısmı kendi API'niz veya veri kaynağınıza göre düzenleyebilirsiniz
  const registeredEvents: Event[] = [
    {
      id: '1',
      title: 'React Konferansı',
      date: '2024-02-15',
      location: 'İstanbul'
    },
    // Diğer etkinlikler...
  ];

  return (
    <Card sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Kayıtlı Olduğunuz Etkinlikler
      </Typography>
      
      {registeredEvents.length === 0 ? (
        <Typography>Henüz bir etkinliğe kayıt olmadınız.</Typography>
      ) : (
        <List>
          {registeredEvents.map((event) => (
            <ListItem
              key={event.id}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                borderBottom: '1px solid #eee'
              }}
            >
              <div>
                <Typography variant="subtitle1">{event.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {event.date} - {event.location}
                </Typography>
              </div>
              <Button variant="outlined" size="small">
                Detaylar
              </Button>
            </ListItem>
          ))}
        </List>
      )}
    </Card>
  );
};

export default DashboardRegisteredEvents;
