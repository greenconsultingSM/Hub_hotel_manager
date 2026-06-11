import { redirect } from "next/navigation";

// /leggi → si parte sempre dal Capitolo 1 (anteprima libera).
export default function ReaderIndex() {
  redirect("/risorse/guida-disintermediazione/leggi/1");
}
