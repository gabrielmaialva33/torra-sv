<script>
  import Button from '../../../components/ui/Button.svelte';

  export let reports = [];

  function formatDate(date) {
    return new Date(date).toLocaleDateString('pt-BR');
  }

  function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  }

  function getStatusColor(status) {
    const colors = {
      completed: '#10B981',
      pending: '#F59E0B',
      cancelled: '#EF4444',
      processing: '#3B82F6'
    };
    return colors[status] || '#6B7280';
  }

  function downloadReport(report) {
    // Implementar download do relatório
    console.log('Download report:', report);
  }
</script>

<div class="reports-table-container">
  <table class="reports-table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Tipo</th>
        <th>Período</th>
        <th>Loja</th>
        <th>Total de Pedidos</th>
        <th>Valor Total</th>
        <th>Status</th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody>
      {#if reports.length === 0}
        <tr>
          <td colspan="8" class="empty-state">
            <div class="empty-content">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" class="empty-icon">
                <path d="M40 8H8C5.79 8 4 9.79 4 12V36C4 38.21 5.79 40 8 40H40C42.21 40 44 38.21 44 36V12C44 9.79 42.21 8 40 8ZM40 36H8V20H40V36ZM40 16H8V12H40V16Z" fill="#9CA3AF"/>
              </svg>
              <p>Nenhum relatório encontrado</p>
              <p class="empty-subtitle">Ajuste os filtros para ver os relatórios</p>
            </div>
          </td>
        </tr>
      {:else}
        {#each reports as report}
          <tr>
            <td class="report-id">#{report.id}</td>
            <td class="report-type">
              <span class="type-badge type-{report.type}">
                {report.typeLabel}
              </span>
            </td>
            <td class="report-period">
              {formatDate(report.startDate)} - {formatDate(report.endDate)}
            </td>
            <td class="report-store">{report.storeName}</td>
            <td class="report-orders">{report.totalOrders}</td>
            <td class="report-value">{formatCurrency(report.totalValue)}</td>
            <td class="report-status">
              <span 
                class="status-badge" 
                style="background-color: {getStatusColor(report.status)}20; color: {getStatusColor(report.status)}"
              >
                {report.statusLabel}
              </span>
            </td>
            <td class="report-actions">
              <Button variant="text" size="small" on:click={() => downloadReport(report)}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M13 9V13H3V9H2V13C2 13.55 2.45 14 3 14H13C13.55 14 14 13.55 14 13V9H13Z" fill="currentColor"/>
                  <path d="M8 10L11.5 6.5L10.79 5.79L8.5 8.09V2H7.5V8.09L5.21 5.79L4.5 6.5L8 10Z" fill="currentColor"/>
                </svg>
              </Button>
            </td>
          </tr>
        {/each}
      {/if}
    </tbody>
  </table>
</div>

<style>
  .reports-table-container {
    background: #FFFFFF;
    border: 1px solid #DBE2EB;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0px 6px 8px rgba(4, 4, 7, 0.1);
  }

  .reports-table {
    width: 100%;
    border-collapse: collapse;
  }

  .reports-table thead {
    background-color: #F9FAFB;
  }

  .reports-table th {
    padding: 1rem;
    text-align: left;
    font-weight: 600;
    font-size: 0.875rem;
    color: #4B5563;
    border-bottom: 1px solid #EBECF1;
  }

  .reports-table td {
    padding: 1rem;
    border-bottom: 1px solid #EBECF1;
  }

  .reports-table tbody tr:hover {
    background-color: #F9FAFB;
  }

  .report-id {
    font-weight: 600;
    color: #1A1630;
  }

  .type-badge {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 500;
    text-transform: uppercase;
  }

  .type-orders {
    background-color: #DBEAFE;
    color: #1E40AF;
  }

  .type-pickups {
    background-color: #D1FAE5;
    color: #065F46;
  }

  .type-storage {
    background-color: #FEF3C7;
    color: #92400E;
  }

  .type-lockers {
    background-color: #EDE9FE;
    color: #5B21B6;
  }

  .status-badge {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 500;
  }

  .report-actions {
    text-align: center;
  }

  .empty-state {
    text-align: center;
    padding: 4rem 2rem;
  }

  .empty-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .empty-icon {
    opacity: 0.5;
  }

  .empty-content p {
    margin: 0;
    color: #6B7280;
  }

  .empty-subtitle {
    font-size: 0.875rem;
    color: #9CA3AF;
  }

  @media (max-width: 768px) {
    .reports-table-container {
      overflow-x: auto;
    }

    .reports-table {
      min-width: 800px;
    }
  }
</style>
