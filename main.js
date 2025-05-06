// Visibilidade do formulário
const toggleBtn = document.getElementById("toggleFormBtn");
const formSection = document.getElementById("form-tenis");

toggleBtn.addEventListener("click", () => {
  formSection.classList.toggle("hidden");
});

// Envio ao backend
const submitBtn = document.getElementById("submitBtn");

submitBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const descricao = document.getElementById("descricao").value.trim();

  if (!descricao) {
    alert("Por favor, descreva seu calçado ideal.");
    return;
  }

  try {
    const response = await fetch("/api/gemini", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt: descricao })
    });

    if (!response.ok) throw new Error("Erro na resposta da API.");

    const result = await response.json();
    alert(`Sugestão da IA: ${result.resposta}`);
  } catch (error) {
    console.error(error);
    alert("Ocorreu um erro ao consultar a inteligência artificial.");
  }
});
