<script>
    import {createEventDispatcher} from 'svelte';
    import Button from '../../../components/ui/Button.svelte';
    import InputField from '../../../components/ui/InputField.svelte';

    const dispatch = createEventDispatcher();

    let formData = {
        name: '',
        email: '',
        cpf: '',
        role: 'operator',
        store: '',
        password: ''
    };

    export let stores = [];

    function handleClose() {
        dispatch('close');
    }

    function handleSubmit() {
        if (!formData.name || !formData.email || !formData.cpf || !formData.password) {
            alert('Por favor, preencha todos os campos obrigatórios');
            return;
        }

        dispatch('add', formData);

        // Reset form
        formData = {
            name: '',
            email: '',
            cpf: '',
            role: 'operator',
            store: '',
            password: ''
        };
    }
</script>

<div class="modal-overlay" on:click={handleClose}>
    <div class="modal-content" on:click|stopPropagation>
        <div class="modal-header">
            <h2>Adicionar Usuário</h2>
            <button class="close-button" on:click={handleClose} type="button">
                <svg fill="none" height="24" viewBox="0 0 24 24" width="24">
                    <path d="M18 6L6 18" stroke="currentColor" stroke-linecap="round" stroke-width="2"/>
                    <path d="M6 6L18 18" stroke="currentColor" stroke-linecap="round" stroke-width="2"/>
                </svg>
            </button>
        </div>

        <div class="modal-body">
            <div class="form-group">
                <label for="name">Nome Completo *</label>
                <InputField
                        bind:value={formData.name}
                        id="name"
                        placeholder="Digite o nome completo"
                        required
                        type="text"
                />
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label for="email">E-mail *</label>
                    <InputField
                            bind:value={formData.email}
                            id="email"
                            placeholder="email@exemplo.com"
                            required
                            type="email"
                    />
                </div>

                <div class="form-group">
                    <label for="cpf">CPF *</label>
                    <InputField
                            bind:value={formData.cpf}
                            id="cpf"
                            placeholder="000.000.000-00"
                            required
                            type="text"
                    />
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label for="role">Perfil</label>
                    <select
                            bind:value={formData.role}
                            class="form-select"
                            id="role"
                    >
                        <option value="operator">Operador</option>
                        <option value="manager">Gerente</option>
                        <option value="admin">Administrador</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="store">Loja</label>
                    <select
                            bind:value={formData.store}
                            class="form-select"
                            id="store"
                    >
                        <option value="">Selecione uma loja</option>
                        {#each stores as store}
                            <option value={store.id}>{store.name}</option>
                        {/each}
                    </select>
                </div>
            </div>

            <div class="form-group">
                <label for="password">Senha *</label>
                <InputField
                        bind:value={formData.password}
                        id="password"
                        placeholder="Digite a senha"
                        required
                        type="password"
                />
            </div>
        </div>

        <div class="modal-footer">
            <Button on:click={handleClose} variant="secondary">
                Cancelar
            </Button>
            <Button on:click={handleSubmit} variant="primary">
                Adicionar Usuário
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
