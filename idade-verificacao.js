(function verificarAcesso() {
    const cookies = document.cookie.split(';').map(c => c.trim());
    const bloqueado = cookies.find(c => c.startsWith('blocked=true'));
    const birthdateCookie = cookies.find(c => c.startsWith('birthdate='));

    // Se estiver bloqueado
    if (bloqueado) {
        window.location.href = "h3nt4i/aceeso/bloqueado.html"; // Página simples de bloqueio
        return;
    }

    // Se não tem cookie de nascimento, redireciona para verificação
    if (!birthdateCookie) {
        localStorage.setItem("paginaAnterior", window.location.href);
        window.location.href = "h3nt4i/aceeso/verificacao.html";
        return;
    }

    // Se tem cookie, checa a idade
    const birthdate = birthdateCookie.split('=')[1];
    if (calcularIdade(new Date(birthdate)) < 18) {
        document.cookie = `blocked=true; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
        window.location.href = "h3nt4i/aceeso/bloqueado.html";
    }
})();

function calcularIdade(dataNasc) {
    const hoje = new Date();
    let idade = hoje.getFullYear() - dataNasc.getFullYear();
    const m = hoje.getMonth() - dataNasc.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < dataNasc.getDate())) idade--;
    return idade;
}
