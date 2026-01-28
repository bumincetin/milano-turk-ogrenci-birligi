'use client';

import { FC, useEffect, useState } from 'react';
import { Card, Typography, List, ListItem, Button, CircularProgress, Box, Grid } from '@mui/material';
import { EventsAPI } from '@/services/eventService';
import Link from 'next/link';
import { toast } from 'sonner';
import { CalendarToday, LocationOn, Timer, People } from '@mui/icons-material';
import { useAuth } from '@/contexts/AuthContext';

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

const DashboardRegisteredEvents: FC = () => {
  const [myEvents, setMyEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancelingEventId, setCancelingEventId] = useState<number | null>(null);
  const { user, isStaticMode } = useAuth();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        
        if (isStaticMode) {
          // In static mode, show empty state or demo data
          setMyEvents([]);
          return;
        }

        // In production mode with real auth
        if (!user) {
          toast.error('Oturum süreniz dolmuş. Lütfen tekrar giriş yapın.');
          setTimeout(() => {
            window.location.href = '/giris';
          }, 1500);
          return;
        }

      } catch (err) {
        console.error('Etkinlikler alınırken hata oluştu:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [user, isStaticMode]);

  const handleCancelRegistration = async (eventId: number) => {
    if (isStaticMode) {
      toast.info('Bu özellik demo modunda aktif değil.');
      return;
    }

    if (!confirm('Bu etkinlik kaydını iptal etmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      setCancelingEventId(eventId);
      await EventsAPI.cancelEnrollment(eventId);
      
      setMyEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
      toast.success('Etkinlik kaydınız başarıyla iptal edildi.');
    } catch (error: any) {
      console.error('Kayıt iptal hatası:', error);
      toast.error(error.message || 'Kayıt iptal edilirken bir hata oluştu');
    } finally {
      setCancelingEventId(null);
    }
  };

  return (
    <Card sx={{ p: 3, mb: 3, boxShadow: 3 }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
        Kayıtlı Olduğunuz Etkinlikler
      </Typography>

      {isStaticMode && (
        <Box sx={{ mb: 2, p: 2, bgcolor: 'warning.light', borderRadius: 1 }}>
          <Typography variant="body2" color="warning.dark">
            🔔 Demo modu aktif. Kayıtlı etkinlikler gösterilmiyor.
          </Typography>
        </Box>
      )}

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
                flexDirection: { xs: 'column', md: 'row' },
                gap: 2,
                borderRadius: 2,
                backgroundColor: 'background.paper',
                boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
                p: 3,
                mb: 2,
                border: '1px solid',
                borderColor: 'divider',
                '&:hover': {
                  boxShadow: '0 4px 8px rgba(0,0,0,0.12)',
                  transition: 'all 0.3s ease',
                },
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                  {event.title}
                </Typography>
                
                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <CalendarToday sx={{ color: 'primary.main', fontSize: 20 }} />
                      <Typography variant="body2">
                        {new Date(event.event_time || '').toLocaleDateString('tr-TR')}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Timer sx={{ color: 'warning.main', fontSize: 20 }} />
                      <Typography variant="body2">
                        Son Kayıt: {new Date(event.last_enroll_time || '').toLocaleDateString('tr-TR')}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LocationOn sx={{ color: 'error.main', fontSize: 20 }} />
                      <Typography variant="body2">
                        {event.location || 'Bilinmeyen Lokasyon'}
                      </Typography>
                    </Box>
                  </Grid>
                  
                  {event.person_limit && (
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <People sx={{ color: 'info.main', fontSize: 20 }} />
                        <Typography variant="body2">
                          {event.current_person_count || 0} / {event.person_limit} Katılımcı
                        </Typography>
                      </Box>
                    </Grid>
                  )}
                </Grid>
              </Box>

              <Box sx={{ 
                display: 'flex', 
                gap: 2,
                alignSelf: { xs: 'stretch', md: 'center' },
                justifyContent: { xs: 'space-between', md: 'flex-end' }
              }}>
                <Link href={`/dashboard/events/${event.id}`} passHref style={{ textDecoration: 'none' }}>
                  <Button 
                    variant="contained" 
                    size="medium" 
                    sx={{ 
                      textTransform: 'none',
                      minWidth: 120,
                      backgroundColor: 'primary.main',
                      '&:hover': {
                        backgroundColor: 'primary.dark',
                      }
                    }}
                  >
                    Detaylar
                  </Button>
                </Link>
                <Button
                  variant="outlined"
                  color="error"
                  size="medium"
                  sx={{ 
                    textTransform: 'none',
                    minWidth: 120,
                    borderWidth: 2
                  }}
                  onClick={() => handleCancelRegistration(event.id)}
                  disabled={cancelingEventId === event.id}
                >
                  {cancelingEventId === event.id ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CircularProgress size={16} color="error" />
                      <span>İptal Ediliyor</span>
                    </Box>
                  ) : 'Kaydı İptal Et'}
                </Button>
              </Box>
            </ListItem>
          ))}
        </List>
      )}
    </Card>
  );
};

export default DashboardRegisteredEvents;
