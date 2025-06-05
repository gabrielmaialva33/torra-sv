<script>
  import { createEventDispatcher } from 'svelte';
  import InputField from '../../../components/ui/InputField.svelte';
  import Button from '../../../components/ui/Button.svelte';

  export let filters = {};
  export let stores = [];

  const dispatch = createEventDispatcher();

  let localFilters = { ...filters };

  function handleApplyFilters() {
    dispatch('change', localFilters);
  }

  function handleResetFilters() {
    localFilters = {
      startDate: '',
      endDate: '',
      reportType: 'all',
      store: ''
    };
    dispatch('change', localFilters);
  }
</script>

<div class="reports-filters">
  <div class="filters-grid">
    <div class="filter-group">
      <label for="startDate">Data Inicial</label>
      <InputField
        id="startDate"
        type="date"
        bind:value={localFilters.startDate}
        placeholder="Selecione a data inicial"
      />
    </div>

    <div class="filter-group">
      <label for="endDate">Data Final</label>
      <InputField
        id="endDate"
        type="date"
        bind:value={localFilters.endDate}
        placeholder="Selecione a data final"
      />
    </div>

    <div class="filter-group">
      <label for="reportType">Tipo de Relatório</label>
      <select
        id="reportType"
        bind:value={localFilters.reportType}
        class="filter-select"
      >
        <option value="all">Todos</option>
        <option value="orders">Pedidos</option>
        <option value="pickups">Retiradas</option>
        <option value="storage">Armazenamento</option>
        <option value="lockers">Lockers</option>
      </select>
    </div>

    <div class="filter-group">
      <label for="store">Loja</label>
      <select
        id="store"
        bind:value={localFilters.store}
        class="filter-select"
      >
        <option value="">Todas as lojas</option>
        {#each stores as store}
          <option value={store.id}>{store.name}</option>
        {/each}
      </select>
    </div>
  </div>

  <div class="filter-actions">
    <Button variant="secondary" on:click={handleResetFilters}>
      Limpar Filtros
    </Button>
    <Button variant="primary" on:click={handleApplyFilters}>
      Aplicar Filtros
    </Button>
  </div>
</div>

<style>
  .reports-filters {
    background: #FFFFFF;
    border: 1px solid #DBE2EB;
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 2rem;
    box-shadow: 0px 6px 8px rgba(4, 4, 7, 0.1);
  }

  .filters-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .filter-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .filter-group label {
    font-size: 0.875rem;
    font-weight: 500;
    color: #4B5563;
  }

  .filter-select {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1px solid #D1D5DB;
    border-radius: 5px;
    font-size: 0.9375rem;
    font-family: 'Roboto', sans-serif;
    transition: all 0.3s ease;
    background-color: #FFFFFF;
  }

  .filter-select:focus {
    outline: none;
    border-color: #FF5101;
    box-shadow: 0 0 0 3px rgba(255, 81, 1, 0.1);
  }

  .filter-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #EBECF1;
  }

  @media (max-width: 768px) {
    .filters-grid {
      grid-template-columns: 1fr;
    }

    .filter-actions {
      flex-direction: column-reverse;
    }
  }
</style>
