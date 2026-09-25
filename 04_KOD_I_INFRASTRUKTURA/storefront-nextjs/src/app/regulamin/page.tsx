import { currentStore } from "@/lib/current-store"

export default async function Regulamin() {
  const store = await currentStore()
  return (
    <article>
      <h1>Regulamin sklepu {store.brand}</h1>
      <p>
        Treść regulaminu po weryfikacji przez prawnika — szkielet: 01_FINANSE_I_PRAWO/Rejestracja_i_Umowy/
        Wzorce_Regulaminow_i_Polityk.md.
      </p>
      <h2 id="prywatnosc">Polityka prywatności</h2>
      <p>Administrator danych: {store.operator.name}.</p>
    </article>
  )
}
