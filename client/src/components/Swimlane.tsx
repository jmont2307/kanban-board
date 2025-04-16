import TicketCard from './TicketCard';
import { TicketData } from '../interfaces/TicketData';
import { ApiMessage } from '../interfaces/ApiMessage';

interface SwimlaneProps {
  title: string;
  tickets: TicketData[];
  deleteTicket: (ticketId: number) => Promise<ApiMessage>
}

const Swimlane = ({ title, tickets, deleteTicket }: SwimlaneProps) => {
  return (
    <div className={`swim-lane ${title.replace(' ', '-')}`}>
      <h2>{title}</h2>
      {tickets.length === 0 ? (
        <p className="empty-lane">No tickets in this column</p>
      ) : (
        tickets.map(ticket => (
          <TicketCard 
            key={ticket.id}
            ticket={ticket}
            deleteTicket={deleteTicket}
          />
        ))
      )}
    </div>
  );
};

export default Swimlane;
