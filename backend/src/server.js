/* API ROUTES FIRST */

app.post("/chat", async (req, res) => {
  try {
    const message = req.body?.message;

    if (!message) {
      return res.status(400).json({ error: "message required" });
    }

    const response = await agent.invoke({
      messages: [{ role: "user", content: message }]
    });

    res.json(response);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Agent error" });
  }
});


/* FRONTEND STATIC FILES */

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});