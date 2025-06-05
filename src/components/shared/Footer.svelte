<script>
  export let fixed = false;
  export let className = '';
  
  const currentYear = new Date().getFullYear();
</script>

<footer 
  class="h-[62px] bg-white border-t border-[#EBECF1] shadow-footer
         {fixed ? 'fixed bottom-0 left-0 right-0' : 'absolute bottom-0 left-0 right-0'}
         {className}"
>
  <div class="h-full flex items-center justify-center px-6">
    <p class="font-inter text-[13px] text-black/80 leading-tight">
      Copyright © {currentYear}, Lojas Torra. Todos os direitos reservados.
    </p>
  </div>
</footer>