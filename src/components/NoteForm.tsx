import { ChangeEvent, FormEvent, useState } from "react";

import { trpc } from "../utils/trpc";
import { Note } from "../models/note.model";

export default function NoteForm() {
  const addNote = trpc.note.create.useMutation();
  const utils = trpc.useContext();
  const [note, setNote] = useState<Note>({ title: "", description: "" });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addNote.mutate(note, {
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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        id="title"
        placeholder="title"
        autoFocus
        onChange={handleChange}
      />

      <textarea
        name="description"
        id="description"
        placeholder="Description"
        onChange={handleChange}
      ></textarea>

      <input type="submit" />
    </form>
  );
}
