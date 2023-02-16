import { trpc } from "../utils/trpc";

interface Props {
  id: string;
  title: string;
  descritption: string;
}

export default function NoteCard({ id, title, descritption }: Props) {
  const utils = trpc.useContext();
  const deleteNote = trpc.note.delete.useMutation();

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
  return (
    <article>
      <h1>{title}</h1>
      <p>{descritption}</p>

      <button onClick={handleDelete}>Delete</button>
      <button>Done</button>
    </article>
  );
}
