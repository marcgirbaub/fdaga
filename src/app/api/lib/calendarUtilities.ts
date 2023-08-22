import { getCalendarEventsMockResponse } from '@/app/api/calendar/mockResponse';

export interface CalendarEvent {
  '@odata.etag': string;
  id: string;
  subject: string;
  bodyPreview: string;
  body: {
    contentType: string;
    content: string;
  };
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
  location: {
    displayName: string;
    locationType: string;
    uniqueId: string;
    uniqueIdType: string;
  };
  locations: {
    displayName: string;
    locationType: string;
    uniqueIdType: string;
  }[];
  attendees: {
    type: string;
    status: {
      response: string;
      time: string;
    };
    emailAddress: {
      name: string;
      address: string;
    };
  }[];
  organizer: {
    emailAddress: {
      name: string;
      address: string;
    };
  };
}

interface CalendarEventsResponse {
  '@odata.context': string;
  value: CalendarEvent[];
}

export interface EventsByDate {
  [date: string]: CalendarEvent[];
}

export const splitCalendarEventsByDate = (calendarEvents: CalendarEvent[]) => {
  const eventsByDate: EventsByDate = {};

  calendarEvents.forEach((event) => {
    const date = event.start.dateTime.split('T')[0];

    if (eventsByDate[date]) {
      eventsByDate[date].push(event);
    } else {
      eventsByDate[date] = [event];
    }
  });

  return eventsByDate;
};

export const getCalendarEvents = async () => {
  try {
    const response: CalendarEventsResponse = getCalendarEventsMockResponse;
    const eventsByDate = splitCalendarEventsByDate(response.value);
    return eventsByDate;
  } catch (error) {
    throw new Error('Error getting calendar events');
  }
};
