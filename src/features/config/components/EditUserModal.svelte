<script>
    import {createEventDispatcher} from 'svelte';
    import Button from '../../../components/ui/Button.svelte';
    import InputField from '../../../components/ui/InputField.svelte';

    export let user = null;
    export let stores = [];

    const dispatch = createEventDispatcher();

    let formData = {
        name: user?.name || '',
        email: user?.email || '',
        cpf: user?.cpf || '',
        role: user?.role || 'operator',
        store: user?.store || '',
        password: '',
        active: user?.active !== false
    };

    function handleClose() {
        dispatch('close');
    }

    function handleSubmit() {
        if (!formData.name || !formData.email || !formData.cpf) {
            alert('Por favor, preencha todos os campos obrigatórios');
            return;
        }

        // Only include password if it was changed
        const dataToSend = {...formData};
        if (!dataToSend.password) {
            delete dataToSend.password;
        }

        dispatch('update', dataToSend);
    }
</script>

{#if user}
    <div class="modal-overlay" on:click={handleClose}>
        <div class="modal-content" on:click|stopPropagation>
            <div class="modal-header">
                <h2>Editar Usuário</h2>
                <button class="close-button" on:click={handleClose} type="button">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        <path d="M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                </button>
            </div>

            <div class="modal-body">
                <div class="form-group">
                    <label for="editName">Nome Completo *</label>
                    <InputField
                            id="editName"
                            type="text"
                            bind:value={formData.name}
                            placeholder="Digite o nome completo"
                            required
                    />
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="editEmail">E-mail *</label>
                        <InputField
                                id="editEmail"
                                type="email"
                                bind:value={formData.email}
                                placeholder="email@exemplo.com"
                                required
                        />
                    </div>

                    <div class="form-group">
                        <label for="editCpf">CPF *</label>
                        <InputField
                                id="editCpf"
                                type="text"
                                bind:value={formData.cpf}
                                placeholder="000.000.000-00"
                                required
                        />
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="editRole">Perfil</label>
                        <select
                                id="editRole"
                                bind:value={formData.role}
                                class="form-select"
                        >
                            <option value="operator">Operador</option>
                            <option value="manager">Gerente</option>
                            <option value="admin">Administrador</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="editStore">Loja</label>
                        <select
                                id="editStore"
                                bind:value={formData.store}
                                class="form-select"
                        >
                            <option value="">Selecione uma loja</option>
                            {#each stores as store}
                                <option value={store.id}>{store.name}</option>
                            {/each}
                        </select>
                    </div>
                </div>

                <div class="form-group">
                    <label for="editPassword">Nova Senha (deixe em branco para manter a atual)</label>
                    <InputField
                            id="editPassword"
                            type="password"
                            bind:value={formData.password}
                            placeholder="Digite a nova senha"
                    />
                </div>

                <div class="form-group">
                    <label class="checkbox-label">
                        <input
                                type="checkbox"
                                bind:checked={formData.active}
                                class="checkbox-input"
                        />
                        <span>Usuário ativo</span>
                    </label>
                </div>
            </div>

            <div class="modal-footer">
                <Button variant="secondary" on:click={handleClose}>
                    Cancelar
                </Button>
                <Button variant="primary" on:click={handleSubmit}>
                    Salvar Alterações
                </Button>
            </div>
        </div>
    </div>
{/if}

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

    .checkbox-label {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
    }

    .checkbox-input {
        width: 1.25rem;
        height: 1.25rem;
        cursor: pointer;
        accent-color: #FF5101;
    }

    .checkbox-label span {
        font-size: 0.875rem;
        color: #374151;
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
