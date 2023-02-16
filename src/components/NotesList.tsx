import { trpc } from "../utils/trpc";
import NoteCard from "./NoteCard";
import { Note } from "../models/note.model";

function NotesList() {
  const { data, isLoading, isError, error } = trpc.note.get.useQuery();

  if (isError) <span>Error: {error.message}</span>;
  if (isLoading) <span>Loading...</span>;

  return (
    <section>
      {data &&
        data.map((note: Note) => (
          <NoteCard
            key={note._id}
            id={note._id}
            title={note.title}
            descritption={note.description}
            done={note.done}
          />
        ))}
    </section>
  );
}

export default NotesList;
