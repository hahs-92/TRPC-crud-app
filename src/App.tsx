import { useState } from "react";
import { httpBatchLink } from "@trpc/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import NotesList from "./components/NotesList";
import NoteForm from "./components/NoteForm";
import { trpc } from "./utils/trpc";

function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:3000/trpc",
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <main className="max-w-xl m-auto h-screen py-40">
          <h1 className="text-5xl font-bold text-center">Notes</h1>
          <NoteForm />
          <NotesList />
        </main>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
