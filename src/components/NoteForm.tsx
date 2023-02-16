import { ChangeEvent, FormEvent, useState } from "react";

import { trpc } from "../utils/trpc";
import { Note } from "../models/note.model";

export default function NoteForm() {
  // create => es el nombre que se le da en el back
  const { mutate, isLoading } = trpc.note.create.useMutation();
  const utils = trpc.useContext();
  const [note, setNote] = useState({ title: "", description: "" });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(note, {
      onSuccess: () => {
        console.log("note added¡");
        // vuelve a hacer la peticion al back
        utils.note.get.invalidate();
      },
    });
    setNote({ title: "", description: "" });
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <form className="bg-zinc-900 p-10 rounded-sm" onSubmit={handleSubmit}>
      <input
        className="bg-neutral-800 px-3 py-2 w-full block rounded-md"
        type="text"
        name="title"
        value={note.title}
        id="title"
        placeholder="title"
        autoFocus
        onChange={handleChange}
      />

      <textarea
        className="bg-neutral-800 px-3 py-2 w-full block rounded-md my-3"
        name="description"
        value={note.description}
        id="description"
        placeholder="Description"
        onChange={handleChange}
      ></textarea>

      <button
        className="bg-blue-500 w-20 h-10 text-white rounded-md"
        type="submit"
      >
        {isLoading ? "Loading..." : "Enviar"}
      </button>
    </form>
  );
}
