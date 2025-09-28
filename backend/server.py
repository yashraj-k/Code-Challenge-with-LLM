from src.app import  app
if(__name__ == "__main__"):
    import uvicorn
    uvicorn.run(app,host="0.0.0.0", port=8000)

@app.get("/api/health")
def health_check():
    return {"status": "ok", "message": "API is running"}