const getCalendarEventsMockResponse = {
  '@odata.context':
    "https://graph.microsoft.com/v1.0/$metadata#users('cd209b0b-3f83-4c35-82d2-d88a61820480')/events(subject,body,bodyPreview,organizer,attendees,start,end,location)",
  value: [
    {
      '@odata.etag': 'W/"ZlnW4RIAV06KYYwlrfNZvQAAKGWwbw=="',
      id: 'AAMkAGIAAAoZDOFAAA=',
      subject: 'Massatge Oriol ',
      bodyPreview: 'massatge de 30 minuts a les 10:00h. A la sala 1',
      body: {
        contentType: 'html',
        content:
          '<html><head></head><body><p>Dana, this is the time you selected for our orientation. Please bring the notes I sent you.</p></body></html>',
      },
      start: {
        dateTime: '2023-08-21T10:00:00.0000000',
        timeZone: 'Pacific Standard Time',
      },
      end: {
        dateTime: '2023-08-21T12:00:00.0000000',
        timeZone: 'Pacific Standard Time',
      },
      location: {
        displayName: 'Assembly Hall',
        locationType: 'default',
        uniqueId: 'Assembly Hall',
        uniqueIdType: 'private',
      },
      locations: [
        {
          displayName: 'Assembly Hall',
          locationType: 'default',
          uniqueIdType: 'unknown',
        },
      ],
      attendees: [
        {
          type: 'required',
          status: {
            response: 'none',
            time: '0001-01-01T00:00:00Z',
          },
          emailAddress: {
            name: 'Samantha Booth',
            address: 'samanthab@a830edad905084922E17020313.onmicrosoft.com',
          },
        },
        {
          type: 'required',
          status: {
            response: 'none',
            time: '0001-01-01T00:00:00Z',
          },
          emailAddress: {
            name: 'Dana Swope',
            address: 'danas@a830edad905084922E17020313.onmicrosoft.com',
          },
        },
      ],
      organizer: {
        emailAddress: {
          name: 'Samantha Booth',
          address: 'samanthab@a830edad905084922E17020313.onmicrosoft.com',
        },
      },
    },
    // Another event same day
    {
      '@odata.etag': 'W/"ZlnW4RIAV06KYYwlrfNZvQAAKGWwbw=="',
      id: 'AAMkAGIAAAoZDOFAAA=',
      subject: 'Team Meeting',
      bodyPreview: 'Discuss project updates and next steps.',
      body: {
        contentType: 'html',
        content:
          "<html><head></head><body><p>Let's meet to discuss the progress of our project and plan the next steps.</p></body></html>",
      },
      start: {
        dateTime: '2023-08-21T14:00:00.0000000',
        timeZone: 'Pacific Standard Time',
      },
      end: {
        dateTime: '2023-08-21T15:30:00.0000000',
        timeZone: 'Pacific Standard Time',
      },
      location: {
        displayName: 'Conference Room 2',
        locationType: 'default',
        uniqueId: 'Conference Room 2',
        uniqueIdType: 'private',
      },
      locations: [
        {
          displayName: 'Conference Room 2',
          locationType: 'default',
          uniqueIdType: 'unknown',
        },
      ],
      attendees: [
        {
          type: 'required',
          status: {
            response: 'none',
            time: '0001-01-01T00:00:00Z',
          },
          emailAddress: {
            name: 'John Smith',
            address: 'johns@a830edad905084922E17020313.onmicrosoft.com',
          },
        },
        {
          type: 'required',
          status: {
            response: 'none',
            time: '0001-01-01T00:00:00Z',
          },
          emailAddress: {
            name: 'Emily Brown',
            address: 'emilyb@a830edad905084922E17020313.onmicrosoft.com',
          },
        },
      ],
      organizer: {
        emailAddress: {
          name: 'John Smith',
          address: 'johns@a830edad905084922E17020313.onmicrosoft.com',
        },
      },
    },
    // event the following day
    {
      '@odata.etag': 'W/"ZlnW4RIAV06KYYwlrfNZvQAAKGWwbw=="',
      id: 'AAMkAGIAAAoZDOFAAA=',
      subject: 'Client Presentation',
      bodyPreview: 'Present the new product proposal to the client.',
      body: {
        contentType: 'html',
        content:
          "<html><head></head><body><p>We have a client presentation scheduled to showcase our new product proposal. Let's make sure we're well-prepared.</p></body></html>",
      },
      start: {
        dateTime: '2023-08-22T09:30:00.0000000',
        timeZone: 'Pacific Standard Time',
      },
      end: {
        dateTime: '2023-08-22T11:00:00.0000000',
        timeZone: 'Pacific Standard Time',
      },
      location: {
        displayName: 'Client Conference Room',
        locationType: 'default',
        uniqueId: 'Client Conference Room',
        uniqueIdType: 'private',
      },
      locations: [
        {
          displayName: 'Client Conference Room',
          locationType: 'default',
          uniqueIdType: 'unknown',
        },
      ],
      attendees: [
        {
          type: 'required',
          status: {
            response: 'none',
            time: '0001-01-01T00:00:00Z',
          },
          emailAddress: {
            name: 'Alex Johnson',
            address: 'alexj@a830edad905084922E17020313.onmicrosoft.com',
          },
        },
        {
          type: 'required',
          status: {
            response: 'none',
            time: '0001-01-01T00:00:00Z',
          },
          emailAddress: {
            name: 'Jessica Miller',
            address: 'jessicam@a830edad905084922E17020313.onmicrosoft.com',
          },
        },
      ],
      organizer: {
        emailAddress: {
          name: 'Alex Johnson',
          address: 'alexj@a830edad905084922E17020313.onmicrosoft.com',
        },
      },
    },
  ],
};
