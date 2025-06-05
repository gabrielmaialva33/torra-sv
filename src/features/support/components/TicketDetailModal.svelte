<script>
    import {createEventDispatcher} from 'svelte';
    import Button from '../../../components/ui/Button.svelte';

    export let ticket = null;

    const dispatch = createEventDispatcher();

    let newComment = '';

    function handleClose() {
        dispatch('close');
    }

    function handleAddComment() {
        if (!newComment.trim()) {
            return;
        }

        dispatch('comment', newComment);
        newComment = '';
    }

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
</script>

{#if ticket}
    <div class="modal-overlay" on:click={handleClose}>
        <div class="modal-content" on:click|stopPropagation>
            <div class="modal-header">
                <div>
                    <h2>{ticket.title}</h2>
                    <p class="ticket-id">#{ticket.id}</p>
                </div>
                <button class="close-button" on:click={handleClose} type="button">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        <path d="M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                </button>
            </div>

            <div class="modal-body">
                <div class="ticket-info">
                    <div class="info-row">
                        <span class="info-label">Status:</span>
                        <span
                                class="status-badge"
                                style="background-color: {getStatusColor(ticket.status)}20; color: {getStatusColor(ticket.status)}"
                        >
            {getStatusLabel(ticket.status)}
          </span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Categoria:</span>
                        <span>{ticket.category || 'Geral'}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Prioridade:</span>
                        <span>{ticket.priority || 'Média'}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Criado em:</span>
                        <span>{formatDate(ticket.createdAt)}</span>
                    </div>
                </div>

                <div class="section">
                    <h3>Descrição</h3>
                    <p class="description">{ticket.description}</p>
                </div>

                <div class="section">
                    <h3>Histórico</h3>
                    <div class="comments-list">
                        {#if ticket.comments && ticket.comments.length > 0}
                            {#each ticket.comments as comment}
                                <div class="comment">
                                    <div class="comment-header">
                                        <span class="comment-author">{comment.author}</span>
                                        <span class="comment-date">{formatDate(comment.createdAt)}</span>
                                    </div>
                                    <p class="comment-text">{comment.text}</p>
                                </div>
                            {/each}
                        {:else}
                            <p class="no-comments">Nenhum comentário ainda.</p>
                        {/if}
                    </div>
                </div>

                {#if ticket.status !== 'closed'}
                    <div class="section">
                        <h3>Adicionar Comentário</h3>
                        <textarea
                                bind:value={newComment}
                                placeholder="Digite seu comentário..."
                                rows="3"
                                class="comment-textarea"
                        ></textarea>
                        <div class="comment-actions">
                            <Button variant="primary" size="small" on:click={handleAddComment}>
                                Enviar Comentário
                            </Button>
                        </div>
                    </div>
                {/if}
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
        max-width: 700px;
        max-height: 90vh;
        overflow-y: auto;
    }

    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        padding: 1.5rem;
        border-bottom: 1px solid #EBECF1;
    }

    .modal-header h2 {
        font-size: 1.25rem;
        font-weight: 600;
        color: #1A1630;
        margin: 0 0 0.25rem 0;
    }

    .ticket-id {
        font-size: 0.875rem;
        color: #6B7280;
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

    .ticket-info {
        background-color: #F9FAFB;
        border-radius: 6px;
        padding: 1rem;
        margin-bottom: 1.5rem;
    }

    .info-row {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 0.75rem;
    }

    .info-row:last-child {
        margin-bottom: 0;
    }

    .info-label {
        font-weight: 500;
        color: #4B5563;
        min-width: 100px;
    }

    .status-badge {
        display: inline-block;
        padding: 0.25rem 0.75rem;
        border-radius: 4px;
        font-size: 0.75rem;
        font-weight: 500;
    }

    .section {
        margin-bottom: 2rem;
    }

    .section h3 {
        font-size: 1rem;
        font-weight: 600;
        color: #1A1630;
        margin: 0 0 1rem 0;
    }

    .description {
        color: #4B5563;
        line-height: 1.6;
        white-space: pre-wrap;
    }

    .comments-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .comment {
        background-color: #F9FAFB;
        border-radius: 6px;
        padding: 1rem;
    }

    .comment-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;
    }

    .comment-author {
        font-weight: 500;
        color: #1A1630;
    }

    .comment-date {
        font-size: 0.75rem;
        color: #6B7280;
    }

    .comment-text {
        color: #4B5563;
        margin: 0;
        white-space: pre-wrap;
    }

    .no-comments {
        color: #9CA3AF;
        font-style: italic;
    }

    .comment-textarea {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid #D1D5DB;
        border-radius: 5px;
        font-size: 0.875rem;
        font-family: 'Roboto', sans-serif;
        resize: vertical;
        min-height: 80px;
        transition: all 0.3s ease;
    }

    .comment-textarea:focus {
        outline: none;
        border-color: #FF5101;
        box-shadow: 0 0 0 3px rgba(255, 81, 1, 0.1);
    }

    .comment-actions {
        margin-top: 0.75rem;
        display: flex;
        justify-content: flex-end;
    }

    @media (max-width: 640px) {
        .info-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.25rem;
        }

        .comment-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.25rem;
        }
    }
</style>
