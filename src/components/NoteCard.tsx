import { trpc } from "../utils/trpc";

interface Props {
  id: string;
  title: string;
  descritption: string;
  done: boolean;
}

export default function NoteCard({ id, title, descritption, done }: Props) {
  const utils = trpc.useContext();
  // delete, toggleDone => se definen en el back
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
    <article className="flex justify-between items-center bg-zinc-500 p-2 mb-2">
      <section>
        <h2>{title}</h2>
        <p>{descritption}</p>
      </section>

      <section className="flex gap-x-2">
        <button
          className="bg-red-500 h-10 px-3 rounded-md text-white"
          onClick={handleDelete}
        >
          Delete
        </button>
        <button
          className={` px-3 h-10 rounded-md text-white ${
            done ? "bg-zinc-500" : "bg-green-500"
          }`}
          onClick={handleToggle}
        >
          {done ? "Undone" : "Done"}
        </button>
      </section>
    </article>
  );
}
