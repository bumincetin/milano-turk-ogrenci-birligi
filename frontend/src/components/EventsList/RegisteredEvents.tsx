'use client';

import { FC, useEffect, useState } from 'react';
import { Card, Typography, List, ListItem, Button, CircularProgress, Box } from '@mui/material';
import { EventsAPI } from '@/services/eventService';
import Cookies from 'js-cookie';
const COOKIE_NAME = process.env.NEXT_PUBLIC_USER_COOKIE_NAME || 'mtob_user'
import { jwtDecode } from 'jwt-decode';

interface Event {
  id: number;
  category: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  event_time?: string | null;
  last_enroll_time?: string | null;
  summary?: string | null;
  details?: string | null;
  blocked?: boolean | null;
  person_limit?: number | null;
  current_person_count?: number | null;
  location?: string | null;
}

interface User {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  name: string;
  lastname?: string | null;
  description?: string | null;
  birthday?: string | null;
  position?: string | null;
  twitter?: string | null;
  linkedin?: string | null;
  website?: string | null;
  createdAt: string;
  updatedAt: string;
  telephone?: string | null;
  universityName: string;
  universityDepartment: string;
  universityClass: string;
  isTeam: boolean;
  avatar?: string | null;
  blog_posts: any[];
  events: Event[];
}

const DashboardRegisteredEvents: FC = () => {
  const [myEvents, setMyEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchEvents = async () => {
      try {

        setLoading(true);
        let token: string = Cookies.get(COOKIE_NAME) as string;
        let user: any = jwtDecode(token as string);

        if (user?.id) {
          const data: User = await EventsAPI.getUsersEvents(user?.id);
          console.log('Gelen kullanıcı verisi:', data);

          if (data?.events) {
            setMyEvents(data.events);
            console.log('Etkinlikler:', data.events);
          }

        }

      } catch (err) {
        console.error('Etkinlikler alınırken hata oluştu:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <Card sx={{ p: 3, mb: 3, boxShadow: 3 }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
        Kayıtlı Olduğunuz Etkinlikler
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <CircularProgress />
        </Box>
      ) : myEvents.length === 0 ? (
        <Typography sx={{ textAlign: 'center', color: 'gray', mt: 2 }}>
          Henüz bir etkinliğe kayıt olmadınız.
        </Typography>
      ) : (
        <List sx={{ mt: 2 }}>
          {myEvents.map((event) => (
            <ListItem
              key={event.id}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid #eee',
                padding: '10px 0',
              }}
            >
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  {event.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {event.location ? event.location : 'Bilinmeyen Lokasyon'}
                </Typography>
              </Box>
              <Button variant="contained" size="small" sx={{ textTransform: 'none' }}>
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
