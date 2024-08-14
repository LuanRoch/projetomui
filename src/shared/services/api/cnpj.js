export default function handler(req, res) {
    const { cnpj } = req.query;
  
    fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((result) => {
        if (result.ok) {
          return result.json();
        } else {
          return res.status(500).json({ error: "Erro recebido do RECEITAWS." });
        }
      })
      .then((result) => {
        res.status(200).json(result);
      });
  }