import { TicketData } from '../interfaces/TicketData';
import { ApiMessage } from '../interfaces/ApiMessage';
import Auth from '../utils/auth';
import { buildApiUrl } from '../utils/api';

// Helper function to handle unauthorized responses
const handleUnauthorized = (response: Response) => {
  if (response.status === 401 || response.status === 403) {
    console.log('Authentication error, logging out');
    Auth.logout();
  }
  return response;
};

const retrieveTickets = async () => {
  try {
    const response = await fetch(
      buildApiUrl('/api/tickets/'),
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Auth.getToken()}`
        }
      }
    );
    
    // Handle unauthorized/forbidden responses
    handleUnauthorized(response);
    
    const data = await response.json();

    if(!response.ok) {
      throw new Error('invalid API response, check network tab!');
    }

    return data;
  } catch (err) {
    console.log('Error from data retrieval: ', err);
    return [];
  }
};

const retrieveTicket = async (id: number | null): Promise<TicketData> => {
  try {
    const response = await fetch(
      buildApiUrl(`/api/tickets/${id}`),
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Auth.getToken()}`
        }
      }
    );
    
    // Handle unauthorized/forbidden responses
    handleUnauthorized(response);

    const data = await response.json();

    if(!response.ok) {
      throw new Error('Could not invalid API response, check network tab!');
    }
    return data;
  } catch (err) {
    console.log('Error from data retrieval: ', err);
    return Promise.reject('Could not fetch singular ticket');
  }
}

const createTicket = async (body: TicketData) => {
  try {
    const response = await fetch(
      buildApiUrl('/api/tickets/'), {
        method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Auth.getToken()}`
          },
        body: JSON.stringify(body)
      }
    );
    
    // Handle unauthorized/forbidden responses
    handleUnauthorized(response);
    
    const data = response.json();

    if(!response.ok) {
      throw new Error('invalid API response, check network tab!');
    }

    return data;

  } catch (err) {
    console.log('Error from Ticket Creation: ', err);
    return Promise.reject('Could not create ticket');
  }
}

const updateTicket = async (ticketId: number, body: TicketData): Promise<TicketData> => {
  try {
    const response = await fetch(
      buildApiUrl(`/api/tickets/${ticketId}`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Auth.getToken()}`
        },
        body: JSON.stringify(body)
      }
    );
    
    // Handle unauthorized/forbidden responses
    handleUnauthorized(response);
    
    const data = await response.json();

    if(!response.ok) {
      throw new Error('invalid API response, check network tab!');
    }

    return data;
  } catch (err) {
    console.error('Update did not work', err);
    return Promise.reject('Update did not work');
  }
};

const deleteTicket = async (ticketId: number): Promise<ApiMessage> => {
  try {
    const response = await fetch(
      buildApiUrl(`/api/tickets/${ticketId}`), {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Auth.getToken()}`
        }
      }
    );
    
    // Handle unauthorized/forbidden responses
    handleUnauthorized(response);
    
    const data = await response.json();

    if(!response.ok) {
      throw new Error('invalid API response, check network tab!');
    }

    return data;
  } catch (err) {
    console.error('Error in deleting ticket', err);
    return Promise.reject('Could not delete ticket');
  }
};


export { createTicket, deleteTicket, retrieveTickets, retrieveTicket, updateTicket};