import { trpc } from "../utils/trpc";

interface Props {
  id: string;
  title: string;
  descritption: string;
  done: boolean;
}

export default function NoteCard({ id, title, descritption, done }: Props) {
  const utils = trpc.useContext();
  const deleteNote = trpc.note.delete.useMutation();
  const toggleDone = trpc.note.toggleDone.useMutation();

  const handleDelete = () => {
    deleteNote.mutate(id, {
      onSuccess: (data: boolean) => {
        console.log("Note deleted");
        if (data) {
          // se vuelve a pedir los datos
          utils.note.get.invalidate();
        }
      },
      onError: (error: Error) => {
        console.log(error);
      },
    });
  };

  const handleToggle = () => {
    toggleDone.mutate(id, {
      onSuccess: (data: boolean) => {
        console.log("Note update");
        if (data) {
          // se vuelve a pedir los datos
          utils.note.get.invalidate();
        }
      },
    });
  };

  return (
    <article>
      <h1>{title}</h1>
      <p>{descritption}</p>

      <button onClick={handleDelete}>Delete</button>
      <button onClick={handleToggle}>{done ? "Undone" : "Done"}</button>
    </article>
  );
}
