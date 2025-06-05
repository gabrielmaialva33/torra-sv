<script>
    import {createEventDispatcher} from 'svelte';
    import Button from '../../../components/ui/Button.svelte';
    import InputField from '../../../components/ui/InputField.svelte';

    const dispatch = createEventDispatcher();

    let title = '';
    let category = 'general';
    let priority = 'medium';
    let description = '';

    function handleClose() {
        dispatch('close');
    }

    function handleSubmit() {
        if (!title || !description) {
            alert('Por favor, preencha todos os campos obrigatórios');
            return;
        }

        dispatch('create', {
            title,
            category,
            priority,
            description
        });

        // Reset form
        title = '';
        category = 'general';
        priority = 'medium';
        description = '';
    }
</script>

<div class="modal-overlay" on:click={handleClose}>
    <div class="modal-content" on:click|stopPropagation>
        <div class="modal-header">
            <h2>Novo Chamado</h2>
            <button class="close-button" on:click={handleClose} type="button">
                <svg fill="none" height="24" viewBox="0 0 24 24" width="24">
                    <path d="M18 6L6 18" stroke="currentColor" stroke-linecap="round" stroke-width="2"/>
                    <path d="M6 6L18 18" stroke="currentColor" stroke-linecap="round" stroke-width="2"/>
                </svg>
            </button>
        </div>

        <div class="modal-body">
            <div class="form-group">
                <label for="title">Título do Chamado *</label>
                <InputField
                        bind:value={title}
                        id="title"
                        placeholder="Digite o título do chamado"
                        required
                        type="text"
                />
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label for="category">Categoria</label>
                    <select
                            bind:value={category}
                            class="form-select"
                            id="category"
                    >
                        <option value="general">Geral</option>
                        <option value="order">Pedido</option>
                        <option value="delivery">Entrega</option>
                        <option value="payment">Pagamento</option>
                        <option value="system">Sistema</option>
                        <option value="other">Outro</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="priority">Prioridade</label>
                    <select
                            bind:value={priority}
                            class="form-select"
                            id="priority"
                    >
                        <option value="low">Baixa</option>
                        <option value="medium">Média</option>
                        <option value="high">Alta</option>
                        <option value="urgent">Urgente</option>
                    </select>
                </div>
            </div>

            <div class="form-group">
                <label for="description">Descrição *</label>
                <textarea
                        bind:value={description}
                        class="form-textarea"
                        id="description"
                        placeholder="Descreva detalhadamente o problema ou solicitação"
                        required
                        rows="6"
                ></textarea>
            </div>
        </div>

        <div class="modal-footer">
            <Button on:click={handleClose} variant="secondary">
                Cancelar
            </Button>
            <Button on:click={handleSubmit} variant="primary">
                Criar Chamado
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

    .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
    }

    .form-select,
    .form-textarea {
        width: 100%;
        padding: 0.75rem 1rem;
        border: 1px solid #D1D5DB;
        border-radius: 5px;
        font-size: 0.9375rem;
        font-family: 'Roboto', sans-serif;
        transition: all 0.3s ease;
        background-color: #FFFFFF;
    }

    .form-textarea {
        resize: vertical;
        min-height: 120px;
    }

    .form-select:focus,
    .form-textarea:focus {
        outline: none;
        border-color: #FF5101;
        box-shadow: 0 0 0 3px rgba(255, 81, 1, 0.1);
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

        .modal-footer {
            flex-direction: column-reverse;
        }
    }
</style>
