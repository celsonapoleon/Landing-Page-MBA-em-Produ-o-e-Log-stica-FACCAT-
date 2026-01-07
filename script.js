// ==========================
// FACCAT MBA Landing Page (Revisada)
// Script (interações + pseudo-analytics)
// ==========================
(function(){
  // Smooth scroll para âncoras internas
  document.querySelectorAll('a[href^="#"]').forEach(function(link){
    link.addEventListener('click', function(e){
      const target = document.querySelector(this.getAttribute('href'));
      if(target){
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Pseudo-analytics (console)
  function logEvent(name){ console.log('[analytics]', name); }
  ['cta_hero_vip','cta_hero_matrix','cta_matrix_download','cta_final_vip','cta_final_matrix','form_submit'].forEach(function(id){
    var el = document.getElementById(id);
    if(el){ el.addEventListener('click', function(){ logEvent(id + '_click'); }); }
  });

  // FAQ toggle logging
  document.querySelectorAll('.faq details').forEach(function(d){
    d.addEventListener('toggle', function(){ logEvent('faq_toggle'); });
  });

  // Lead form: validação simples + mensagem (sem backend)
  const form = document.getElementById('vipForm');
  const msg  = document.getElementById('formMessage');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const name   = form.name.value.trim();
      const email  = form.email.value.trim();
      const phone  = form.phone.value.trim();
      const consent= document.getElementById('consent').checked;

      // Validação básica
      if(!name || !email || !phone || !consent){
        msg.textContent = 'Ops! Verifique os campos obrigatórios e o consentimento (LGPD).';
        msg.style.color = '#ef4444';
        logEvent('form_submit_error');
        return;
      }

      // Sucesso (UI)
      msg.textContent = '🎉 Inscrição confirmada! Você receberá condições exclusivas de pré‑lançamento, agenda e materiais do MBA no seu e‑mail.';
      msg.style.color = '#16a34a';
      form.reset();
      logEvent('form_submit_success');
    });
  }
})();
