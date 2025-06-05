<script>
    export let faqs = [];

    let expandedItems = new Set();

    function toggleExpanded(id) {
        if (expandedItems.has(id)) {
            expandedItems.delete(id);
        } else {
            expandedItems.add(id);
        }
        expandedItems = expandedItems; // trigger reactivity
    }
</script>

<div class="faq-section">
    {#if faqs.length === 0}
        <div class="empty-state">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" class="empty-icon">
                <path d="M32 8C18.745 8 8 18.745 8 32C8 45.255 18.745 56 32 56C45.255 56 56 45.255 56 32C56 18.745 45.255 8 32 8ZM32 52C20.954 52 12 43.046 12 32C12 20.954 20.954 12 32 12C43.046 12 52 20.954 52 32C52 43.046 43.046 52 32 52Z"
                      fill="#9CA3AF"/>
                <path d="M32 38C30.895 38 30 38.895 30 40C30 41.105 30.895 42 32 42C33.105 42 34 41.105 34 40C34 38.895 33.105 38 32 38Z"
                      fill="#9CA3AF"/>
                <path d="M32 18C28.691 18 26 20.691 26 24H30C30 22.897 30.897 22 32 22C33.103 22 34 22.897 34 24C34 24.552 33.776 25.01 33.414 25.414L30.586 28.586C30.211 28.961 30 29.47 30 30V34H34V30.828L36.242 28.586C37.367 27.461 38 25.969 38 24C38 20.691 35.309 18 32 18Z"
                      fill="#9CA3AF"/>
            </svg>
            <h3>Nenhuma pergunta frequente disponível</h3>
            <p>As perguntas frequentes serão adicionadas em breve.</p>
        </div>
    {:else}
        <div class="faq-list">
            {#each faqs as faq}
                <div class="faq-item">
                    <button
                            class="faq-header"
                            on:click={() => toggleExpanded(faq.id)}
                            aria-expanded={expandedItems.has(faq.id)}
                            type="button"
                    >
                        <h3 class="faq-question">{faq.question}</h3>
                        <svg
                                class="faq-icon {expandedItems.has(faq.id) ? 'rotated' : ''}"
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                        >
                            <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="2"
                                  stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    {#if expandedItems.has(faq.id)}
                        <div class="faq-content">
                            <p>{faq.answer}</p>
                            {#if faq.category}
                                <div class="faq-meta">
                                    <span class="faq-category">{faq.category}</span>
                                </div>
                            {/if}
                        </div>
                    {/if}
                </div>
            {/each}
        </div>
    {/if}
</div>

<style>
    .faq-section {
        background: #FFFFFF;
        border: 1px solid #DBE2EB;
        border-radius: 8px;
        padding: 1.5rem;
        box-shadow: 0px 6px 8px rgba(4, 4, 7, 0.1);
    }

    .empty-state {
        text-align: center;
        padding: 4rem 2rem;
    }

    .empty-icon {
        margin-bottom: 1.5rem;
        opacity: 0.5;
    }

    .empty-state h3 {
        font-size: 1.25rem;
        font-weight: 600;
        color: #1A1630;
        margin: 0 0 0.5rem 0;
    }

    .empty-state p {
        color: #6B7280;
        margin: 0;
    }

    .faq-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .faq-item {
        border: 1px solid #EBECF1;
        border-radius: 8px;
        overflow: hidden;
        transition: all 0.2s;
    }

    .faq-item:hover {
        border-color: #FF5101;
        box-shadow: 0px 4px 6px rgba(255, 81, 1, 0.1);
    }

    .faq-header {
        width: 100%;
        padding: 1.25rem;
        background: none;
        border: none;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        text-align: left;
        transition: background-color 0.2s;
    }

    .faq-header:hover {
        background-color: #F9FAFB;
    }

    .faq-question {
        font-size: 1rem;
        font-weight: 500;
        color: #1A1630;
        margin: 0;
        flex: 1;
        padding-right: 1rem;
    }

    .faq-icon {
        color: #6B7280;
        transition: transform 0.3s ease;
        flex-shrink: 0;
    }

    .faq-icon.rotated {
        transform: rotate(180deg);
    }

    .faq-content {
        padding: 0 1.25rem 1.25rem;
        border-top: 1px solid #F3F4F6;
    }

    .faq-content p {
        color: #4B5563;
        line-height: 1.6;
        margin: 1rem 0 0;
        white-space: pre-wrap;
    }

    .faq-meta {
        margin-top: 1rem;
        display: flex;
        gap: 0.5rem;
    }

    .faq-category {
        display: inline-block;
        padding: 0.25rem 0.75rem;
        background-color: #EFF6FF;
        color: #1E40AF;
        border-radius: 4px;
        font-size: 0.75rem;
        font-weight: 500;
    }

    @media (max-width: 768px) {
        .faq-section {
            padding: 1rem;
        }

        .faq-header {
            padding: 1rem;
        }

        .faq-content {
            padding: 0 1rem 1rem;
        }
    }
</style>
