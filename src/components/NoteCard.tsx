interface Props {
  title: string;
  descritption: string;
}

export default function NoteCard({ title, descritption }: Props) {
  return (
    <article>
      <h1>{title}</h1>
      <p>{descritption}</p>

      <button>Delete</button>
      <button>Done</button>
    </article>
  );
}
