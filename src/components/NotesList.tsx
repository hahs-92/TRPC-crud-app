import { trpc } from "../utils/trpc";

function NotesList() {
  const notes = trpc.note.get.useQuery();

  return <div>{JSON.stringify(notes.data)}</div>;
}

export default NotesList;
