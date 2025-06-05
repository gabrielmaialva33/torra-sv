<script>
  import { createEventDispatcher } from 'svelte';
  import Button from '../../../components/ui/Button.svelte';
  import InputField from '../../../components/ui/InputField.svelte';

  export let stores = [];

  const dispatch = createEventDispatcher();

  let selectedStore = '';
  let startDate = '';
  let endDate = '';
  let reportType = 'complete';

  function handleClose() {
    dispatch('close');
  }

  function handleGenerate() {
    if (!selectedStore || !startDate || !endDate) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    // Implementar geração do relatório
    console.log('Generate store report:', {
      store: selectedStore,
      startDate,
      endDate,
      reportType
    });

    handleClose();
  }
</script>

<div class="modal-overlay" on:click={handleClose}>
  <div class="modal-content" on:click|stopPropagation>
    <div class="modal-header">
      <h2>Relatório por Loja</h2>
      <button class="close-button" on:click={handleClose}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <path d="M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
    </div>

    <div class="modal-body">
      <div class="form-group">
        <label for="store">Selecione a Loja</label>
        <select
          id="store"
          bind:value={selectedStore}
          class="form-select"
        >
          <option value="">Selecione uma loja</option>
          {#each stores as store}
            <option value={store.id}>{store.name} - {store.code}</option>
          {/each}
        </select>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="modalStartDate">Data Inicial</label>
          <InputField
            id="modalStartDate"
            type="date"
            bind:value={startDate}
            placeholder="Selecione a data"
          />
        </div>

        <div class="form-group">
          <label for="modalEndDate">Data Final</label>
          <InputField
            id="modalEndDate"
            type="date"
            bind:value={endDate}
            placeholder="Selecione a data"
          />
        </div>
      </div>

      <div class="form-group">
        <label>Tipo de Relatório</label>
        <div class="radio-group">
          <label class="radio-label">
            <input
              type="radio"
              value="complete"
              bind:group={reportType}
              class="radio-input"
            />
            <span>Completo</span>
          </label>
          <label class="radio-label">
            <input
              type="radio"
              value="summary"
              bind:group={reportType}
              class="radio-input"
            />
            <span>Resumido</span>
          </label>
          <label class="radio-label">
            <input
              type="radio"
              value="detailed"
              bind:group={reportType}
              class="radio-input"
            />
            <span>Detalhado</span>
          </label>
        </div>
      </div>

      <div class="report-info">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 1C4.13 1 1 4.13 1 8C1 11.87 4.13 15 8 15C11.87 15 15 11.87 15 8C15 4.13 11.87 1 8 1ZM8 13C5.24 13 3 10.76 3 8C3 5.24 5.24 3 8 3C10.76 3 13 5.24 13 8C13 10.76 10.76 13 8 13Z" fill="#3B82F6"/>
          <path d="M7 7H9V11H7V7ZM7 5H9V6H7V5Z" fill="#3B82F6"/>
        </svg>
        <p>O relatório será gerado em PDF e enviado para seu e-mail cadastrado.</p>
      </div>
    </div>

    <div class="modal-footer">
      <Button variant="secondary" on:click={handleClose}>
        Cancelar
      </Button>
      <Button variant="primary" on:click={handleGenerate}>
        Gerar Relatório
      </Button>
    </div>
  </div>
</div>

<style>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 1rem;
  }

  .modal-content {
    background: #FFFFFF;
    border-radius: 8px;
    box-shadow: 0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04);
    width: 100%;
    max-width: 600px;
    max-height: 90vh;
    overflow-y: auto;
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    border-bottom: 1px solid #EBECF1;
  }

  .modal-header h2 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1A1630;
    margin: 0;
  }

  .close-button {
    background: none;
    border: none;
    cursor: pointer;
    color: #6B7280;
    padding: 0.5rem;
    transition: color 0.2s;
  }

  .close-button:hover {
    color: #1A1630;
  }

  .modal-body {
    padding: 1.5rem;
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  .form-group label {
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    color: #4B5563;
    margin-bottom: 0.5rem;
  }

  .form-select {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1px solid #D1D5DB;
    border-radius: 5px;
    font-size: 0.9375rem;
    font-family: 'Roboto', sans-serif;
    transition: all 0.3s ease;
    background-color: #FFFFFF;
  }

  .form-select:focus {
    outline: none;
    border-color: #FF5101;
    box-shadow: 0 0 0 3px rgba(255, 81, 1, 0.1);
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .radio-group {
    display: flex;
    gap: 1.5rem;
  }

  .radio-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    font-size: 0.875rem;
    color: #374151;
  }

  .radio-input {
    width: 1rem;
    height: 1rem;
    accent-color: #FF5101;
    cursor: pointer;
  }

  .report-info {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    padding: 1rem;
    background-color: #EFF6FF;
    border-radius: 6px;
    margin-top: 1.5rem;
  }

  .report-info p {
    margin: 0;
    font-size: 0.875rem;
    color: #1E40AF;
    line-height: 1.5;
  }

  .modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    padding: 1.5rem;
    border-top: 1px solid #EBECF1;
  }

  @media (max-width: 640px) {
    .form-row {
      grid-template-columns: 1fr;
    }

    .radio-group {
      flex-direction: column;
      gap: 0.75rem;
    }

    .modal-footer {
      flex-direction: column-reverse;
    }
  }
</style>
