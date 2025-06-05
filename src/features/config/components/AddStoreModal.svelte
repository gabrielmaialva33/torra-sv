<script>
    import {createEventDispatcher} from 'svelte';
    import {fade, fly} from 'svelte/transition';
    import {Store, X} from 'lucide-svelte';

    const dispatch = createEventDispatcher();

    let formData = {
        name: '',
        cnpj: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        phone: '',
        manager: '',
        openingHours: '08:00 - 18:00',
        active: true
    };

    function handleConfirm() {
        // Basic validation
        if (!formData.name.trim()) {
            alert('Por favor, informe o nome da loja');
            return;
        }

        if (!formData.cnpj.trim()) {
            alert('Por favor, informe o CNPJ');
            return;
        }

        dispatch('confirm', formData);
    }

    function handleClose() {
        dispatch('close');
    }

    // Format CNPJ as user types
    function formatCNPJ(value) {
        const numbers = value.replace(/\D/g, '');
        if (numbers.length <= 14) {
            return numbers.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
        }
        return value;
    }

    function handleCNPJInput(e) {
        formData.cnpj = formatCNPJ(e.target.value);
    }

    // Format CEP as user types
    function formatCEP(value) {
        const numbers = value.replace(/\D/g, '');
        if (numbers.length <= 8) {
            return numbers.replace(/(\d{5})(\d{3})/, '$1-$2');
        }
        return value;
    }

    function handleCEPInput(e) {
        formData.zipCode = formatCEP(e.target.value);
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        on:click={handleClose}
        transition:fade={{ duration: 200 }}
>
    <div
            class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            on:click|stopPropagation
            transition:fly={{ y: 20, duration: 300 }}
    >
        <!-- Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
            <div class="flex items-center space-x-3">
                <div class="p-2 bg-torra-orange bg-opacity-10 rounded-full">
                    <Store class="h-6 w-6 text-torra-orange"/>
                </div>
                <h3 class="text-lg font-semibold text-gray-900">Adicionar Loja</h3>
            </div>
            <button
                    class="text-gray-400 hover:text-gray-500 transition-colors"
                    on:click={handleClose}
            >
                <X class="h-5 w-5"/>
            </button>
        </div>

        <!-- Content -->
        <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Name -->
                <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 mb-1" for="name">
                        Nome da Loja <span class="text-red-500">*</span>
                    </label>
                    <input
                            bind:value={formData.name}
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-torra-orange focus:border-transparent"
                            id="name"
                            placeholder="Ex: Loja Centro"
                            type="text"
                    />
                </div>

                <!-- CNPJ -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1" for="cnpj">
                        CNPJ <span class="text-red-500">*</span>
                    </label>
                    <input
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-torra-orange focus:border-transparent"
                            id="cnpj"
                            maxlength="18"
                            on:input={handleCNPJInput}
                            placeholder="00.000.000/0000-00"
                            type="text"
                            value={formData.cnpj}
                    />
                </div>

                <!-- Phone -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1" for="phone">
                        Telefone
                    </label>
                    <input
                            bind:value={formData.phone}
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-torra-orange focus:border-transparent"
                            id="phone"
                            placeholder="(00) 0000-0000"
                            type="tel"
                    />
                </div>

                <!-- Address -->
                <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 mb-1" for="address">
                        Endereço
                    </label>
                    <input
                            bind:value={formData.address}
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-torra-orange focus:border-transparent"
                            id="address"
                            placeholder="Rua, número, complemento"
                            type="text"
                    />
                </div>

                <!-- City -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1" for="city">
                        Cidade
                    </label>
                    <input
                            bind:value={formData.city}
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-torra-orange focus:border-transparent"
                            id="city"
                            placeholder="São Paulo"
                            type="text"
                    />
                </div>

                <!-- State -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1" for="state">
                        Estado
                    </label>
                    <select
                            bind:value={formData.state}
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-torra-orange focus:border-transparent"
                            id="state"
                    >
                        <option value="">Selecione...</option>
                        <option value="SP">São Paulo</option>
                        <option value="RJ">Rio de Janeiro</option>
                        <option value="MG">Minas Gerais</option>
                        <option value="ES">Espírito Santo</option>
                        <option value="PR">Paraná</option>
                        <option value="SC">Santa Catarina</option>
                        <option value="RS">Rio Grande do Sul</option>
                        <option value="BA">Bahia</option>
                        <option value="PE">Pernambuco</option>
                        <option value="CE">Ceará</option>
                        <option value="GO">Goiás</option>
                        <option value="DF">Distrito Federal</option>
                    </select>
                </div>

                <!-- CEP -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1" for="zipCode">
                        CEP
                    </label>
                    <input
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-torra-orange focus:border-transparent"
                            id="zipCode"
                            maxlength="9"
                            on:input={handleCEPInput}
                            placeholder="00000-000"
                            type="text"
                            value={formData.zipCode}
                    />
                </div>

                <!-- Manager -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1" for="manager">
                        Gerente
                    </label>
                    <input
                            bind:value={formData.manager}
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-torra-orange focus:border-transparent"
                            id="manager"
                            placeholder="Nome do gerente"
                            type="text"
                    />
                </div>

                <!-- Opening Hours -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1" for="openingHours">
                        Horário de Funcionamento
                    </label>
                    <input
                            bind:value={formData.openingHours}
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-torra-orange focus:border-transparent"
                            id="openingHours"
                            placeholder="08:00 - 18:00"
                            type="text"
                    />
                </div>

                <!-- Active -->
                <div class="flex items-center">
                    <input
                            bind:checked={formData.active}
                            class="h-4 w-4 text-torra-orange focus:ring-torra-orange border-gray-300 rounded"
                            id="active"
                            type="checkbox"
                    />
                    <label class="ml-2 block text-sm text-gray-700" for="active">
                        Loja ativa
                    </label>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <div class="flex items-center justify-end space-x-3 px-6 py-4 bg-gray-50 rounded-b-lg sticky bottom-0">
            <button
                    class="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    on:click={handleClose}
            >
                Cancelar
            </button>
            <button
                    class="px-4 py-2 bg-torra-orange text-white rounded-lg hover:bg-torra-orange-dark transition-colors"
                    on:click={handleConfirm}
            >
                Adicionar Loja
            </button>
        </div>
    </div>
</div>
