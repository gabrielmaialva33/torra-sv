<script>
    import {onMount} from 'svelte';
    import MainLayout from '../../../layouts/MainLayout.svelte';
    import Button from '../../../components/ui/Button.svelte';
    import Loading from '../../../components/ui/Loading.svelte';
    import SupportTicketList from '../components/SupportTicketList.svelte';
    import NewTicketModal from '../components/NewTicketModal.svelte';
    import TicketDetailModal from '../components/TicketDetailModal.svelte';
    import FAQSection from '../components/FAQSection.svelte';
    import {supportService} from '../../../api/services/support.service';

    let isLoading = true;
    let tickets = [];
    let faqs = [];
    let selectedTicket = null;
    let showNewTicketModal = false;
    let showTicketDetail = false;
    let activeTab = 'tickets'; // 'tickets' or 'faq'

    onMount(async () => {
        await loadData();
    });

    async function loadData() {
        try {
            isLoading = true;
            const [ticketsResponse, faqsResponse] = await Promise.all([
                supportService.getTickets(),
                supportService.getFAQs()
            ]);

            tickets = ticketsResponse.data || [];
            faqs = faqsResponse.data || [];
        } catch (error) {
            console.error('Error loading support data:', error);
        } finally {
            isLoading = false;
        }
    }

    function handleNewTicket() {
        showNewTicketModal = true;
    }

    function handleCloseNewTicket() {
        showNewTicketModal = false;
    }

    async function handleCreateTicket(ticketData) {
        try {
            const response = await supportService.createTicket(ticketData);
            if (response.success) {
                await loadData();
                handleCloseNewTicket();
            }
        } catch (error) {
            console.error('Error creating ticket:', error);
        }
    }

    function handleViewTicket(ticket) {
        selectedTicket = ticket;
        showTicketDetail = true;
    }

    function handleCloseTicketDetail() {
        showTicketDetail = false;
        selectedTicket = null;
    }

    async function handleAddComment(ticketId, comment) {
        try {
            const response = await supportService.addComment(ticketId, comment);
            if (response.success) {
                // Reload ticket details
                const ticketResponse = await supportService.getTicketById(ticketId);
                if (ticketResponse.success) {
                    selectedTicket = ticketResponse.data;
                }
            }
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    }
</script>

<MainLayout>
    <div class="support-page">
        <div class="page-header">
            <h1 class="page-title">Central de Atendimento (SAC)</h1>
            <Button on:click={handleNewTicket} variant="primary">
                <svg class="mr-2" fill="none" height="16" viewBox="0 0 16 16" width="16">
                    <path d="M8 3V13" stroke="currentColor" stroke-linecap="round" stroke-width="2"/>
                    <path d="M3 8H13" stroke="currentColor" stroke-linecap="round" stroke-width="2"/>
                </svg>
                Novo Chamado
            </Button>
        </div>

        <div class="tabs">
            <button
                    class="tab {activeTab === 'tickets' ? 'active' : ''}"
                    on:click={() => activeTab = 'tickets'}
            >
                Meus Chamados
            </button>
            <button
                    class="tab {activeTab === 'faq' ? 'active' : ''}"
                    on:click={() => activeTab = 'faq'}
            >
                Perguntas Frequentes
            </button>
        </div>

        {#if isLoading}
            <Loading/>
        {:else}
            {#if activeTab === 'tickets'}
                <SupportTicketList {tickets} on:view={e => handleViewTicket(e.detail)}/>
            {:else}
                <FAQSection {faqs}/>
            {/if}
        {/if}
    </div>

    {#if showNewTicketModal}
        <NewTicketModal
                on:close={handleCloseNewTicket}
                on:create={e => handleCreateTicket(e.detail)}
        />
    {/if}

    {#if showTicketDetail && selectedTicket}
        <TicketDetailModal
                ticket={selectedTicket}
                on:close={handleCloseTicketDetail}
                on:comment={e => handleAddComment(selectedTicket.id, e.detail)}
        />
    {/if}
</MainLayout>

<style>
    .support-page {
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

    .tabs {
        display: flex;
        gap: 2rem;
        margin-bottom: 2rem;
        border-bottom: 1px solid #EBECF1;
    }

    .tab {
        background: none;
        border: none;
        padding: 1rem 0;
        font-size: 1rem;
        font-weight: 500;
        color: #6B7280;
        cursor: pointer;
        position: relative;
        transition: color 0.2s;
    }

    .tab:hover {
        color: #1A1630;
    }

    .tab.active {
        color: #FF5101;
    }

    .tab.active::after {
        content: '';
        position: absolute;
        bottom: -1px;
        left: 0;
        right: 0;
        height: 2px;
        background-color: #FF5101;
    }

    @media (max-width: 768px) {
        .page-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
        }

        .tabs {
            gap: 1rem;
        }

        .tab {
            font-size: 0.875rem;
        }
    }
</style>
