<script>
  import { onMount } from 'svelte';
  import MainLayout from '../../../layouts/MainLayout.svelte';
  import Button from '../../../components/ui/Button.svelte';
  import Loading from '../../../components/ui/Loading.svelte';
  import ReportsFilters from '../components/ReportsFilters.svelte';
  import ReportsTable from '../components/ReportsTable.svelte';
  import StoreReportsModal from '../components/StoreReportsModal.svelte';
  import { reportService } from '../../../api/services/report.service';

  let isLoading = true;
  let reports = [];
  let filters = {
    startDate: '',
    endDate: '',
    reportType: 'all',
    store: ''
  };
  let showStoreModal = false;
  let stores = [];

  onMount(async () => {
    await loadReports();
    await loadStores();
  });

  async function loadReports() {
    try {
      isLoading = true;
      const response = await reportService.getReports(filters);
      reports = response.data || [];
    } catch (error) {
      console.error('Error loading reports:', error);
    } finally {
      isLoading = false;
    }
  }

  async function loadStores() {
    try {
      const response = await reportService.getStores();
      stores = response.data || [];
    } catch (error) {
      console.error('Error loading stores:', error);
    }
  }

  function handleFilterChange(newFilters) {
    filters = newFilters;
    loadReports();
  }

  function handleExport(format) {
    reportService.exportReport(filters, format);
  }

  function openStoreReports() {
    showStoreModal = true;
  }

  function closeStoreModal() {
    showStoreModal = false;
  }
</script>

<MainLayout>
  <div class="reports-page">
    <div class="page-header">
      <h1 class="page-title">Relatórios</h1>
      <div class="header-actions">
        <Button variant="secondary" on:click={() => handleExport('pdf')}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" class="mr-2">
            <path d="M13 9V13H3V9H2V13C2 13.55 2.45 14 3 14H13C13.55 14 14 13.55 14 13V9H13Z" fill="currentColor"/>
            <path d="M8 10L11.5 6.5L10.79 5.79L8.5 8.09V2H7.5V8.09L5.21 5.79L4.5 6.5L8 10Z" fill="currentColor"/>
          </svg>
          Exportar PDF
        </Button>
        <Button variant="secondary" on:click={() => handleExport('excel')}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" class="mr-2">
            <path d="M13 9V13H3V9H2V13C2 13.55 2.45 14 3 14H13C13.55 14 14 13.55 14 13V9H13Z" fill="currentColor"/>
            <path d="M8 10L11.5 6.5L10.79 5.79L8.5 8.09V2H7.5V8.09L5.21 5.79L4.5 6.5L8 10Z" fill="currentColor"/>
          </svg>
          Exportar Excel
        </Button>
        {#if stores.length > 0}
          <Button variant="primary" on:click={openStoreReports}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" class="mr-2">
              <path d="M4 2V4H12V2H4ZM3 0H13C13.55 0 14 0.45 14 1V5C14 5.55 13.55 6 13 6H3C2.45 6 2 5.55 2 5V1C2 0.45 2.45 0 3 0Z" fill="currentColor"/>
              <path d="M4 8V10H12V8H4ZM3 7H13C13.55 7 14 7.45 14 8V11C14 11.55 13.55 12 13 12H3C2.45 12 2 11.55 2 11V8C2 7.45 2.45 7 3 7Z" fill="currentColor"/>
            </path>
            Relatório por Loja
          </Button>
        {/if}
      </div>
    </div>

    <ReportsFilters {filters} {stores} on:change={handleFilterChange} />

    {#if isLoading}
      <Loading />
    {:else}
      <ReportsTable {reports} />
    {/if}
  </div>

  {#if showStoreModal}
    <StoreReportsModal {stores} on:close={closeStoreModal} />
  {/if}
</MainLayout>

<style>
  .reports-page {
    padding: 1.5rem;
  }

  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  .page-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #1A1630;
  }

  .header-actions {
    display: flex;
    gap: 1rem;
  }

  @media (max-width: 768px) {
    .page-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }

    .header-actions {
      flex-wrap: wrap;
    }
  }
</style>
