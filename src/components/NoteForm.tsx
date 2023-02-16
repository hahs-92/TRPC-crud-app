import { ChangeEvent, FormEvent, useState } from "react";

import { trpc } from "../utils/trpc";

export default function NoteForm() {
  const addNote = trpc.note.create.useMutation();
  const [note, setNote] = useState({ title: "", content: "" });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addNote.mutate(note, {
      onSuccess: () => {
        console.log("note added¡");
      },
    });
    setNote({ title: "", content: "" });
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
