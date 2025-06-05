<script>
  import { createEventDispatcher } from 'svelte';
  import Button from '../../../components/ui/Button.svelte';

  export let tickets = [];

  const dispatch = createEventDispatcher();

  function formatDate(date) {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  function getStatusColor(status) {
    const colors = {
      open: '#F59E0B',
      in_progress: '#3B82F6',
      resolved: '#10B981',
      closed: '#6B7280'
    };
    return colors[status] || '#6B7280';
  }

  function getStatusLabel(status) {
    const labels = {
      open: 'Aberto',
      in_progress: 'Em Andamento',
      resolved: 'Resolvido',
      closed: 'Fechado'
    };
    return labels[status] || status;
  }

  function getPriorityLabel(priority) {
    const labels = {
      low: 'Baixa',
      medium: 'Média',
      high: 'Alta',
      urgent: 'Urgente'
    };
    return labels[priority] || priority;
  }

  function getPriorityColor(priority) {
    const colors = {
      low: '#10B981',
      medium: '#F59E0B',
      high: '#EF4444',
      urgent: '#DC2626'
    };
    return colors[priority] || '#6B7280';
  }

  function handleViewTicket(ticket) {
    dispatch('view', ticket);
  }
</script>

<div class="tickets-container">
  {#if tickets.length === 0}
    <div class="empty-state">
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" class="empty-icon">
        <path d="M32 8C18.745 8 8 18.745 8 32C8 45.255 18.745 56 32 56C45.255 56 56 45.255 56 32C56 18.745 45.255 8 32 8ZM32 52C20.954 52 12 43.046 12 32C12 20.954 20.954 12 32 12C43.046 12 52 20.954 52 32C52 43.046 43.046 52 32 52Z" fill="#9CA3AF"/>
        <path d="M32 18C30.895 18 30 18.895 30 20V32C30 33.105 30.895 34 32 34C33.105 34 34 33.105 34 32V20C34 18.895 33.105 18 32 18Z" fill="#9CA3AF"/>
        <path d="M32 38C30.895 38 30 38.895 30 40C30 41.105 30.895 42 32 42C33.105 42 34 41.105 34 40C34 38.895 33.105 38 32 38Z" fill="#9CA3AF"/>
      </svg>
      <h3>Nenhum chamado encontrado</h3>
      <p>Você ainda não possui chamados abertos.</p>
      <p>Clique em "Novo Chamado" para iniciar um atendimento.</p>
    </div>
  {:else}
    <div class="tickets-grid">
      {#each tickets as ticket}
        <div class="ticket-card">
          <div class="ticket-header">
            <div class="ticket-info">
              <h3 class="ticket-title">{ticket.title}</h3>
              <p class="ticket-id">#{ticket.id}</p>
            </div>
            <span 
              class="status-badge" 
              style="background-color: {getStatusColor(ticket.status)}20; color: {getStatusColor(ticket.status)}"
            >
              {getStatusLabel(ticket.status)}
            </span>
          </div>

          <p class="ticket-description">{ticket.description}</p>

          <div class="ticket-meta">
            <div class="meta-item">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1.5C4.41 1.5 1.5 4.41 1.5 8C1.5 11.59 4.41 14.5 8 14.5C11.59 14.5 14.5 11.59 14.5 8C14.5 4.41 11.59 1.5 8 1.5ZM8 13C5.24 13 3 10.76 3 8C3 5.24 5.24 3 8 3C10.76 3 13 5.24 13 8C13 10.76 10.76 13 8 13Z" fill="#6B7280"/>
                <path d="M8.5 5H7V9L10.25 11.04L11 9.92L8.5 8.25V5Z" fill="#6B7280"/>
              </svg>
              <span>{formatDate(ticket.createdAt)}</span>
            </div>
            <div class="meta-item">
              <span 
                class="priority-badge"
                style="color: {getPriorityColor(ticket.priority)}"
              >
                {getPriorityLabel(ticket.priority)}
              </span>
            </div>
          </div>

          <div class="ticket-footer">
            <div class="responses">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M14 1.5H2C1.175 1.5 0.5 2.175 0.5 3V11C0.5 11.825 1.175 12.5 2 12.5H4V14.5L7.5 12.5H14C14.825 12.5 15.5 11.825 15.5 11V3C15.5 2.175 14.825 1.5 14 1.5Z" fill="#6B7280"/>
              </svg>
              <span>{ticket.commentsCount || 0} respostas</span>
            </div>
            <Button variant="text" size="small" on:click={() => handleViewTicket(ticket)}>
              Ver detalhes
            </Button>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .tickets-container {
    background: #FFFFFF;
    border: 1px solid #DBE2EB;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0px 6px 8px rgba(4, 4, 7, 0.1);
  }

  .empty-state {
    text-align: center;
    padding: 4rem 2rem;
  }

  .empty-icon {
    margin-bottom: 1.5rem;
    opacity: 0.5;
  }

  .empty-state h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1A1630;
    margin: 0 0 0.5rem 0;
  }

  .empty-state p {
    color: #6B7280;
    margin: 0.25rem 0;
  }

  .tickets-grid {
    display: grid;
    gap: 1.5rem;
  }

  .ticket-card {
    border: 1px solid #EBECF1;
    border-radius: 8px;
    padding: 1.5rem;
    transition: all 0.2s;
  }

  .ticket-card:hover {
    border-color: #FF5101;
    box-shadow: 0px 4px 6px rgba(255, 81, 1, 0.1);
  }

  .ticket-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
  }

  .ticket-info h3 {
    font-size: 1.125rem;
    font-weight: 600;
    color: #1A1630;
    margin: 0 0 0.25rem 0;
  }

  .ticket-id {
    font-size: 0.875rem;
    color: #6B7280;
    margin: 0;
  }

  .status-badge {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 500;
  }

  .ticket-description {
    color: #4B5563;
    margin: 0 0 1rem 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .ticket-meta {
    display: flex;
    gap: 1.5rem;
    margin-bottom: 1rem;
  }

  .meta-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: #6B7280;
  }

  .priority-badge {
    font-weight: 500;
  }

  .ticket-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 1rem;
    border-top: 1px solid #F3F4F6;
  }

  .responses {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: #6B7280;
  }

  @media (max-width: 768px) {
    .ticket-header {
      flex-direction: column;
      gap: 0.5rem;
    }

    .ticket-meta {
      flex-direction: column;
      gap: 0.5rem;
    }
  }
</style>
