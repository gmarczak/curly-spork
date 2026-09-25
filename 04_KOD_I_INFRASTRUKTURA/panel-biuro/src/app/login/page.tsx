export default async function Login({ searchParams }: { searchParams: Promise<{ blad?: string }> }) {
  const { blad } = await searchParams
  return (
    <main className="login">
      <form method="post" action="/api/login" className="login-card">
        <h1>Biuro Agentów</h1>
        <label htmlFor="password">Hasło właściciela</label>
        <input id="password" name="password" type="password" autoComplete="current-password" required autoFocus />
        {blad && <p className="err">Nieprawidłowe hasło.</p>}
        <button className="btn primary" type="submit">
          Wejdź
        </button>
      </form>
    </main>
  )
}
