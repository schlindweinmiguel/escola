const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// COLOQUE SUA API KEY AQUI
const OPENAI_API_KEY = "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";

app.post("/chat", async (req, res) => {
  const mensagem = req.body.mensagem;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "Você é um assistente de uma escola." },
          { role: "user", content: mensagem }
        ]
      })
    });

    const data = await response.json();
    res.json({ resposta: data.choices[0].message.content });

  } catch (err) {
    res.json({ resposta: "Erro ao responder." });
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
