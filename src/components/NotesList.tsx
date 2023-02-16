import { trpc } from "../utils/trpc";
import NoteCard from "./NoteCard";
import { Note } from "../models/note.model";

function NotesList() {
  const { data, isLoading, isError, error } = trpc.note.get.useQuery();

  return (
    <section className="flex flex-col">
      {isError && <span>Error: {error}</span>}
      {isLoading && <span>Loading...</span>}
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
